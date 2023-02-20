import { DummyMessageTypes, MessageTypes } from "../Types";
import { BiCheck, BiCheckDouble } from "react-icons/bi";

const Message = ({
  message,
  username,
}: {
  message: MessageTypes;
  username: string;
}) => {

  const {from,body,createdAt,status:{delivered,seen}} = message;
  const fromMe: boolean = from === username;

  return (
    <article
      className={`${fromMe ? "self-end card" : "bg-[#ccc7]"}
        rounded-lg py-2 px-4 min-w-[100px] w-fit max-w-[260px] my-4 break-words
    `}
    >
      <h5 className="text-secondary text-xs pb-1">
        {fromMe ? "You" : from}
      </h5>
      <p className="text-xs">{body}</p>
      <p className="text-[8px] pt-1 flex items-start justify-between">
       <span>
        {new Date(createdAt).toLocaleTimeString("en-US",{
          timeStyle:"short"
        })}
        </span>
        {
          !fromMe ? null : delivered  ? (
          <BiCheckDouble className={`h-3 w-3 ${seen ? "fill-secondary" : null}`} />
          ) : (
          <BiCheck className="h-3 w-3" />
          )
        }
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
