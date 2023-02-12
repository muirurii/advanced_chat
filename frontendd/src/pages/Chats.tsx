import { RiChatPrivateLine, RiSendPlaneFill } from "react-icons/ri";
import ChatLink, { ChatLoading } from "../components/ChatLink";
import Messages from "../components/Messages";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../context";
import { ContextTypes, MessageTypes } from "../Types";
import customFetch from "../customFunctions/customFetch";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { setFriends, toggleOnline,setMessages } from "../context/actions/userActions";

const socket = io("http://localhost:5000");
const Chats = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { username, token, isLogged, friends ,conversation,messages},
    },
    dispatch,
  } = context;

  const [loading, setLoading] = useState<boolean>(true);
  const [message,setMessage] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  const handleSend: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if(!message.length) return;
    socket.emit("send_text",{
       from:username,
      to:conversation.friendName,
      body:message,
     },()=> console.log(23412));
    
  };

  useEffect(() => {
    if (!isLogged) {
      return navigate("/");
      // socket.disconnect();
    }

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
          // console.log(context.state, data);
        });

        socket.on("new_text",(data:any)=>{
          setMessages(dispatch,[data]);
          console.log([...messages,data],"new");
        })
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
    <section className="pt-[100px] gradient min-h-screen pb-16 min-w-screen">
      <section className="w-[900px] h-[450px] mx-auto flex gap-x-4">
        <section className="w-[400px] h-full backdrop-blur-sm card rounded border border-secondary overflow-hidden">
          <h1
            className={`backdrop-blur-sm bg-secondary text-lg py-3 px-5 flex items-center justify-start gap-x-2`}
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
                {friends.map((friend) => (
                  <div key={friend._id}>
                    <ChatLink friend={friend} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <ChatLoading /><ChatLoading /><ChatLoading /><ChatLoading /><ChatLoading />
                <ChatLoading /><ChatLoading /><ChatLoading /><ChatLoading /><ChatLoading /><ChatLoading />
              </>
            )}
          </section>
        </section>
        <section
          className={`
        relative h-full w-full backdrop-blur-sm card rounded border border-secondary
        overflow-hidden
        `}
        >
          <Messages />
          <form
            onSubmit={handleSend}
            className="absolute top-full left-0 w-full -translate-y-full"
          >
            <div className="flex">
              <input
              type="text"
              className="w-full text-black pl-2 outline-none card border-t border-secondary"
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
              />
              <button className="bg-secondary p-4">
                <RiSendPlaneFill />
              </button>
            </div>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Chats;
