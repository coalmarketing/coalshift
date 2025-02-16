export default function VideoSection() {
  return (
    <section id="video-section" className="max-w-[1200px] mx-auto px-4 py-16">
      <h2 className="text-modra text-3xl sm:text-4xl md:text-5xl font-lekton font-bold mb-12">
        Ukázky
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-video w-full">
          <iframe 
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/pT7IOghDECE?si=oMkkcApJQk-5FaaB" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="aspect-video w-full">
          <iframe 
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/pT7IOghDECE?si=oMkkcApJQk-5FaaB" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
} 