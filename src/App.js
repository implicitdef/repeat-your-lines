import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import * as speech from "./services/speech";

class App extends Component {
  saySomething = () => {
    speech.saySomething({
      text: "Ah, chère amie, vous étiez là ?"
    });
  };

  render() {
    return (
      <button
        onClick={() => {
          this.saySomething();
        }}
      >
        do something
      </button>
    );
  }
}

export default App;
