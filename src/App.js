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
          newSpeechService.saySomething({ text: "Bien le bonjour" });
        }}
      >
        do something
      </button>
    );
  }
}

export default App;
