import React, { Component } from 'react';
//import logo from "../logo.svg";
import './Page.css';
import Controls from './Controls';
import Indicator from './Indicator';

class Page extends Component {
  render() {
    return (
      <div>
        <Controls />
        <Indicator />
      </div>
    );
  }
}

export default Page;
