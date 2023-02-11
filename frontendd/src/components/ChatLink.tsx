import {useEffect} from "react";
import { Friend } from "../Types";


const ChatLink = ({friend}:{friend:Friend}) =>{
    useEffect(()=>{
        // socket.emit("open_chat",{from:"User1",to:"User2"});
        
        return ()=>{
            // socket.disconnect();
        }
    });
  return <p className="p-3 border-b border-[#ccc3]" >{friend.username}</p>
}

export const ChatLoading = () =>{
    return(
        <p className="p-3 border-b border-[#ccc3] animate-pulse" >
            <span className="text-transparent block w-24 h-4 rounded-sm bg-[#ccc3]"></span>
        </p>
    );
}
export default ChatLink