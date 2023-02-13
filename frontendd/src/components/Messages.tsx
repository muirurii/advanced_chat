import { useContext, useEffect, useRef, useState } from "react";
import { BiChevronsDown } from "react-icons/bi";
import { RiArrowLeftLine } from "react-icons/ri";
import dummyMessages from "../assets/images/dummyMessages";
import { Context } from "../context";
import { setConversation, setMessages } from "../context/actions/userActions";
import customFetch from "../customFunctions/customFetch";
import { ContextTypes, DummyMessageTypes } from "../Types";
import Message, { MessageLoading } from "./Message";

const Messages = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { conversation, token, messages, username },
    },
    dispatch,
  } = context;

  const [loading, setLoading] = useState<boolean>(true);

  const scrollRef = useRef<HTMLButtonElement>(null);
  setTimeout(() => {
    scrollRef.current?.click();
  }, 0);

  useEffect(() => {
    const getMessages = async () => {
      if (!conversation.status) return;
      setLoading(true);
      try {
        const res = await customFetch(
          `messages/${conversation.friendName}`,
          "GET",
          {},
          token
        );
        if (res.success) {
          setMessages(dispatch, res.data.messages);
          setTimeout(() => {
            scrollRef.current?.click();
          }, 0);
          setLoading(false);
        } else {
          throw new Error(res.message);
        }
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
      }
    };
    getMessages();
  }, [conversation.friendName]);

  return !conversation.status ? (
    <h1 className="text-sm text-center py-3 px-5 bg-secondary">
      Select a chat
    </h1>
  ) : (
    <section className="w-full h-full overflow-y-scroll scroll">
      <button
        ref={scrollRef}
        className="absolute bottom-16 right-5 rounded-full p-2 bg-secondary cursor-pointer z-40"
        onClick={(e) => {
          e.currentTarget.parentElement?.scrollBy(
            0,
            e.currentTarget.parentElement.scrollHeight
          );
        }}
      >
        <BiChevronsDown height={"28px"} width="28px" />
      </button>
      <section
        className="absolute bg-secondary top-0 left-0
      w-full flex items-center justify-start gap-x-2 z-10 px-2"
      >
        <button
          onClick={() => {
            setConversation(dispatch, { friendName: "", status: false });
          }}
        >
          <RiArrowLeftLine />
        </button>
        <h1 className="text-sm py-3 text-center w-full">
          {conversation.friendName}
        </h1>
      </section>
      <section className="-z-10 w-full min-h-full h-fit py-12 px-2 flex flex-col justify-start align-start">
        {!loading
          ? messages.map((message) => (
              <Message
                key={message._id}
                message={message}
                username={username}
              />
            ))
          : dummyMessages.map((message) => (
              <MessageLoading float={message.float} text={message.text} />
            ))}
      </section>
    </section>
  );
};

export default Messages;
