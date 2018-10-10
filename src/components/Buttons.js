import React, { Fragment } from "react";
import * as basicSpeech from "../services/basicSpeech";
import * as advancedSpeech from "../services/advancedSpeech";
import conversation from "../data/conversation";
import { startConversation } from "../redux/actions";
import { connect } from "react-redux";

const SimpleButton = ({ label, func }) => <button onClick={func}>{label}</button>;

const Buttons = ({ onClickBigButton, onPlayConversation }) => (
  <Fragment>
    <div>
      <h2>direct acces to services</h2>

      <SimpleButton
        label="juste une phrase"
        func={() => {
          basicSpeech.saySomething({
            text: "Bien le bonjour monsieur comment va votre chien",
            rate: 0.8,
            pitch: 0.5
          });
        }}
      />
      <SimpleButton
        label="speak conversation with direct access to service"
        func={() => {
          advancedSpeech.speakConversation(conversation);
        }}
      />
    </div>
    <div>
      <h2>proper dispatch</h2>
      <SimpleButton label="start Conversation" func={onClickBigButton} />
    </div>
  </Fragment>
);

export default connect(
  null,
  dispatch => ({
    onClickBigButton: () => dispatch(startConversation()),
    onPlayConversation: () => dispatch(startConversation())
  })
)(Buttons);
