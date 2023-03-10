import { useContext, useState, useEffect } from "react";
import FormLayout from "../components/FormLayout";
import SignIn from "../components/SignIn";
import SignUp from "../components/Signup";
import { RiSendPlaneFill } from "react-icons/ri";
import { ContextTypes, UserTypes } from "../Types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Context } from "../context";
import { setTab, setUser } from "../context/actions/userActions";

const Home = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const context: ContextTypes = useContext(Context);
  const { dispatch } = context;

  useEffect(() => {
    setTab(dispatch, "home");
  }, []);

  const navigator: NavigateFunction = useNavigate();

  const handleSetUser = ({
    user,
    redirectPath,
  }: {
    user: UserTypes;
    redirectPath: string;
  }): void => {
    setUser(dispatch, user);
    navigator(redirectPath);
  };

  const handleClick = (value: number) => {
    setActiveTab(value);
  };
  return (
    <section className="grid grid-cols-3 w-screen gradient relative h-screen overflow-hidden">
      <section
        className={`absolute top-0 bottom-0 left-0 right-0 px-2
    -translate-x-full ${
      activeTab === 1 ? "active" : null
    } transition-transform opacity-0 pointer-events-none rotate-[0deg] origin-top-left duration-500
    flex sm:items-center justify-center flex-col gap-y-10`}
      >
        <h1 className="text-5xl sm:text-6xl">
          Welcome to chatr<span className="text-secondary">oo</span>m
        </h1>
        <button
          onClick={() => handleClick(2)}
          className="bg-secondary py-2 sm:py-3 px-4 w-fit rounded text-white
        flex items-center justify-center gap-x-2 cta"
        >
          <span>Start Messaging</span>
          <RiSendPlaneFill />
        </button>
      </section>
      <section
        className={`absolute top-0 bottom-0 left-0 right-0 px-2
    ${activeTab === 3 ? "-translate-x-full" : "translate-x-full"}
    ${
      activeTab === 2 ? "active" : null
    } transition-transform opacity-0 pointer-events-none rotate-[0deg] origin-top-left duration-500
    flex items-center justify-center flex-col`}
      >
        <FormLayout>
          <SignUp setTab={handleClick} setUser={handleSetUser} />
        </FormLayout>
      </section>
      <section
        className={`absolute top-0 bottom-0 left-0 right-0 px-2
    translate-x-full ${
      activeTab === 3 ? "active" : null
    } transition-transform opacity-0 pointer-events-none rotate-[0deg] origin-top-left duration-500
    flex items-center justify-center flex-col`}
      >
        <FormLayout>
          <SignIn setTab={handleClick} setUser={handleSetUser} />
        </FormLayout>
      </section>
      <img
        className="fixed top-0 left-0 h-full w-full -z-[1] object-cover"
        src="https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="Alt"
      />
    </section>
  );
};

export default Home;
