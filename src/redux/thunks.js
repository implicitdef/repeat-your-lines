import sentences from '../data/conversation';
import * as advancedSpeech from '../services/advancedSpeech';
import { actions, selectors } from './module';

export function playCurrentSentenceRecursive() {
  return (dispatch, getState) => {
    const sentence = selectors.currentSentence(getState());
    if (sentence) {
      const { text, author } = sentence;
      const voicesFeatures = selectors.voicesFeaturesForAuthor(author);
      if (!voicesFeatures) {
        console.warn(`voices features not found for ${author}`);
      }
      dispatch(actions.setIsPlaying(true));
      return advancedSpeech
        .speakSingleSentence(text, voicesFeatures)
        .then(() => {
          dispatch(actions.setIsPlaying(false));
          dispatch(actions.incrementCurrentSentenceIndex());
          return dispatch(playCurrentSentenceRecursive());
        });
    }
  };
}

export function playSentences() {
  return (dispatch, getState) => {
    dispatch(actions.registerSentences(sentences));
    const authors = advancedSpeech.extractAuthorsFromSentences(sentences);
    const map = advancedSpeech.associateVoiceAndVoiceFeaturesToAuthors(authors);
    dispatch(actions.registerVoicesFeaturesMap(map));
    dispatch(actions.setCurrentSentenceIndex(0));
    return dispatch(playCurrentSentenceRecursive());
  };
}
