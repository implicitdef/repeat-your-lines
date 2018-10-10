import { startConversation, endConversation } from "./actions";
import * as advancedSpeech from "../services/advancedSpeech";
import conversation from "../data/conversation";

const shortenedConversation = conversation; //.slice(0, 1);

export function playConversation() {
  return dispatch => {
    dispatch(startConversation());
    return advancedSpeech.speakConversation(shortenedConversation).then(() => {
      console.log("OK, in the promise then()");
      dispatch(endConversation());
    });
  };
}
