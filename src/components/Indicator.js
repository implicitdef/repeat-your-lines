import React from 'react';
import { connect } from 'react-redux';
import { selectors } from '../redux/module';

const Indicator = ({ isPlaying, sentences, currentSentenceIndex }) => (
  <div>
    <p> Status: {isPlaying ? 'Conversation en cours' : 'RAS'} </p>
    {sentences && (
      <ul>
        {sentences.map((sentence, index) => (
          <li
            key={index}
            style={{
              fontWeight: index === currentSentenceIndex ? 'bold' : 'normal',
            }}
          >
            {sentence.text}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default connect(state => ({
  isPlaying: selectors.isPlaying(state),
  sentences: selectors.sentences(state),
  currentSentenceIndex: selectors.currentSentenceIndex(state),
}))(Indicator);
