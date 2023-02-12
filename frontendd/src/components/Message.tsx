import { useEffect, useRef } from "react";
import { MessageTypes } from "../Types";

const Message = ({
  message,
  username,
  isLast,
}: {
  message: MessageTypes;
  username: string;
  isLast: boolean;
}) => {
  // const lastEl:React.MutableRefObject<HTMLElement> = useRef();
  const fromMe: boolean = message.from === username;

  useEffect(() => {
    // console.log(isLast ? "" : message.body);
    // window.scrollTo(400,-window.innerHeight)
  }, []);

  return (
    <article
      className={`${fromMe ? "self-end" : "border border-secondary"}
        rounded-lg card py-2 px-4 w-fit my-4
    `}
      // ref={lastEl}
    >
      <h5 className="text-secondary text-xs">
        {fromMe ? "You" : message.from}
      </h5>
      <p className="text-sm">{message.body}</p>
      <p className="text-[8px]">
        {new Date(message.createdAt).toLocaleTimeString("en-US",{
          timeStyle:"short"
        })}
      </p>
    </article>
  );
};

export default Message;
