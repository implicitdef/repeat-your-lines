// It seems for chrome that we need to have a reference to window.speechSynthesis as soon as possible
// it triggers some loading of the voices
window.speechSynthesis.getVoices();

// workaround a garbage collection bug
// https://stackoverflow.com/questions/23483990/speechsynthesis-api-onend-callback-not-working
// https://bugs.chromium.org/p/chromium/issues/detail?id=509488#c11
window.utterances = [];

export function pickAvailableVoice({ lang, chosenVoice }) {
  const voices = window.speechSynthesis.getVoices();
  const chosenVoiceFound = voices.find(_ => _ === chosenVoice);
  if (chosenVoiceFound && chosenVoiceFound.lang === lang)
    return chosenVoiceFound;
  const firstVoiceForLang = lang && voices.find(_ => _.lang === lang);
  if (firstVoiceForLang) return firstVoiceForLang;
  const firstVoice = voices[0];
  if (firstVoice) return firstVoice;
  throw new Error(
    "Couldn't find a voice, available voices are " + voices.length
  );
}

export function saySomething({
  text,
  lang = 'fr-FR',
  pitch = 1,
  rate = 1,
  volume = 1,
  voice,
}) {
  const finalVoice = pickAvailableVoice({ lang, voice });
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = volume;
  utterance.voice = finalVoice;
  utterance.lang = lang;
  const finishedPromise = new Promise((resolve, reject) => {
    utterance.onend = () => {
      resolve();
    };
    utterance.onerror = err => {
      console.error('onerror fired', err);
      reject();
    };
  });
  window.utterances.push(utterance);
  const log = {
    name: finalVoice.name,
    pitch,
    rate,
    volume,
  };
  console.log(`Saying "${text}"`, log);
  window.speechSynthesis.speak(utterance);
  return finishedPromise;
}
