console.log("newSpeechService.js");
// It seems for chrome that we need to have a reference to window.speechSynthesis as soon as possible
// it triggers some loading of the voices
window.speechSynthesis.getVoices();

export function doSomething() {
  const chosenVoice = pickAvailableVoice({ lang: "fr-FR" });
  console.log("chosenVoice : ", chosenVoice);
}

function pickAvailableVoice({ lang, chosenVoice }) {
  const voices = window.speechSynthesis.getVoices();
  const chosenVoiceFound = voices.find(_ => _ === chosenVoice);
  if (chosenVoiceFound && chosenVoiceFound.lang === lang)
    return chosenVoiceFound;
  const firstVoiceForLang = lang && voices.find(_ => _.lang === lang);
  if (firstVoiceForLang) return firstVoiceForLang;
  const firstVoice = voices[0];
  if (firstVoice) return firstVoice;
  throw new Error("Couldn't find a voice");
}

export function saySomething({
  text,
  lang = "fr-FR",
  pitch = 1,
  rate = 1,
  volume = 1,
  voice
}) {
  const finalVoice = pickAvailableVoice({ lang, voice });
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = volume;
  utterance.voice = finalVoice;
  utterance.lang = lang;
  const promise = new Promise((resolve, reject) => {
    utterance.onend = resolve;
    utterance.onerror = reject;
  });
  console.log(`Saying "${text}" with ${finalVoice.name}`);
  window.speechSynthesis.speak(utterance);
  return promise;
}
