import { useContext, useEffect, useRef, useState } from "react";
import { BiChevronsDown } from "react-icons/bi";
import { RiArrowLeftLine } from "react-icons/ri";
import dummyMessages from "../assets/images/dummyMessages";
import { Context } from "../context";
import { setConversation, setMessages } from "../context/actions/userActions";
import customFetch from "../customFunctions/customFetch";
import { ContextTypes } from "../Types";
import Message, { MessageLoading } from "./Message";

let scrollTimeout: any;

const Messages = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: {
        conversation: { friendName, status },
        token,
        messages,
        username,
        friends,
      },
    },
    dispatch,
  } = context;

  const [loading, setLoading] = useState<boolean>(true);
  const isOnline = friends.some(
    (friend) => friend.username === friendName && friend.isOnline
  );

  const scrollRef = useRef<HTMLButtonElement>(null);
  setTimeout(() => {
    scrollRef.current?.click();
  }, 0);

  useEffect(() => {
    const getMessages = async () => {
      if (!status) return;
      setLoading(true);
      try {
        const res = await customFetch(
          `messages/${friendName}`,
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
  }, [friendName]);


  return !status ? (
    <h1 className="text-sm text-center py-3 px-5 bg-secondary">
      Select a chat
    </h1>
  ) : (
    <section
      className="w-full h-full overflow-y-scroll scroll"
    >
      <button
        ref={scrollRef}
        className="absolute bottom-14 right-0 rounded-full p-1 bg-secondary cursor-pointer z-40"
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
          <p>
            {friendName}
            {isOnline ? (
              <>
                <span className="h-2 w-2 bg-white rounded-full mx-2 inline-block"></span>
                <span className="text-xs pt-1">online</span>
              </>
            ) : null}
          </p>
        </h1>
      </section>
      <section className="-z-10 w-full min-h-full h-fit py-14 px-2 flex flex-col justify-start align-start">
        {loading ? (
          dummyMessages.map((message) => (
            <MessageLoading float={message.float} text={message.text} />
          ))
        ) : !messages.length ? (
          <p className="text-center text-sm">Send a message to {friendName}</p>
        ) : (
          messages.map((message) => (
            <Message key={message._id} message={message} username={username} />
          ))
        )}
      </section>
    </section>
  );
};

export default Messages;
