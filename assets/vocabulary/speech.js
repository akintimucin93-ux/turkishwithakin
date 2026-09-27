// Use bundled Turkish recordings; use a Turkish device voice when a recording is unavailable.
(()=>{
 let voice=null,activeAudio=null,currentUtterance=null,serial=0;
 const synth=window.speechSynthesis;
 function status(text){document.querySelectorAll('[data-speech-status]').forEach(e=>e.textContent=text)}
 function refresh(){let voices=[];try{voices=synth?.getVoices()||[]}catch(e){}const tr=voices.filter(v=>/^tr(?:-|_|$)/i.test(v.lang));voice=tr.find(v=>v.localService)||tr[0]||null;const recordings=!!window.VOCABULARY?.audioFiles?.['letter-0'];status(recordings?'Ses kayıtları hazır. / Audio recordings ready.':voice?'Türkçe ses hazır. / Turkish voice ready.':'Türkçe ses aranıyor. “Sesi dene” düğmesine bas. / Press “Test audio” to check Turkish speech.');return !!voice}
 function cancel(){serial++;if(synth)synth.cancel();if(activeAudio){activeAudio.pause();activeAudio=null}currentUtterance=null;document.querySelectorAll('[data-speaking]').forEach(e=>{e.removeAttribute('data-speaking');e.setAttribute('aria-pressed','false')})}
 function speak(text,key,button){cancel();const turn=serial;const file=(window.VOCABULARY?.audioFiles||{})[key];const clear=()=>{if(turn!==serial)return;button?.removeAttribute('data-speaking');button?.setAttribute('aria-pressed','false')};const fail=()=>{if(turn!==serial)return;clear();status('Ses çalınamadı. Cihazın sesini ve Türkçe ses ayarını kontrol et; tekrar deneyebilirsin. / Check your device volume and Turkish voice settings, then retry.')};if(button){button.setAttribute('data-speaking','true');button.setAttribute('aria-pressed','true')}
  if(file){activeAudio=new Audio(file);activeAudio.onended=()=>{if(turn!==serial)return;clear();status('Ses kayıtları hazır. / Audio recordings ready.')};activeAudio.onerror=fail;activeAudio.play().catch(fail);status('Dinleniyor / Playing…');return true}
  refresh();if(!synth||!voice){clear();status('Bu cihazda Türkçe ses bulunamadı. Cihazının konuşma ayarlarına Türkçe ses ekle veya başka bir tarayıcı dene. Görsel etkinliklerle devam edebilirsin. / No Turkish voice is available on this device. Add a Turkish voice in speech settings or try another browser; visual practice is still available.');return false}
  try{const utterance=new SpeechSynthesisUtterance(text);utterance.lang='tr-TR';utterance.voice=voice;utterance.rate=.85;utterance.pitch=1;utterance.volume=1;utterance.onend=()=>{if(turn!==serial)return;clear();status('Türkçe ses hazır. / Turkish voice ready.')};utterance.onerror=fail;currentUtterance=utterance;synth.resume();synth.speak(utterance);status('Dinleniyor / Playing…');return true}catch(e){fail();return false}
 }
 if(synth)synth.addEventListener('voiceschanged',refresh);refresh();
 window.addEventListener('pagehide',cancel);
 window.TurkishSpeech={speak,cancel,available:()=>refresh()||window.VOCABULARY?.alphabet?.every((_,i)=>window.VOCABULARY.audioFiles?.['letter-'+i]&&window.VOCABULARY.audioFiles?.['word-'+window.VOCABULARY.alphabet[i].word])||false};
})();
