import { BiGroup } from "react-icons/bi";
import { RiChatPrivateLine } from "react-icons/ri";
import ChatLink from "../components/ChatLink";
import {io} from "socket.io-client";
import {useEffect} from "react";
import { useContext } from "react";
import { Context } from "../context";
import { setUser } from "../context/actions/setUser";
import { ContextTypes } from "../Types";


const socket = io("http://localhost:5000");
const Chats = () => {

  const context:ContextTypes = useContext(Context);
  
  
  useEffect(()=>{
    const getUser = async ()=>{
      try {
        
        socket.on("connect",()=>{
          // console.log("conn");
        });
        socket.emit("add_user",{id:socket.id,name:"P"});
    
        socket.on("active_users",(data: any)=>{
          // console.log(data)
        })
      } catch (error) {
        
      }

  }
   
    return ()=>{
      console.log("diss");
      socket.disconnect();
    }

  },[]);
  
    return (
      <section className="pt-[100px] gradient min-h-screen min-w-screen">
          <section className="w-[900px] h-[500px] mx-auto flex gap-x-4" >
            <section className="w-[400px] h-full card rounded">
             <h1 className="text-lg py-3 px-5 card flex items-center justify-start gap-x-2">
              <RiChatPrivateLine/><span>Private Chats</span></h1>
             <section className="last:border-b last:border-[#48c44810]">
                <ChatLink/>
                <ChatLink/>
                <ChatLink/>
                <ChatLink/>
             </section>
             <h1 className="text-lg py-3 px-5 card flex items-center justify-start gap-x-2">
              <BiGroup/><span>Rooms</span></h1>
             <section className="last:border-b last:border-[#48c44810]">
                <ChatLink/>
                <ChatLink/>
                <ChatLink/>
                <ChatLink/>
             </section>
            </section>
            <section className="card rounded w-full h-full">
            <h1 className="text-lg py-3 px-5 card">Chat One</h1>

            </section>
          </section>
      </section>
    )
  }
  
  export default Chats;