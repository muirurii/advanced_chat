import { Context } from "../context";
import { ContextTypes } from "../Types";
import { useContext } from "react";
import { RiChatPrivateLine } from "react-icons/ri";
import ChatLink, { ChatLoading } from "./ChatLink";
import { Link } from "react-router-dom";

const ChatLinks = ({ loading }: { loading: boolean }) => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: {
        friends,
        conversation: { status },
      },
    },
  } = context;

  return (
    <section
      className={`md:max-w-[320px] w-full h-[450px] backdrop-blur-sm card rounded 
    border border-secondary overflow-hidden transition-all duration-300
   ${
     !status
       ? "relative"
       : `absolute top-[100px] z-20
   -translate-x-full opacity-10
   md:relative md:transform-none md:top-0 md:opacity-100`
   }
  `}
    >
      <h1
        className={`backdrop-blur-sm bg-secondary text-sm
        py-3 px-5 flex items-center justify-center gap-x-2
        absolute top-0 left-0 w-full z-10
        `}
      >
        <RiChatPrivateLine />
        <span>Friends</span>
      </h1>
      <section
        className={`overflow-y-scroll h-full pt-[40px] ${
          loading
            ? `
            bg-transparent w-full
            loading-chat last:border-b after:absolute after:top-0 after:left-0 after:bottom-0
            after:w-8 after:-z-10 after:bg-[#ccc1]
            `
            : "last:border-[#ccc3]"
        }`}
      >
        <section className="h-fit">
          {loading ? (
            <>
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
              <ChatLoading />
            </>
          ) : friends.length ? (
            <>
              {friends.map((friend) => (
                <div key={friend._id}>
                  <ChatLink friend={friend} />
                </div>
              ))}
            </>) : (
              <section className="text-xs text-center pt-2">
                <p>You have no friends</p>
           <p>
            click
            <a href="" className="inline-block text-secondary underline px-1">
              <Link to="/profile">here</Link>
            </a>to add friends
            </p>
            </section>
            )
          }
        </section>
      </section>
    </section>
  );
};

export default ChatLinks;
