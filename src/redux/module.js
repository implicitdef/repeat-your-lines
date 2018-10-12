import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// ACTIONS

export const actions = {
  setHumanAuthor: createAction('SET_HUMAN_AUTHOR', humanAuthor => humanAuthor),
  setIsHumanPlaying: createAction(
    'SET_IS_HUMAN_PLAYING',
    isHumanPlaying => isHumanPlaying
  ),
  setIsPlaying: createAction('SET_IS_PLAYING', isPlaying => isPlaying),
  registerSentences: createAction('REGISTER_SENTENCES', sentences => sentences),
  registerVoicesFeaturesMap: createAction(
    'REGISTER_VOICES_FEATURES_MAP',
    map => map
  ),
  setCurrentSentenceIndex: createAction(
    'SET_CURRENT_SENTENCE_INDEX',
    index => index
  ),
  incrementCurrentSentenceIndex: createAction(
    'INCREMENT_CURRENT_SENTENCE_INDEX'
  ),
};

// REDUCER

export const reducer = handleActions(
  {
    [actions.setIsPlaying]: (state, action) => ({
      ...state,
      isPlaying: action.payload,
    }),
    [actions.setIsHumanPlaying]: (state, action) => ({
      ...state,
      isHumanPlaying: action.payload,
    }),
    [actions.setHumanAuthor]: (state, action) => ({
      ...state,
      humanAuthor: action.payload,
    }),
    [actions.registerSentences]: (state, action) => ({
      ...state,
      sentences: action.payload,
    }),
    [actions.registerVoicesFeaturesMap]: (state, action) => ({
      ...state,
      voicesFeaturesMap: action.payload,
    }),
    [actions.setCurrentSentenceIndex]: (state, action) => ({
      ...state,
      currentSentenceIndex: action.payload,
    }),
    [actions.incrementCurrentSentenceIndex]: state => ({
      ...state,
      currentSentenceIndex: state.currentSentenceIndex + 1,
    }),
  },
  {
    isPlaying: false,
    isHumanPlaying: false,
    sentences: null,
    currentSentenceIndex: 0,
    voicesFeaturesMap: null,
    humanAuthor: null,
  }
);

// SELECTORS

const baseSelectors = {
  sentences: s => s.sentences,
  isHumanPlaying: s => s.isHumanPlaying,
  currentSentenceIndex: s => s.currentSentenceIndex,
  voicesFeaturesMap: s => s.voicesFeaturesMap,
  isPlaying: s => s.isPlaying,
  humanAuthor: s => s.humanAuthor,
};

export const selectors = {
  ...baseSelectors,
  currentSentence: createSelector(
    baseSelectors.sentences,
    baseSelectors.currentSentenceIndex,
    (sentences, currentSentenceIndex) => {
      return sentences[currentSentenceIndex] || null;
    }
  ),
  voicesFeaturesForAuthor: author => state =>
    baseSelectors.voicesFeaturesMap(state)[author] || null,
};
