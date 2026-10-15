// Membership adapter; original lessons and game scoring logic are preserved.
import {api,hasSession} from './learning/client.js';
import {finished,outcome} from './learning/completion.js';
function label(){document.querySelectorAll('.member-link').forEach(el=>{if(hasSession()){el.textContent=document.documentElement.lang==='tr'?'Öğrenme alanım':'My learning space';el.removeAttribute('data-en');el.removeAttribute('data-tr');const a=el.closest('a');if(a){a.href='/ogrenci/';a.removeAttribute('data-offline');}}});}
label();window.addEventListener('site-language-changed',label);
if(hasSession()){
 try{
  const [me,r]=await Promise.all([api('me'),fetch('/assets/learning/catalog.json',{cache:'no-store'})]);const cat=await r.json();
  const route=decodeURI(location.pathname).replace(/^\//,'').replace(/index\.html$/,'');const item=cat.items.find(i=>decodeURI(i.path)===route);
  if(item){
   await api('progress',{content_id:item.id,state:'started'});const activity=await api('activity');let done=activity.progress.some(p=>p.content_id===item.id&&p.state==='completed');
   const scored=cat.assessments.some(a=>a.id===item.id);let runId=crypto.randomUUID(),resultSaved=false,pending=null,working=false,retryNeeded=false,lastActive=false,resetAfterSave=false;
   const bar=document.createElement('aside');bar.id='akin-progress-strip';bar.setAttribute('aria-label','Akın Academy · Progress');bar.style.cssText='position:fixed;bottom:12px;left:12px;right:12px;z-index:9998;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;max-width:680px;margin:auto;padding:12px 16px;border:1px solid #344c67;border-radius:12px;box-shadow:0 6px 25px #0004;background:#142338;color:#dce7f2;font:13px/1.5 system-ui';
   const text=document.createElement('span'),button=document.createElement('button'),link=document.createElement('a');text.setAttribute('role','status');text.setAttribute('aria-live','polite');
   const t=(tr,en)=>document.documentElement.lang==='tr'?tr:en;
   function translate(){text.textContent=retryNeeded?t('Kayıt tamamlanamadı. Tekrar kaydet.','Saving failed. Retry saving.'):resultSaved?t('Etkinlik sonucu hesabına kaydedildi.','Activity result saved to your account.'):done?t('Hesabında tamamlandı olarak kayıtlı.','Saved as completed in your account.'):scored?t('Oyunu bitirince sonuç otomatik kaydedilir.','Your result is saved automatically when the activity ends.'):t('Çalışmanı bitirdiğinde ilerlemeni kaydet.','Save progress when you finish studying.');button.textContent=retryNeeded?t('Tekrar kaydet','Retry saving'):t('Tamamladım','Mark completed');button.hidden=retryNeeded?false:done||scored;}
   button.type='button';button.style.cssText='border:0;border-radius:8px;background:#246ac4;color:#f1f5fb;padding:9px 12px;cursor:pointer;font:inherit';link.href='/ogrenci/';link.style.color='#9fcaff';link.textContent=t('Panelim ↗','My dashboard ↗');
   async function save(){if(working)return;working=true;button.disabled=true;try{if(pending){await api('activity-result',{content_id:item.id,run_id:pending.runId,...pending.result});resultSaved=true;pending=null;}await api('progress',{content_id:item.id,state:'completed'});done=true;retryNeeded=false;}catch{retryNeeded=true;}finally{working=false;button.disabled=false;if(resetAfterSave){resetAfterSave=false;runId=crypto.randomUUID();resultSaved=false;retryNeeded=false;}translate();queueMicrotask(observe);}}
   button.onclick=()=>save();translate();bar.append(text,button,link);document.body.append(bar);
   const originalPadding=parseFloat(getComputedStyle(document.body).paddingBottom)||0;const pad=()=>{document.body.style.paddingBottom=(originalPadding+Math.ceil(bar.getBoundingClientRect().height)+24)+'px';};pad();if(typeof ResizeObserver!=='undefined')new ResizeObserver(pad).observe(bar);window.addEventListener('site-language-changed',translate);
   function observe(){const active=finished(document,item.path);if(!active){if(lastActive){if(working||pending)resetAfterSave=true;else{runId=crypto.randomUUID();resultSaved=false;retryNeeded=false;translate();}}lastActive=false;return;}lastActive=true;if(working||retryNeeded||resultSaved)return;if(scored){const result=outcome(document,item.path);if(!result)return;pending={result,runId};void save();}else if(!done)void save();}
   const observer=new MutationObserver(observe);observer.observe(document.body,{subtree:true,attributes:true,childList:true,characterData:true});observe();
  }
 }catch{/* Keep the real sign-in link; a network failure does not grant privileges. */}
}
