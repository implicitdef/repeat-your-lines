//import logo from "./logo.svg";

let onvoiceschangedDoneAlready = false;

function prepareSpeechInstance() {
  console.log("Building instance");
  const instance = window.speechSynthesis;
  return new Promise(resolve => {
    // chrome
    if (instance.onvoiceschanged !== undefined && !onvoiceschangedDoneAlready) {
      instance.onvoiceschanged = () => resolve(instance);
      onvoiceschangedDoneAlready = true;
    } else {
      // FF
      resolve(instance);
    }
  });
}

function pickAvailableVoice(speechSynthesis, { lang, chosenVoice }) {
  //debugger;
  const voices = speechSynthesis.getVoices();
  const chosenVoiceFound = voices.find(_ => _ === chosenVoice);
  if (chosenVoiceFound && chosenVoiceFound.lang === lang)
    return chosenVoiceFound;
  const firstVoiceForLang = voices.find(_ => _.lang === lang);
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
  return prepareSpeechInstance().then(speechInstance => {
    const finalVoice = pickAvailableVoice(speechInstance, { lang, voice });
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    utterance.voice = finalVoice;
    utterance.lang = lang;
    console.log(`Saying "${text}" with ${finalVoice.name}`);
    speechInstance.speak(utterance);
    // TODO maybe return the promise only when it has finish talking
  });
}
