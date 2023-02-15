import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { Context } from "../context";
import { ContextTypes } from "../Types";
import { useContext } from "react";

const MessageForm = ({
  handleSend,
  setMessage,
  message,
}: {
  handleSend: React.FormEventHandler<HTMLFormElement>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}) => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { conversation },
    },
  } = context;

  return (
    <form
      onSubmit={handleSend}
      className={`absolute top-full left-0 w-full ${
        conversation.status
          ? "-translate-y-full transition-all duration-300"
          : null
      }`}
    >
      <div className="flex">
        <input
          type="text"
          className="w-full pl-2 outline-none card border-t border-secondary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-secondary p-4">
          <RiSendPlaneFill />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
