import { useEffect, useRef } from "react";
import { DummyMessageTypes, MessageTypes } from "../Types";

const Message = ({
  message,
  username,
}: {
  message: MessageTypes;
  username: string;
}) => {

  const fromMe: boolean = message.from === username;

  return (
    <article
      className={`${fromMe ? "self-end card" : "bg-[#ccc7]"}
        rounded-lg py-2 px-4 min-w-[100px] w-fit max-w-[260px] my-4 break-words
    `}
    >
      <h5 className="text-secondary text-xs pb-1">
        {fromMe ? "You" : message.from}
      </h5>
      <p className="text-xs">{message.body}</p>
      <p className="text-[8px] pt-1">
        {new Date(message.createdAt).toLocaleTimeString("en-US",{
          timeStyle:"short"
        })}
      </p>
    </article>
  );
};


export const MessageLoading = ({float,text}:DummyMessageTypes) =>{
 return <article
      className={`${float ? "self-end" : ""}
        rounded-lg py-2 px-4 my-4 card text-transparent text-xs max-w-[300px]
    `}
    >
      <h5 className="animate-pulse rounded"><span className="bg-[#ccc3]">You</span></h5>
      <p className="rounded animate-pulse"><span className="bg-[#ccc3]">{text}</span></p>
      <p className="rounded"><span className="bg-[#ccc3] animate-pulse">12:00 PM</span></p>
    </article>
}

export default Message;
