/**
 * Dependency-free singleton loader for the official YouTube IFrame Player API
 * (`https://www.youtube.com/iframe_api`). Requested only after the user
 * activates Play — never on page load. Resolves immediately if `window.YT`
 * is already available, never inserts the script tag more than once even
 * across repeated Play activations, and chains onto any pre-existing
 * `window.onYouTubeIframeAPIReady` instead of overwriting it, so it coexists
 * with another script that already owns that global callback.
 *
 * Bounded and self-healing: a script load error or a timeout rejects the
 * returned promise and resets the module-level singleton, so a later Play
 * activation gets a fresh attempt. Only a script tag this loader itself
 * created is ever removed on failure — a script tag another integration
 * already owns (or a script an earlier successful call left in place) is
 * never touched. Rejection here never blocks the iframe itself: the caller's
 * own `.catch()` is what keeps ordinary `autoplay` playback working
 * regardless of whether analytics ever attaches.
 */

export interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

export interface YTPlayer {
  destroy(): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
}

export interface YTPlayerOptions {
  events?: {
    onStateChange?: (event: YTPlayerEvent) => void;
    onError?: (event: YTPlayerEvent) => void;
  };
}

export interface YTNamespace {
  Player: new (element: HTMLElement, options?: YTPlayerOptions) => YTPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
    UNSTARTED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const API_SRC = "https://www.youtube.com/iframe_api";
const LOAD_TIMEOUT_MS = 10000;

let apiPromise: Promise<YTNamespace> | null = null;

export function loadYoutubeIframeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("loadYoutubeIframeApi: no window"));
  }
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    let settled = false;
    // Only a script tag WE create below gets cleaned up on failure — a
    // pre-existing tag belongs to another integration (or a prior successful
    // load) and must survive a rejection here untouched.
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${API_SRC}"]`);
    const ownScript = !existingScript;
    const script: HTMLScriptElement = existingScript ?? document.createElement("script");
    let timeoutId: number | null = null;

    const onScriptError = () => {
      settleReject(new Error("loadYoutubeIframeApi: failed to load the IFrame API script"));
    };

    const cleanup = () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      script.removeEventListener("error", onScriptError);
    };

    function settleResolve(yt: YTNamespace) {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(yt);
    }

    function settleReject(error: Error) {
      if (settled) return;
      settled = true;
      cleanup();
      if (ownScript && script.isConnected) script.remove();
      apiPromise = null; // let a later Play activation retry from scratch
      reject(error);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      try {
        previousReady?.();
      } catch {
        // A throwing pre-existing callback must never stop this loader from
        // resolving once window.YT is actually available.
      }
      if (window.YT) settleResolve(window.YT);
      else settleReject(new Error("loadYoutubeIframeApi: onYouTubeIframeAPIReady fired without window.YT"));
    };

    timeoutId = window.setTimeout(() => {
      settleReject(new Error("loadYoutubeIframeApi: timed out waiting for the IFrame API"));
    }, LOAD_TIMEOUT_MS);

    script.addEventListener("error", onScriptError);
    if (ownScript) {
      script.src = API_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiPromise;
}
