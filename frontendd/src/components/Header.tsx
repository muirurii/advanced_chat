import { RiChat1Line, RiContactsLine, RiHomeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { ContextTypes } from "../Types";
import { useContext } from "react";

const Header = () => {
  const context: ContextTypes = useContext(Context);
  const {
    state: {
      user: { isLogged },
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
          <li
            className={`w-fit h-fit relative`}
          >
            <Link to="/">
              <RiHomeLine className={`${activeTab === "home" ? "fill-secondary" : null}`} />
            </Link>
          </li>
          <li
            className={`w-fit h-fit relative`}
          >
            <Link to="/chats">
              <RiChat1Line className={`${activeTab === "chats" ? "fill-secondary" : null}`} />
            </Link>
          </li>
          <li
            className={`w-fit h-fit relative`}
          >
            <Link to="/profile">
              <RiContactsLine className={`${activeTab === "profile" ? "fill-secondary" : null}`} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  ) : null;
};

export default Header;
