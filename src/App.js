import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import * as basicSpeech from "./services/basicSpeech";
import * as advancedSpeech from "./services/advancedSpeech";
import conversation from "./data/conversation";

const Trigger = ({ label, func }) => <button onClick={func}>{label}</button>;

class App extends Component {
  render() {
    return (
      <div>
        <Trigger
          label="first"
          func={() => {
            basicSpeech.saySomething({
              text: "Bien le bonjour monsieur comment va votre chien",
              rate: 0.8,
              pitch: 0.5
            });
          }}
        />
        <Trigger
          label="second"
          func={() => {
            advancedSpeech.speakConversationAllInSameVoice(conversation);
          }}
        />
      </div>
    );
  }
}

export default App;
