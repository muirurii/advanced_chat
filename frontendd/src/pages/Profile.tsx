import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";
import { ChatLoading } from "../components/ChatLink";
import Friend from "../components/Friend";
import { Context } from "../context";
import { setTab } from "../context/actions/userActions";
import customFetch from "../customFunctions/customFetch";
import { ContextTypes, FriendTypes } from "../Types";

const Profile = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { isLogged, token },
    },
    dispatch,
  } = context;

  const navigate: NavigateFunction = useNavigate();

  const [users, setUsers] = useState<FriendTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLogged) {
      return navigate("/");
    }

    setTab(dispatch, "profile");
    setLoading(true);

    const getFriends = async () => {
      try {
        const res = await customFetch("users/all", "GET", {}, token);

        if (res.success) {
          setUsers(res.data.users);
          setLoading(false);
        } else {
          throw new Error(res.error.message);
        }
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
      }
    };

    getFriends();
  }, []);

  const addFriend = async (friendName: string) => {
    try {
      const res = await customFetch(
        "users/friends/add",
        "POST",
        { friendName },
        token
      );

      if (res.success) {
        setUsers(users.filter((user) => user.username !== friendName));
      } else {
        throw new Error(res.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen min-w-screen gradient pt-[100px] flex flex-col items-center px-2">
      <section className="max-w-[600px] w-full border border-secondary rounded h-[450px]">
        <h1 className="bg-secondary w-full py-2 text-center">Add Friends</h1>
        {loading ? (
          <>
            <ChatLoading /> <ChatLoading /> <ChatLoading /> <ChatLoading />{" "}
            <ChatLoading /> <ChatLoading />
            <ChatLoading /> <ChatLoading /> <ChatLoading />
          </>
        ) : users.length ? (
          users.map((user) => (
            <Friend addFriend={addFriend} user={user} key={user._id} />
          ))
        ) : (
          <p className="text-center text-sm p-2">No new users found</p>
        )}
      </section>
    </section>
  );
};

export default Profile;
