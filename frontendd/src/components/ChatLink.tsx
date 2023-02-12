import {useEffect,useContext,MouseEventHandler} from "react";
import { FriendTypes } from "../Types";
import {setConversation} from "../context/actions/userActions";
import {Context} from "../context";
import {ContextTypes} from "../Types";

const ChatLink = ({friend}:{friend:FriendTypes}) =>{

    const context:ContextTypes = useContext(Context);
    const {dispatch} = context;

    useEffect(()=>{
        // socket.emit("open_chat",{from:"User1",to:"User2"});
        
        return ()=>{
            // socket.disconnect();
        }
    });
    const handleClick:MouseEventHandler<HTMLParagraphElement> = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>)=>{
        setConversation(dispatch,{friendName:friend.username,status:true});
    }


  return <p className={`p-3 border-b border-[#ccc3]
  ${friend.isOnline ? "relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-1 after:h-2 after:w-2 after:bg-secondary after:rounded-full" : ""}`}
  onClick = {handleClick}
  >
    {friend.username}
</p>
}

export const ChatLoading = () =>{
    return(
        <p className="p-3 border-b border-[#ccc3] animate-pulse" >
            <span className="text-transparent block w-24 h-4 rounded-sm bg-[#ccc3]"></span>
        </p>
    );
}
export default ChatLink