import { ReactNode, useEffect, useState, useContext } from "react";
import customFetch from "../customFunctions/customFetch";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ContextTypes } from "../Types";
import { Context } from "../context";
import { setUser } from "../context/actions/userActions";

const Layout = ({ children }: { children: ReactNode }) => {
  const context: ContextTypes = useContext(Context);

  const { dispatch } = context;

  const [loading, setLoading] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await customFetch("users/refresh", "GET", {}, "");
        setLoading(false);
        if (res.success) {
          setUser(dispatch, res.data);
          navigate("/chats");
        } else {
          throw new Error(res.error.message);
        }
      } catch (error: any) {
        setLoading(false);
        navigate("/");
      }
    };
    getUser();
  }, []);

  return (
    <main className="relative text-white overflow-x-hidden">
      {loading ? <Loader /> : <section className="over">{children}</section>}
    </main>
  );
};

export default Layout;
