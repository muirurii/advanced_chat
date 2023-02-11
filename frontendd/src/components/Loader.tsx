import { BiLoader } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="w-screen fixed left-0 top-0 bottom-0
    flex items-center justify-center z-50">
        <div className="animate-spin">
            <BiLoader height={"45px"} width={"45px"} fill="blue"/>
        </div>
    </div>
  )
}

export default Loader;