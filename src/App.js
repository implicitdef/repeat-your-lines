import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
//import * as speech from "./services/speech";
import * as newSpeechService from "./services/speech";

class App extends Component {
  render() {
    return (
      <button
        onClick={() => {
          newSpeechService.saySomething({
            text: "Bien le bonjour monsieur comment va votre chien",
            rate: 0.8,
            pitch: 0.5
          });
        }}
      >
        do something
      </button>
    );
  }
}

export default App;
