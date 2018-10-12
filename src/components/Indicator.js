import React from 'react';
import { connect } from 'react-redux';
import { selectors } from '../redux/module';

const Indicator = ({
  humanAuthor,
  isHumanPlaying,
  sentences,
  currentSentenceIndex,
}) => (
  <div>
    {sentences && (
      <ul>
        {sentences.map((sentence, index) => {
          const fontWeight = index === currentSentenceIndex ? 'bold' : 'normal';
          const human = sentence.author === humanAuthor;
          return (
            <li key={index} style={{ fontWeight }}>
              {sentence.author.toUpperCase()}
              {': '}
              {human ? '- - - - - - - - - - ' : sentence.text}
            </li>
          );
        })}
      </ul>
    )}
    {isHumanPlaying
      ? "Waiting on you... press space when you've said your line"
      : null}
  </div>
);

export default connect(state => ({
  humanAuthor: selectors.humanAuthor(state),
  isHumanPlaying: selectors.isHumanPlaying(state),
  sentences: selectors.sentences(state),
  currentSentenceIndex: selectors.currentSentenceIndex(state),
}))(Indicator);
