import React from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';

const Controls = ({ onClickBigButton, onPlayConversation, onHumanPlayed }) => (
  <div>
    <button onClick={onPlayConversation}>{'play Conversation'}</button>
  </div>
);

export default connect(
  null,
  dispatch => ({
    onPlayConversation: () => dispatch(thunks.playSentences()),
    onHumanPlayed: () => dispatch(thunks.onHumanPlayed()),
  })
)(Controls);
