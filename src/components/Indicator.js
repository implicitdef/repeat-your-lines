import React from "react";
import { connect } from "react-redux";

const Indicator = ({ isConversationRunning }) => (
  <p> Status: {isConversationRunning ? "Conversation en cours" : "RAS"} </p>
);

export default connect(state => ({
  isConversationRunning: state.conversation.isRunning
}))(Indicator);
