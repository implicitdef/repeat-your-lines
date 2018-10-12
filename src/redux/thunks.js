import * as advancedSpeech from '../services/advancedSpeech';
import * as sentencesFileParser from '../services/sceneFileParser';
import { actions, selectors } from './module';
import lelibertin from '../data/lelibertin.yaml';

export function playCurrentSentenceRecursive() {
  return (dispatch, getState) => {
    const state = getState();
    const sentence = selectors.currentSentence(state);
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
    if (isHumanPlaying) {
      dispatch(actions.setIsHumanPlaying(false));
      dispatch(actions.incrementCurrentSentenceIndex());
      dispatch(playCurrentSentenceRecursive());
    }
  };
}

export function playSentences() {
  return (dispatch, getState) => {
    dispatch(actions.setCurrentSentenceIndex(0));
    return dispatch(playCurrentSentenceRecursive());
  };
}

export function init() {
  return (dispatch, getState) => {
    const {
      sentences,
      voiceFeaturesMap,
      humanAuthor,
    } = sentencesFileParser.parse(lelibertin);
    dispatch(actions.registerSentences(sentences));
    dispatch(actions.registerVoicesFeaturesMap(voiceFeaturesMap));
    dispatch(actions.setCurrentSentenceIndex(0));
    dispatch(actions.setHumanAuthor(humanAuthor));
  };
}
