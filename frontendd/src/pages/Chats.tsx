import Messages from "../components/Messages";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../context";
import { ContextTypes, MessageTypes } from "../Types";
import customFetch from "../customFunctions/customFetch";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  setFriends,
  toggleOnline,
  setNewMessage,
  setTab,
  setUnreadMessages,
  setMessageDelivered,
  setReadMessages,
} from "../context/actions/userActions";
import ChatLinks from "../components/ChatLinks";
import MessageForm from "../components/MessageForm";

const socket = io("");
const Chats = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { username, token, isLogged, conversation, friends },
      unreadMessages,
    },
    dispatch,
  } = context;

  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  const handleSend: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!message.length) return;
    socket.emit(
      "send_text",
      {
        from: username,
        to: conversation.friendName,
        body: message,
      },
      () => console.log(23412)
    );

    setMessage("");
  };

  useEffect(() => {
    setMessage("");
  }, [conversation.friendName]);

  useEffect(() => {
    if (!isLogged) {
      return navigate("/");
    }
    setTab(dispatch, "chats");
    const getFriends = async () => {
      try {
        const res = await customFetch("users/friends", "GET", {}, token);
        if (res.success) {
          setFriends(dispatch, res.data.friends);
          setUnreadMessages(dispatch, res.data.unread);
          setLoading(false);
        } else {
          throw new Error(res.error.message);
        }

        const friendsNames = friends
          .filter((friend) =>
            unreadMessages.some((mess) => mess.from === friend.username)
          )
          .map((friend) => friend.username);

        socket.emit("message_delivered", {friendsNames,username});

        socket.on("message_delivered", (data:string) => {
          setMessageDelivered(dispatch,data);
        });

        socket.on("message_seen", (data:string) => {
          console.log(data)
          setReadMessages(dispatch,data);
        });

        socket.on("connect", () => {
          // console.log("conn");
        });

        socket.emit("add_user", { id: socket.id, username }, () => []);

        socket.on("active_users", (data: { username: string }[]) => {
          toggleOnline(dispatch, data);
        });

        socket.on("new_text", (data: MessageTypes) => {
          setNewMessage(dispatch, data);
          socket.emit("message_delivered", {friendsNames,username});
        });
      } catch (error) {
        socket.disconnect();
      }
    };

    getFriends();

    return () => {
      // socket.disconnect();
    };
  }, []);

  const handleMessageSeen = (data:{username:string,friendName:string})=>{
    socket.emit("message_seen",data );
  }

  return (
    <section className="pt-[100px] gradient min-h-screen">
      <section className="h-[450px] mx-auto flex md:gap-x-4 justify-center px-2">
        <ChatLinks loading={loading} />
        <section
          className={`
        h-[450px] w-full md:max-w-[700px] backdrop-blur-sm card
        rounded border border-secondary overflow-hidden transition-transform duration-300
        ${
          conversation.status
            ? "relative"
            : `absolute top-[100px] z-20
        translate-x-full opacity-10
        md:relative md:transform-none md:top-0 md:opacity-100`
        }
        `}
        >
          <Messages loadingFriends={loading} handleMessageSeen={handleMessageSeen} />
          {conversation.status ? (
            <MessageForm
              message={message}
              setMessage={setMessage}
              handleSend={handleSend}
            />
          ) : null}
        </section>
      </section>
    </section>
  );
};

export default Chats;
