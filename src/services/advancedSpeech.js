import * as basicSpeech from './basicSpeech';

export function associateVoiceAndVoiceFeaturesToAuthors(authors) {
  const lang = 'fr-FR';
  const voice = basicSpeech.pickAvailableVoice({ lang });
  const aFewDifferentVoiceFeatures = [
    {
      rate: 0.8,
      pitch: 0.3,
      volume: 0.7,
    },
    { rate: 1.3, pitch: 1.5, volume: 1.4 },
    {
      rate: 1.2,
      pitch: 0.7,
      volume: 0.9,
    },
    {
      rate: 1,
      pitch: 1.1,
      volume: 1.3,
    },
  ];
  const authorsToFeatures = {};
  authors.forEach((author, index) => {
    const features =
      aFewDifferentVoiceFeatures[index % aFewDifferentVoiceFeatures.length];
    authorsToFeatures[author] = {
      ...features,
      voice,
      lang,
    };
  });
  return authorsToFeatures;
}

export function extractAuthorsFromSentences(conversation) {
  return [...new Set(conversation.map(_ => _.author))];
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
