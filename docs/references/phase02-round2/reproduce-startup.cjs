const { chromium } = require('/Users/jakubtesarik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const out = '/Users/jakubtesarik/Programování/coalshift/out';
const evidence = '/private/tmp/coalshift-ui-repro';
fs.mkdirSync(evidence, {recursive:true});
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 let file=path.resolve(out,'.'+pathname);
 if(!file.startsWith(out+'/') && file!==out){res.writeHead(403);res.end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
 if(!fs.existsSync(file)) {res.writeHead(404);res.end();return;}
 res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream'});
 fs.createReadStream(file).pipe(res);
});
(async()=>{
 let browser;
 try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const all=[];
  for(const mode of ['controlled-ready','quanda-pending']){
   const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
   const page=await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   let release;
   await page.route('**/*',async route=>{
    const url=route.request().url();
    if(url.startsWith(origin)) return route.continue();
    if(mode==='quanda-pending'&&url.includes('webform.onquanda.com/static/js/webform/embedded.min.js')) {
     await new Promise(resolve=>{release=resolve;});
    }
    return route.fulfill({status:200,contentType:'application/javascript',body:''});
   });
   await page.goto(origin,{waitUntil:'domcontentloaded'});
   await page.waitForTimeout(1200);
   const tabs=page.getByRole('tab');
   const snapshots=[];
   for(let i=0;i<5;i++){
    await tabs.nth(i).click();
    await page.waitForTimeout(120);
    snapshots.push(await page.evaluate(()=>({
     selected:[...document.querySelectorAll('[role=tab]')].filter(e=>e.getAttribute('aria-selected')==='true').map(e=>e.textContent.trim()),
     panels:[...document.querySelectorAll('[role=tabpanel]')].filter(e=>getComputedStyle(e).display!=='none').map(e=>({hidden:e.hidden,heading:e.querySelector('h3').textContent,rect:{w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}}))
    })));
   }
   const geometry=await page.evaluate(()=>{
    const rect=e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return {width:r.width,height:r.height,font:s.fontSize,display:s.display,overflow:s.overflow,shadow:s.boxShadow,outline:s.outline,outlineOffset:s.outlineOffset};};
    return {viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},header:rect(document.querySelector('nav[aria-label="Hlavní navigace"]')),buttons:[...document.querySelectorAll('#pricing .cta')].map(e=>({label:e.getAttribute('aria-label'),...rect(e),labelBox:rect(e.querySelector('.cta__label')),disc:rect(e.querySelector('.cta__disc')),arrow:rect(e.querySelector('.cta__arrow')),client:e.clientWidth,scroll:e.scrollWidth})),docHeight:document.documentElement.scrollHeight};
   });
   if(mode==='controlled-ready') {
    await tabs.nth(0).click();
    await page.screenshot({path:evidence+'/baseline-1440.png',fullPage:true});
    await page.locator('#benefits').screenshot({path:evidence+'/browser-1440.png'});
    await page.locator('#pricing').screenshot({path:evidence+'/pricing-1440.png'});
   }
   all.push({mode,snapshots,geometry,errors});
   if(release){release();await page.waitForTimeout(250);}
   await context.close();
  }
  fs.writeFileSync(evidence+'/evidence.json',JSON.stringify({testedArtifact:out,browserVersion:browser.version(),notes:'Existing uncommitted exported artifact, not a fresh build. Local static server; external scripts stubbed to isolate app interactions. Pending fixture deliberately stalls only Quanda beforeInteractive. No production or user profile accessed.',results:all},null,2));
  console.log(JSON.stringify({evidence:evidence+'/evidence.json',results:all.map(x=>({mode:x.mode,states:x.snapshots.map(y=>({selected:y.selected,visibleHeadings:y.panels.map(z=>z.heading)})),pricing:x.geometry.buttons.map(b=>({label:b.label,width:b.width,client:b.client,scroll:b.scroll,font:b.font,arrow:b.arrow.width})),errors:x.errors}))},null,2));
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
