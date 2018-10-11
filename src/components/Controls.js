import React, { Fragment } from 'react';
import * as basicSpeech from '../services/basicSpeech';
import * as advancedSpeech from '../services/advancedSpeech';
import conversation from '../data/conversation';
import * as thunks from '../redux/thunks';
import { connect } from 'react-redux';

const QuickButton = ({ label, func }) => (
  <button onClick={func}>{label}</button>
);

const Controls = ({ onClickBigButton, onPlayConversation }) => (
  <Fragment>
    <div>
      <h2>direct acces to services</h2>
      <QuickButton
        label="juste une phrase"
        func={() => {
          basicSpeech.saySomething({
            text: 'Bien le bonjour monsieur comment va votre chien',
            rate: 0.8,
            pitch: 0.5,
          });
        }}
      />
      <QuickButton
        label="speak conversation with direct access to service"
        func={() => {
          advancedSpeech.speakConversation(conversation);
        }}
      />
    </div>
    <div>
      <h2>proper dispatch</h2>
      <QuickButton label="play Conversation" func={onPlayConversation} />
    </div>
  </Fragment>
);

export default connect(
  null,
  dispatch => ({
    onPlayConversation: () => dispatch(thunks.playSentences()),
  })
)(Controls);
