import * as basicSpeech from './basicSpeech';

export function augmentVoiceFeaturesMap(voiceFeaturesMap) {
  const lang = 'fr-FR';
  const voice = basicSpeech.pickAvailableVoice({ lang });
  const finalVoiceFeaturesMap = {};
  voiceFeaturesMap.entries.forEach(([author, voiceFeatures]) => {
    finalVoiceFeaturesMap[author] = {
      rate: 1,
      pitch: 1,
      volume: 1,
      ...voiceFeatures,
      lang,
      voice,
    };
  });
  return finalVoiceFeaturesMap;
}

export function speakSingleSentence(text, voiceAndVoiceFeatures) {
  const { voice, pitch, rate, volume, lang } = voiceAndVoiceFeatures;
  return basicSpeech.saySomething({
    text,
    voice,
    pitch,
    rate,
    volume,
    lang,
  });
}
