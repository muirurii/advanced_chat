import { RiChat1Line, RiContactsLine, RiHomeLine, RiProfileFill, RiUserHeartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { ContextTypes } from "../Types";
import { useContext } from "react";
import { AiOutlineProfile } from "react-icons/ai";

const Header = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { isLogged,username },
      menu: { activeTab },
    },
  } = context;

  return isLogged ? (
    <header
      className="fixed text-white top-0 left-0 w-screen h-[70px] bg-transparent backdrop-blur-sm
        flex justify-between items-center z-50"
    >
      <nav>
        <ul className="w-screen flex justify-center items-center gap-4 sm:gap-6 px-4">
          <li className={`w-fit h-fit relative`}>
            <Link to="/">
              <RiHomeLine
                className={`${activeTab === "home" ? "fill-secondary" : null}`}
              />
            </Link>
          </li>
          <li className={`w-fit h-fit relative`}>
            <Link to="/chats">
              <RiChat1Line
                className={`${activeTab === "chats" ? "fill-secondary" : null}`}
              />
            </Link>
          </li>
          <li className={`w-fit h-fit relative`}>
            <Link to="/profile">
              <RiContactsLine
                className={`${
                  activeTab === "profile" ? "fill-secondary" : null
                }`}
              />
            </Link>
          </li>
        </ul>
      </nav>
      <section className="fixed top-[50px] left-4 h-fit w-fit px-4 p-2 rounded bg-white
      flex items-center justify-center gap-x-2">
        <div className="absolute top-0 left-0 p-1 -translate-y-1/2 -translate-x-1/2
        bg-white rounded-full shadow-[#ccc8] shadow-md border border-[#ccc3]">
        <RiUserHeartLine className="fill-secondary" />
        </div>
        <p className="text-xs text-secondary">{username}</p>
      </section>
    </header>
  ) : null;
};

export default Header;
