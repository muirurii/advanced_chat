import { Context } from "../context";
import { ContextTypes } from "../Types";
import { useContext } from "react";
import { RiChatPrivateLine } from "react-icons/ri";
import ChatLink, { ChatLoading } from "./ChatLink";

const ChatLinks = ({ loading }: { loading: boolean }) => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { username, friends },
    },
  } = context;

  return (
    <section className="w-[500px] h-full backdrop-blur-sm card rounded border border-secondary overflow-hidden">
      <h1
        className={`backdrop-blur-sm bg-secondary text-sm py-3 px-5 flex items-center justify-start gap-x-2`}
      >
        <RiChatPrivateLine />
        <span>{username} Chats</span>
      </h1>
      <section
        className={`${
          loading
            ? `
            h-full bg-transparent w-full
            loading-chat last:border-b after:absolute after:top-0 after:left-0 after:bottom-0
            after:w-8 after:-z-10 after:bg-[#ccc1]
            `
            : "last:border-[#ccc3]"
        }`}
      >
        {!loading ? (
          <>
            {friends.map((friend) => (
              <div key={friend._id}>
                <ChatLink friend={friend} />
              </div>
            ))}
          </>
        ) : (
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
        )}
      </section>
    </section>
  );
};

export default ChatLinks;
