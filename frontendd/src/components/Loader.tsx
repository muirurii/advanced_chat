import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="w-screen fixed left-0 top-0 bottom-0
    flex items-center justify-center z-50 gradient">
        <div className="animate-spin">
            <AiOutlineLoading3Quarters className="fill-secondary h-10 w-10"/>
        </div>
    </div>
  )
}

export default Loader;