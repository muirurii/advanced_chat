import {useContext} from "react";
import { Context } from "../context";
import { ContextTypes } from "../Types";

const Messages = () => {
    const context:ContextTypes = useContext(Context);
    const {state:{user:{friends}}} = context;
  return (
    <div>Messages</div>
  )
}

export default Messages