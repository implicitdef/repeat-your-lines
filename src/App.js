import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

let onvoiceschangedDoneAlready = false;

function prepareSpeechInstance() {
  console.log("building instance");
  const instance = window.speechSynthesis;
  return new Promise(resolve => {
    // chrome
    if (instance.onvoiceschanged !== undefined && !onvoiceschangedDoneAlready) {
      instance.onvoiceschanged = () => resolve(instance);
      onvoiceschangedDoneAlready = true;
    } else {
      // FF
      resolve(instance);
    }
  });
}

class App extends Component {
  saySomething = () => {
    prepareSpeechInstance().then(speech => {
      const voices = speech.getVoices();
      console.log("got voices " + voices.length);
      console.log(voices.filter(_ => _.lang.includes("fr")).slice(0, 10));
      const utterance = new SpeechSynthesisUtterance(
        "Ah, chère amie, vous étiez là ?"
      );
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      voices.filter(_ => _.lang.includes("fr")).forEach(voice => {
        console.log("Saying it with ", voice);
        utterance.voice = voice;
        utterance.lang = voice.lang;
        speech.speak(utterance);
      });
    });
  };

  onVoicesReady = synth => {
    console.log("reading voices");
  };

  render() {
    return (
      <button
        onClick={() => {
          //this.saySomething();
          this.saySomething();
        }}
      >
        do something
      </button>
    );
  }
}

export default App;
