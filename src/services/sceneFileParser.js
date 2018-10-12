import yaml from 'js-yaml';

export function parse(input) {
  const doc = yaml.safeLoad(input);
  const sentences = doc.sentences.map(sentence => {
    const author = Object.keys(sentence)[0];
    const text = sentence[author];
    return { author, text };
  });
  const voiceFeaturesMap = doc.authors;
  let humanAuthor = doc.humanAuthor || null;
  return { voiceFeaturesMap, sentences, humanAuthor };
}
