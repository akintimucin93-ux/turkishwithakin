// Read final states from unchanged activity DOMs. Completion points are not correctness scores.
export function finished(document,path){
 if(path==='oyunlar/zarf-fiiller/')return !!document.querySelector('#result.active');
 if(['oyunlar/harf-halkasi/','oyunlar/harf-halkasi/2/'].includes(path)){const end=document.getElementById('end');return !!end&&!end.hidden;}
 if(path==='oyunlar/kayip-dosya/'){const r=document.getElementById('result');return !!r&&!r.classList.contains('hidden')&&!!document.getElementById('submittedReport')?.textContent.trim();}
 if(path==='oyunlar/dil-dedektifi-olay-yeri-v2/')return document.getElementById('wallReveal')?.style.display==='block';
 if(path==='oyunlar/iyordu_GUNCELLENMIS_OYUN/')return document.getElementById('feedback')?.textContent==='Tebrikler! Beş uygulamayı da tamamladın.';
 if(path==='testler/zarf-fiiller/')return !!document.querySelector('#result.show')&&/^\d+\/10$/.test(document.getElementById('finalScore')?.textContent.trim()||'');
 return false;
}
export function outcome(document,path){
 if(!finished(document,path))return null;
 let correct,total;
 if(path==='oyunlar/zarf-fiiller/'){
  const value=document.getElementById('correctCount')?.textContent.trim();if(!/^\d+$/.test(value||''))return null;correct=Number(value);total=10;
 }else if(['oyunlar/harf-halkasi/','oyunlar/harf-halkasi/2/'].includes(path)){
  const match=document.getElementById('summary')?.textContent.match(/^(\d+) doğru · (\d+) yanlış · (\d+) pas$/);if(!match)return null;correct=Number(match[1]);total=Number(match[1])+Number(match[2])+Number(match[3]);if(total!==29)return null;
 }else if(path==='testler/zarf-fiiller/'){
  const match=document.getElementById('finalScore').textContent.match(/^(\d+)\/10$/);correct=Number(match[1]);total=10;
 }else return null;
 if(!Number.isInteger(correct)||correct<0||correct>total)return null;
 return {correct,total};
}
