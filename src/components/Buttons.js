import React, { Fragment } from "react";
import * as basicSpeech from "../services/basicSpeech";
import * as advancedSpeech from "../services/advancedSpeech";
import conversation from "../data/conversation";

const SimpleButton = ({ label, func }) => <button onClick={func}>{label}</button>;

const Buttons = () => (
  <Fragment>
    <SimpleButton
      label="first"
      func={() => {
        basicSpeech.saySomething({
          text: "Bien le bonjour monsieur comment va votre chien",
          rate: 0.8,
          pitch: 0.5
        });
      }}
    />
    <SimpleButton
      label="second"
      func={() => {
        advancedSpeech.speakConversationAllInSameVoice(conversation);
      }}
    />
  </Fragment>
);

export default Buttons;
