
import {useEffect} from "react";


const ChatLink = () =>{
    useEffect(()=>{
        // socket.emit("open_chat",{from:"User1",to:"User2"});
        
        return ()=>{
            // socket.disconnect();
        }
    });
  return <p className="p-3 border-t border-[#48c44810]" >Chat link</p>
}

export default ChatLink