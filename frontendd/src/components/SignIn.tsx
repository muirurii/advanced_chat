import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useState, ChangeEvent, FormEvent } from "react";
import customFetch from "../customFunctions/customFetch";
import { FormParams, UserTypes } from "../Types";

interface FormTypes {
  username: string;
  password: string;
}

let timeout: any;

const SignIn = ({ setTab, setUser }: FormParams) => {
  const [passwordView, setPasswordView] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [formData, setFormData] = useState<FormTypes>({
    username: "",
    password: "",
  });

  const handleMessage = (value: string): void => {
    setMessage(value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.username.length < 4 || formData.password.length < 4) {
      return handleMessage("Password or username less than 4 characters");
    }

    try {
      const res = await customFetch("users/signin", "POST", formData, "");
      if (res.success) {
        const user = res.data;
        setUser({ user, redirectPath: "/chats" });
      } else {
        throw new Error(res.error.message);
      }
    } catch (error: any) {
      handleMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="relative -left-2 -top-0 mb-4 w-formHead flex items-center justify-start">
        <button
          className="flex items-center justify-center gap-x-1 hover:text-secondary"
          type="button"
          onClick={() => setTab(2)}
        >
          <AiOutlineArrowLeft />
          <span>SignUp</span>
        </button>
      </section>
      <h1 className="r">Log in your account</h1>
      <p className="text-red-400 text-sm h-8 py-2">
        {message.length ? message : null}
      </p>
      <div className="my-1">
        <input
          className="border-b border-secondary
              w-full h-12 bg-transparent outline-none"
          name="username"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={handleFormData}
        />
      </div>
      <div className="my-1 relative cursor-pointer">
        <input
          className="border-b border-secondary
              w-full h-12 bg-transparent outline-none"
          name="password"
          type={`${passwordView ? "text" : "password"}`}
          placeholder="password"
          value={formData.password}
          onChange={handleFormData}
        />
        <div
          onClick={() => setPasswordView(!passwordView)}
          className="absolute top-1/2 -translate-y-1/2 right-2"
        >
          {passwordView ? <RiEyeOffLine /> : <RiEyeLine />}
        </div>
      </div>
      <button className="bg-secondary mt-6 py-3 px-5 rounded flex items-center justify-center gap-x-1">
        <span>SignIn</span>
        <BiLogInCircle />
      </button>
    </form>
  );
};

export default SignIn;
