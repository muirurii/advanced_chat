import { useContext, useEffect } from "react";
import { Context } from "../context";
import { setMessages } from "../context/actions/userActions";
import customFetch from "../customFunctions/customFetch";
import { ContextTypes } from "../Types";
import Message from "./Message";

const Messages = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { conversation ,token,messages,username},
    },dispatch
  } = context;

  useEffect(()=>{
    const getMessages =async ()=>{
      console.log(conversation)
      if(!conversation.status) return;
      try{ 
      const res = await customFetch(`messages/${conversation.friendName}`,"GET",{},token);
      if(res.success){
        setMessages(dispatch,res.data.messages)
        console.log(res.data,"res");
        console.log(context.state.user.messages,"state");
      }else{
        throw new Error(res.message);
      }
    }catch(error:any){
      console.log(error.message)
    }
    }
    getMessages();
  },[conversation.friendName]);



  return !conversation.status ? (
    <h1 className="text-lg py-3 px-5 bg-secondary">Please select a chat</h1>
  ) : (
    <section className="w-full h-full overflow-scroll">
      <h1 className="text-lg py-3 px-5 bg-secondary absolute top-0 left-0 w-full">
        {conversation.friendName}
      </h1>
      <section className="w-full min-h-full h-fit py-12 px-2 flex flex-col justify-start align-start">
        {
        messages.map((message)=> <Message key={message._id} message={message} username={username} />)
        }
      </section>
    </section>
  );
};

export default Messages;
