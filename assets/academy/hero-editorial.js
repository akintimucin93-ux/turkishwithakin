'use strict';
(()=>{
 const header=document.querySelector('.aa-editorial-header');if(!header)return;
 function title(){const tr=document.documentElement.lang==='tr';document.title='Akın Academy — '+(header.querySelector('a[aria-current=page]')?(tr?'Hakkında':'About'):(tr?'Online Türkçe ve Ücretsiz Kaynaklar':'Online Turkish & Free Learning Resources'));}
 window.addEventListener('site-language-changed',title);title();
 const toggle=header.querySelector('.aa-search-toggle'),form=header.querySelector('.site-search');
 if(!toggle||!form)return;
 function close(){form.hidden=true;toggle.setAttribute('aria-expanded','false');}
 toggle.addEventListener('click',()=>{const open=form.hidden;form.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open){header.querySelector('.main-nav')?.classList.remove('open');header.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');form.querySelector('input')?.focus();}});
 header.querySelector('.aa-menu-search')?.addEventListener('click',e=>{e.stopPropagation();toggle.click();});
 header.querySelector('.menu-toggle')?.addEventListener('click',close);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!form.hidden){close();toggle.focus();}});
 document.addEventListener('click',e=>{if(!form.hidden&&!form.contains(e.target)&&!toggle.contains(e.target))close();});
})();
