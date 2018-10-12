//import sentences from '../data/conversation';
import * as advancedSpeech from '../services/advancedSpeech';
import * as sentencesFileParser from '../services/sentencesFileParser';
import { actions, selectors } from './module';
import lelibertin from '../data/lelibertin';

export function playCurrentSentenceRecursive() {
  return (dispatch, getState) => {
    const state = getState();
    const sentence = selectors.currentSentence(state);
    console.log('OK I should play ', sentence);
    if (sentence) {
      const { text, author } = sentence;
      const humanAuthor = selectors.humanAuthor(state);
      if (author === humanAuthor) {
        return dispatch(actions.setIsHumanPlaying(true));
      }
      const voicesFeatures = selectors.voicesFeaturesForAuthor(author)(state);
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

export function onHumanPlayed() {
  return (dispatch, getState) => {
    const isHumanPlaying = selectors.isHumanPlaying(getState());
    console.log('onHumanPlayed, was he playing ?', isHumanPlaying);
    if (isHumanPlaying) {
      dispatch(actions.setIsHumanPlaying(false));
      dispatch(actions.incrementCurrentSentenceIndex());
      dispatch(playCurrentSentenceRecursive());
    }
  };
}

export function playSentences() {
  return (dispatch, getState) => {
    console.log('playSentences');
    const authors = advancedSpeech.extractAuthorsFromSentences(
      selectors.sentences(getState())
    );
    const map = advancedSpeech.associateVoiceAndVoiceFeaturesToAuthors(authors);
    dispatch(actions.registerVoicesFeaturesMap(map));
    dispatch(actions.setCurrentSentenceIndex(0));
    return dispatch(playCurrentSentenceRecursive());
  };
}

export function init() {
  return (dispatch, getState) => {
    const sentences = sentencesFileParser.parse(lelibertin);
    dispatch(actions.registerSentences(sentences));
    dispatch(actions.setCurrentSentenceIndex(0));
    dispatch(actions.setHumanAuthor('Bet'));
  };
}
