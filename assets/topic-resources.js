document.querySelectorAll('.topic-content').forEach(topic=>{
  topic.querySelectorAll('.resource-toggle').forEach(button=>{
    button.addEventListener('click',()=>{
      const panel=document.getElementById(button.getAttribute('aria-controls'));
      if(!panel)return;
      const willOpen=button.getAttribute('aria-expanded')!=='true';
      topic.querySelectorAll('.resource-toggle').forEach(other=>{
        other.setAttribute('aria-expanded','false');
        const otherPanel=document.getElementById(other.getAttribute('aria-controls'));
        if(otherPanel)otherPanel.hidden=true;
      });
      if(willOpen){button.setAttribute('aria-expanded','true');panel.hidden=false;}
    });
  });
});

/* Permanent rule: Level Completion is always the final main folder. */
document.querySelectorAll('.library').forEach(library=>{
  const completion=library.querySelector(':scope > .level-completion');
  if(completion)library.appendChild(completion);
});
