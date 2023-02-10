import {Link} from "react-router-dom";

const Header = () =>{
    return(
        <header className="fixed text-white top-0 left-0 w-screen h-[70px] bg-transparent backdrop-blur-sm
        flex justify-between items-center z-50">
        <nav>
          <ul className="w-screen flex justify-center items-center gap-4 sm:gap-6 px-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/chats">Chats</Link></li>
            <li><Link to="/profile">Profile</Link></li>                
          </ul>
        </nav>
        <p className="hidden">
          Illustration by <a href="https://icons8.com/illustrations/author/kP9rc8JiBCcz">Irene M. Ray</a> from <a href="https://icons8.com/illustrations">Ouch!</a>

        </p>
      </header>
    );
}

export default Header;