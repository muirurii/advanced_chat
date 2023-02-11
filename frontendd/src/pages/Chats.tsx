import { BiGroup } from "react-icons/bi";
import { RiChatPrivateLine } from "react-icons/ri";
import ChatLink, { ChatLoading } from "../components/ChatLink";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../context";
import { ContextTypes } from "../Types";
import customFetch from "../customFunctions/customFetch";
import { NavigateFunction, useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");
const Chats = () => {
  const context: ContextTypes = useContext(Context);
  const {
    user: { username, token, isLogged },
  } = context.state;
  const [loading, setLoading] = useState<boolean>(true);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      return navigate("/");
      socket.disconnect();
    }

    const getFriends = async () => {
      try {
        const res = await customFetch(`user/u/${username}`, "GET", {}, token);

        socket.on("connect", () => {
          // console.log("conn");
        });
        socket.emit("add_user", { id: socket.id, name: "P" });

        socket.on("active_users", (data: any) => {
          // console.log(data)
        });
      } catch (error) {
        socket.disconnect();
      }
    };

    return () => {
      console.log("diss");
      socket.disconnect();
    };
  }, []);

  return (
    <section className="pt-[100px] gradient min-h-screen pb-16 min-w-screen">
      <section className="w-[900px] h-[450px] mx-auto flex gap-x-4">
        <section
          className="w-[400px] h-full backdrop-blur-sm card rounded overflow-hidden"        >
          <h1
            className={`backdrop-blur-sm bg-secondary text-lg py-3 px-5 flex items-center justify-start gap-x-2
          ${!loading ? "animate-pulse" : null}`}
          >
            <RiChatPrivateLine />
           <span>Private Chats</span>
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
                <ChatLink />
                <ChatLink />
                <ChatLink />
                <ChatLink />
              </>
            ) : <>
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
              <ChatLoading />
            </>}
          </section>
        </section>
        <section
        className={`h-full w-full backdrop-blur-sm card rounded overflow-hidden${
          loading
            ? `
              loading-chat last:border-b after:absolute after:top-0 after:left-0 after:bottom-0
              after:w-8 after:-z-10 after:bg-[#ccc1]
              `
            : "last:border-[#ccc3]"
        }`}
        >
          <h1 className="text-lg py-3 px-5 bg-secondary">Chat One</h1>
          {/* <section className ="flex items-center justify-center">
            <p> </p>
          </section> */}
          <section className ="flex items-center justify-center p-4">
            <p>Select a chat </p>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Chats;
