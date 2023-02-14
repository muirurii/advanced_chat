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
} from "../context/actions/userActions";
import ChatLinks from "../components/ChatLinks";
import MessageForm from "../components/MessageForm";

const socket = io("http://localhost:5000");
const Chats = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { username, token, isLogged, conversation },
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
    setTab(dispatch,"chats");
    const getFriends = async () => {
      try {
        const res = await customFetch("users/friends", "GET", {}, token);
        if (res.success) {
          setFriends(dispatch, res.data.friends);
          setLoading(false);
        } else {
          throw new Error(res.error.message);
        }

        socket.on("connect", () => {
          console.log("conn");
        });

        socket.emit("add_user", { id: socket.id, username }, () => []);

        socket.on("active_users", (data: { username: string }[]) => {
          toggleOnline(dispatch, data);
        });

        socket.on("new_text", (data: MessageTypes) => {
          setNewMessage(dispatch, data);
          console.log(data, "new");
        });
      } catch (error) {
        console.log(error);
        socket.disconnect();
      }
    };

    getFriends();

    return () => {
      console.log("diss");
      // socket.disconnect();
    };
  }, []);

  return (
    <section className="pt-[100px] gradient min-h-screen pb-16">
      <section className="w-[1200px] h-[450px] mx-auto flex gap-x-4">
        <ChatLinks loading={loading} />
        <section
          className={`
        relative h-full w-full backdrop-blur-sm card rounded border border-secondary
        overflow-hidden
        `}
        >
          <Messages />
          {conversation.status ? (
           <MessageForm message={message} setMessage={setMessage} handleSend={handleSend} />
          ) : null
          }
        </section>
        <ChatLinks loading={loading}/>
      </section>
    </section>
  );
};

export default Chats;
