import { ReactNode,useEffect,useState } from "react";
import customFetch from "../customFunctions/customFetch";
import { useNavigate } from "react-router-dom";

const Layout = ({children}:{children:ReactNode}) => {

    const[loading,setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const setUser = async ()=>{ 
            try {
                const res = await customFetch("users/refresh","GET",{},"");
                if(res.success){
                    navigate("/chats");
                }else{
                    throw new Error(res.error.message);
                }
                
            } catch (error:any) {
                navigate("/");
                // console.log(error.message)
            }
        }
        setUser();
    },[]);

  return (
    <main className="text-white bg-whie">{children}</main>
  )
}

export default Layout;