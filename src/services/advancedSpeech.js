import * as basicSpeech from "./basicSpeech";

function associateVoicesAndVoiceFeatures(conversation) {
  const authors = [...new Set(conversation.map(_ => _.by))];
  const lang = "fr-FR";
  const voice = basicSpeech.pickAvailableVoice({ lang });
  const aFewDifferentVoiceFeatures = [
    { rate: 0.8, pitch: 0.5, volume: 0.7 },
    { rate: 1.2, pitch: 0.9, volume: 0.9 },
    { rate: 1, pitch: 0.7, volume: 1.3 },
    { rate: 1.3, pitch: 1, volume: 1.4 }
  ];
  const authorsToFeatures = {};
  authors.forEach((author, index) => {
    const features =
      aFewDifferentVoiceFeatures[index % aFewDifferentVoiceFeatures.length];
    authorsToFeatures[author] = {
      ...features,
      voice,
      lang
    };
  });
  return conversation.map(({ by, text }) => ({
    by,
    text,
    ...authorsToFeatures[by]
  }));
}

export function speakConversationAllInSameVoice(conversation) {
  return associateVoicesAndVoiceFeatures(conversation)
    .reduce((acc, current) => {
      const { text, voice, pitch, rate, volume, lang } = current;
      return acc.then(() =>
        basicSpeech.saySomething({
          text,
          voice,
          pitch,
          rate,
          volume,
          lang
        })
      );
    }, Promise.resolve())
    .then(() => {
      console.log("Conversation should be finished now");
    });
}
