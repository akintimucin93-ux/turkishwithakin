'use strict';
(function(){
  const catalog=window.AcademyCatalog;
  const isCatalog=!!document.getElementById('catalog-content');
  const rootPrefix=isCatalog?'../':'';
  let language='en';
  try{language=localStorage.getItem('turkishMateLanguage')==='tr'?'tr':'en';}catch(_e){}
  const translated=(en,tr)=>language==='tr'?tr:en;
  const liveOrigin='https://turkish.akinacademy.workers.dev/';
  // HTTP preview uses the untouched local content; file preview opens original live pages,
  // whose root-based shared CSS/JS cannot resolve under file://.
  function localPath(path){return (location.protocol==='file:'?liveOrigin:rootPrefix)+path;}
  function applyLanguage(value){
    language=value==='tr'?'tr':'en';
    document.documentElement.lang=language;
    document.querySelectorAll('[data-en][data-tr]').forEach(el=>{el.textContent=el.dataset[language];});
    document.querySelectorAll('[data-alt-en]').forEach(el=>{el.alt=el.dataset[language==='tr'?'altTr':'altEn'];});
    document.querySelectorAll('[data-aria-en]').forEach(el=>el.setAttribute('aria-label',el.dataset[language==='tr'?'ariaTr':'ariaEn']));
    document.querySelectorAll('[data-placeholder-en]').forEach(el=>el.placeholder=el.dataset[language==='tr'?'placeholderTr':'placeholderEn']);
    document.querySelectorAll('[data-lang]').forEach(button=>{const active=button.dataset.lang===language;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    try{localStorage.setItem('turkishMateLanguage',language);}catch(_e){}
    document.querySelector('.language')?.setAttribute('aria-label',translated('Language','Dil'));
    if(isCatalog)renderCatalog();
    updatePlayLabel();
    window.dispatchEvent(new Event('site-language-changed'));
  }
  function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
  function itemLink(item){
    const a=node('a','catalog-item');a.href=localPath(item.path);
    const content=node('div');content.append(node('h3','',item[language]),node('p','',item[language==='tr'?'descTr':'descEn']));
    const kind=item.path.endsWith('.pdf')?'PDF':catalog.types[searchMode?item.types[0]:selectedType][language];
    a.append(content,node('span','item-meta',kind));
    return a;
  }
  const params=new URLSearchParams(location.search);
  const searchMode=isCatalog&&params.has('q');
  const selectedType=catalog?.types[params.get('type')]?params.get('type'):'lessons';
  function foldState(){return [...document.querySelectorAll('.catalog-folder,.catalog-topic')].filter(d=>d.open).map(d=>d.dataset.level||d.dataset.topic);}
  function cloneB1Lessons(opened,expanded){
    const fragment=document.getElementById('b1-lessons-template').content.cloneNode(true);
    fragment.querySelectorAll('[data-en][data-tr]').forEach(el=>el.textContent=el.dataset[language]);
    fragment.querySelectorAll('[data-existing-path]').forEach(a=>a.href=localPath(a.dataset.existingPath));
    fragment.querySelectorAll('.catalog-topic').forEach(topic=>topic.open=opened.includes(topic.dataset.topic));
    fragment.querySelectorAll('.resource-toggle').forEach(button=>{
      const id=button.getAttribute('aria-controls');const open=expanded.includes(id);
      button.setAttribute('aria-expanded',String(open));
      fragment.querySelector('[id="'+id+'"]')?.toggleAttribute('hidden',!open);
    });
    return fragment;
  }
  function renderGames(mount){
    mount.classList.add('game-gallery');
    catalog.items.filter(item=>item.types.includes('games')).forEach(item=>{
      const art=window.AcademyGameArt[item.path];
      const a=node('a','gallery-game');a.href=localPath(item.path);a.dataset.gamePath=item.path;
      const picture=node('div','gallery-picture'+(art.vocabulary?' vocabulary-picture':''));picture.setAttribute('aria-hidden','true');
      if(art.image){const image=node('img',art.sheet?'existing-cover-sheet':'');image.src=rootPrefix+art.image;image.alt='';image.loading='lazy';image.decoding='async';picture.append(image);}
      else{picture.classList.add('graphic-'+art.graphic);if(art.graphic==='colors'){['#fc6275','#ffd15a','#47c1a8','#399afa'].forEach(color=>{const dot=node('i');dot.style.backgroundColor=color;picture.append(dot);});}else picture.append(node('span','graphic-letter',art.graphic==='alphabet'?'A Ğ Ş':'1 2 3'));}
      const copy=node('div','gallery-game-copy');const tags=node('div','game-tags');tags.append(node('span','game-level',item.levels.map(l=>l.toUpperCase()).join(' / ')),node('span','game-topic',art[language==='tr'?'topicTr':'topicEn']));
      copy.append(tags,node('h2','',item[language]),node('p','',item[language==='tr'?'descTr':'descEn']),node('span','game-play',translated('Play now →','Şimdi oyna →')));
      a.append(picture,copy);mount.append(a);
    });
    document.querySelector('.library-guide').textContent=translated('Choose from the existing games, with their level and topic on each card.','Mevcut oyunları seviye ve konu bilgileriyle doğrudan seçebilirsin.');
  }
  function normalize(value){return value.toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');}
  function renderCatalog(){
    const mount=document.getElementById('catalog-content');if(!mount)return;
    document.body.classList.add('catalog-page');
    const opened=foldState();const expanded=[...mount.querySelectorAll('.resource-toggle[aria-expanded="true"]')].map(b=>b.getAttribute('aria-controls'));mount.replaceChildren();mount.classList.remove('game-gallery');
    const heading=document.getElementById('catalog-title');
    const description=document.getElementById('catalog-description');
    if(searchMode){
      const query=(params.get('q')||'').trim().slice(0,120);
      heading.textContent=translated('Search Materials','Materyal Ara');
      description.textContent=translated(`Results for “${query}” in the existing resource catalog.`,`Mevcut kaynak kataloğunda “${query}” için sonuçlar.`);
      const words=normalize(query).split(/\s+/).filter(Boolean);
      const results=words.length?catalog.items.filter(item=>words.every(word=>normalize([item.en,item.tr,item.descEn,item.descTr,...item.levels,...item.types.map(type=>catalog.types[type].en+' '+catalog.types[type].tr)].join(' ')).includes(word))):[];
      mount.append(node('p','search-count',translated(`${results.length} materials found`,`${results.length} materyal bulundu`)));
      if(!results.length)mount.append(node('p','empty-state',translated('No matching material. Try a topic such as converbs, alphabet or past continuous.','Eşleşen materyal yok. Zarf-fiiller, alfabe veya şimdiki zamanın hikâyesi gibi bir konu ara.')));
      results.forEach(item=>{const a=itemLink(item);a.classList.add('catalog-search-item');a.querySelector('p').append(node('span','', ' · '+item.levels.map(l=>l.toUpperCase()).join(' / ')));mount.append(a);});
      document.querySelector('.library-guide').textContent=translated('Search includes existing lessons, PDFs, games, reading, vocabulary, alphabet audio and the reading book.','Arama; mevcut dersleri, PDF’leri, oyunları, okumaları, kelimeleri, alfabe seslerini ve okuma kitabını kapsar.');
    }else if(selectedType==='games'){
      heading.textContent=translated('Learn Turkish Through Play','Oyunlarla Türkçe Öğren');
      description.textContent=translated('Choose a game and start exploring. Your level and the topic are right on the card.','Bir oyun seç ve keşfetmeye başla. Seviye ve konu bilgisi her kartın üzerinde.');
      renderGames(mount);
    }else{
      const type=catalog.types[selectedType];heading.textContent=type[language];
      description.textContent=translated('Choose A1, A2 or B1 below. Open a folder to see only the available materials in this category.','Aşağıdan A1, A2 veya B1 seviyesini seç. Yalnızca bu kategorideki mevcut materyalleri görmek için klasörü aç.');
      catalog.levels.forEach(level=>{
        const items=catalog.items.filter(item=>item.levels.includes(level.id)&&item.types.includes(selectedType));
        const details=node('details','catalog-folder');details.dataset.level=level.id;details.open=opened.includes(level.id);
        const summary=node('summary');summary.append(node('span','folder-mark',level.label));
        const folderHeading=node('div','folder-heading');folderHeading.append(node('h2','',`${level.label} · ${level[language]}`),node('p','',translated(`${items.length} available ${items.length===1?'material':'materials'}`,`${items.length} mevcut materyal`)));
        summary.append(folderHeading,node('span','folder-chevron','⌄'));summary.lastChild.setAttribute('aria-hidden','true');
        const content=node('div','folder-items');
        if(level.id==='b1'&&selectedType==='lessons'){content.append(cloneB1Lessons(opened,expanded));}
        else if(items.length)items.forEach(item=>content.append(itemLink(item)));
        else content.append(node('p','empty-state',translated('The content in this section will be updated and added later.','Bu bölümdeki içerikler daha sonra güncellenecek ve eklenecektir.')));
        details.append(summary,content);mount.append(details);
      });
    }
    document.title=heading.textContent+' — Akın Academy';
    const input=document.querySelector('.site-search input');if(searchMode&&input)input.value=params.get('q')||'';
  }
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>applyLanguage(button.dataset.lang)));
  const menu=document.querySelector('.menu-toggle');const nav=document.getElementById('main-nav');
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
  nav?.addEventListener('click',event=>{if(event.target.closest('a')){menu?.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');}});
  if(location.protocol==='file:')document.querySelectorAll('[data-offline]').forEach(a=>{
    const path=a.dataset.offline.replace(/^(\.\.\/)+/,'').replace(/index\.html$/,'');
    a.href=liveOrigin+path;
  });
  // One delegated handler continues to work after language changes recreate the selector.
  document.getElementById('catalog-content')?.addEventListener('click',event=>{
    const button=event.target.closest('.resource-toggle');if(!button)return;
    const topic=button.closest('.catalog-topic');if(!topic)return;
    const panel=document.getElementById(button.getAttribute('aria-controls'));if(!panel)return;
    const willOpen=button.getAttribute('aria-expanded')!=='true';
    topic.querySelectorAll('.resource-toggle').forEach(other=>{
      other.setAttribute('aria-expanded','false');
      const otherPanel=document.getElementById(other.getAttribute('aria-controls'));
      if(otherPanel)otherPanel.hidden=true;
    });
    if(willOpen){button.setAttribute('aria-expanded','true');panel.hidden=false;}
  });
  const track=document.querySelector('.review-track');
  let autoplay=null;let playing=false;let suspended=false;
  const play=document.getElementById('review-play');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  function updatePlayLabel(){if(play){play.textContent=translated(playing?'Pause':'Play',playing?'Duraklat':'Oynat');play.setAttribute('aria-pressed',String(playing));}}
  function move(delta){if(!track)return;const card=track.querySelector('.review-card');if(!card)return;const gap=parseFloat(getComputedStyle(track).columnGap)||16;const step=card.getBoundingClientRect().width+gap;const end=track.scrollWidth-track.clientWidth;const next=track.scrollLeft+delta*step;track.scrollTo({left:next>end+3?0:next< -3?end:Math.min(end,Math.max(0,next)),behavior:reducedMotion.matches?'instant':'smooth'});}
  function stop(){if(autoplay)clearInterval(autoplay);autoplay=null;playing=false;updatePlayLabel();}
  document.getElementById('review-prev')?.addEventListener('click',()=>{stop();move(-1);});
  document.getElementById('review-next')?.addEventListener('click',()=>{stop();move(1);});
  play?.addEventListener('click',()=>{if(playing){stop();return;}playing=true;move(1);autoplay=setInterval(()=>{if(!suspended&&!document.hidden)move(1);},4500);updatePlayLabel();});
  track?.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();stop();move(event.key==='ArrowRight'?1:-1);}});
  track?.addEventListener('pointerenter',()=>suspended=true);track?.addEventListener('pointerleave',()=>suspended=false);
  track?.addEventListener('focusin',()=>suspended=true);track?.addEventListener('focusout',()=>suspended=false);
  track?.addEventListener('pointerdown',stop);track?.addEventListener('touchstart',stop,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  applyLanguage(language);
})();
