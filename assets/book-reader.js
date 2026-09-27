(()=>{
 const $=s=>document.querySelector(s),canvas=$('#bookPage'),stage=$('#pageStage'),total=10;
 let page=1,zoom=1,currentImage=null,request=0;
 for(let n=1;n<=total;n++){const o=document.createElement('option');o.value=n;o.textContent=n+' / '+total;$('#pageSelect').append(o)}
 function resize(){
  if(!currentImage)return;
  const style=getComputedStyle(stage);
  const width=stage.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)-2;
  const height=stage.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)-2;
  const fitWidth=Math.min(1000,width,height*currentImage.naturalWidth/currentImage.naturalHeight);
  const renderedWidth=Math.floor(fitWidth*zoom);
  const renderedHeight=renderedWidth*currentImage.naturalHeight/currentImage.naturalWidth;
  canvas.style.width=renderedWidth+'px';
  canvas.style.marginTop=Math.max(0,Math.floor((height-renderedHeight)/2))+'px';
  $('#zoomLabel').textContent=Math.round(zoom*100)+'%';
  $('#zoomOut').disabled=zoom<=1;$('#zoomIn').disabled=zoom>=3;
 }
 function controls(){ $('#prev').disabled=page===1;$('#next').disabled=page===total;$('#pageSelect').value=String(page);$('#bookEnd').hidden=page!==total;$('#pageStatus').textContent='Sayfa '+page+' / '+total+' · Page '+page+' of '+total;canvas.setAttribute('aria-label','Arda’nın Bir Günü · Sayfa '+page+' / Page '+page) }
 function load(n){page=Math.max(1,Math.min(total,n));const serial=++request;currentImage=null;canvas.hidden=true;$('#readerError').hidden=true;controls();$('#pageStatus').textContent='Sayfa '+page+' yükleniyor / Loading page '+page+'…';const im=new Image();im.onload=()=>{if(serial!==request)return;currentImage=im;canvas.width=im.naturalWidth;canvas.height=im.naturalHeight;canvas.getContext('2d').drawImage(im,0,0);canvas.hidden=false;resize();stage.scrollTop=0;stage.scrollLeft=0;controls()};im.onerror=()=>{if(serial!==request)return;$('#readerError').hidden=false;$('#pageStatus').textContent='Sayfa '+page+' yüklenemedi / Page could not load'};im.src='sayfalar/'+String(page).padStart(2,'0')+'.webp'}
 $('#prev').onclick=()=>load(page-1);$('#next').onclick=()=>load(page+1);$('#pageSelect').onchange=e=>load(Number(e.target.value));$('#retry').onclick=()=>load(page);
 $('#zoomIn').onclick=()=>{zoom=Math.min(3,zoom+.5);resize()};$('#zoomOut').onclick=()=>{zoom=Math.max(1,zoom-.5);resize()};$('#fit').onclick=()=>{zoom=1;resize();stage.scrollTop=0;stage.scrollLeft=0};
 stage.onkeydown=e=>{if(zoom!==1)return;if(e.key==='ArrowRight'&&page<total){e.preventDefault();load(page+1)}if(e.key==='ArrowLeft'&&page>1){e.preventDefault();load(page-1)}};
 canvas.addEventListener('contextmenu',e=>e.preventDefault());canvas.addEventListener('dragstart',e=>e.preventDefault());new ResizeObserver(resize).observe(stage);load(1);
})();
