import { useContext, MouseEventHandler } from "react";
import { FriendTypes } from "../Types";
import { setConversation } from "../context/actions/userActions";
import { Context } from "../context";
import { ContextTypes } from "../Types";

const ChatLink = ({ friend }: { friend: FriendTypes }) => {
  const context: ContextTypes = useContext(Context);
  const {
    dispatch,
    state: {
      user: { conversation },
      unreadMessages
    },
  } = context;

  const newFromFriend = unreadMessages.filter(message => message.from === friend.username);

  const handleClick: MouseEventHandler<HTMLElement> = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setConversation(dispatch, { friendName: friend.username, status: true });
  };

  return (
    <section
      className={`p-2 border-b border-[#ccc3] flex items-center justify-start gap-x-2
      transition-colors duration-300 cursor-pointer
    ${conversation.friendName === friend.username ? "card" : null}
      ${
        friend.isOnline
          ? "relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-1 after:h-2 after:w-2 after:bg-secondary after:rounded-full"
          : null
      }`}
      onClick={handleClick}
    >
      <img
        className={`w-10 h-10 rounded-full object-cover`}
        src="/images/pexels-photo-188035.jpeg"
        alt="User"
      />
      <p className="text-sm">{friend.username}</p>
     {
     newFromFriend.length ? <span className="bg-secondary text-[8px] h-4 w-4
      flex items-center justify-center rounded-full">
        {newFromFriend.length}
      </span> : null
      }
    </section>
  );
};

export const ChatLoading = () => {
  return (
    <p className="p-3 border-b border-[#ccc5] animate-pulse">
      <span className="text-transparent block w-24 h-4 rounded-sm bg-[#ccc5]"></span>
    </p>
  );
};
export default ChatLink;
