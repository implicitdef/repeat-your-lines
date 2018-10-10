import React, { Component } from "react";
//import logo from "../logo.svg";
import "./Page.css";
import Buttons from "./Buttons";
import Indicator from "./Indicator";

class Page extends Component {
  render() {
    return (
      <div>
        <Buttons />
        <Indicator />
      </div>
    );
  }
}

export default Page;
