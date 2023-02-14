import { RiUserAddLine } from "react-icons/ri";
import { FriendTypes } from "../Types";

const Friend = ({user,addFriend}:{user:FriendTypes,addFriend:(friendName:string)=>Promise<void>}) => {
  return (
    <section className="w-full border-b border-[#ccc3] gap-x-2 p-2 flex justify-between">
      <section className="flex items-center justify-start w-full gap-x-2">
        <img
          className="w-10 h-10 rounded-full"
          src="/images/pexels-photo-188035.jpeg"
          alt="Profile"
        />
        <p className="text-sm py-2">{user.username}</p>
      </section>
      <div className="px-2">
        <button
          className="bg-secondary flex items-center justify-center gap-x-1
      rounded-full py-2 px-4 text-sm"
      onClick={(e)=>{
        addFriend(user.username);
      }}
        >
          Add <RiUserAddLine />
        </button>
      </div>
    </section>
  );
};

export default Friend;
