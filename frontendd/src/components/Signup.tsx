import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { FormEvent, useState, ChangeEvent } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import customFetch from "../customFunctions/customFetch";
import { FormParams, UserTypes } from "../Types";

interface FormTypes {
  username: string;
  password: string;
  repeatPassword: string;
}

let messageTimeout: any;

const SignUp = ({ setTab, setUser }: FormParams) => {
  const [formData, setFormData] = useState<FormTypes>({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [message, setMessage] = useState<string>("");
  const [passwordView, setPasswordView] = useState<{
    password: boolean;
    repeatPassword: boolean;
  }>({ password: false, repeatPassword: false });

  const handleFormData = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name.toString()]: e.target.value });
  };

  const handleErrorText = (message: string): void => {
    clearTimeout(messageTimeout);
    setMessage(message);
    messageTimeout = setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    if (
      !formData.username.length ||
      !formData.password.length ||
      !formData.repeatPassword.length
    ) {
      return handleErrorText("Password or username less than 4 characters");
    }
    if (formData.password !== formData.repeatPassword) {
      return handleErrorText("Passwords don't match");
    }

    try {
      const res = await customFetch("users/new", "POST", formData, "");

      if (res.success) {
        const user: UserTypes = res.data;
        setUser({ user, redirectPath: "/profile" });
      } else {
        throw new Error(res.error.message);
      }
    } catch (error: any) {
      handleErrorText(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <section className="relative -left-2 -top-0 mb-4 w-formHead flex items-center justify-between">
        <button
          type="button"
          className="flex items-center justify-center gap-x-1 hover:text-secondary"
          onClick={() => setTab(1)}
        >
          <AiOutlineArrowLeft />
          <span>Home</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-x-1 hover:text-secondary"
          onClick={() => setTab(3)}
        >
          <span>Login</span>
          <AiOutlineArrowRight />
        </button>
      </section>
      <h1 className="text">Register a new account</h1>
      <p className="text-red-400 text-sm h-8 py-2">
        {message.length ? message : null}
      </p>
      <div className="my-1">
        <input
          className="border-b border-secondary
              w-full h-12 bg-transparent outline-none"
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleFormData}
        />
      </div>
      <div className="my-1 relative cursor-pointer">
        <input
          className="border-b border-secondary
              w-full h-12 bg-transparent outline-none"
          type={`${passwordView.password ? "text" : "password"}`}
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleFormData}
        />
        <div
          onClick={() =>
            setPasswordView({
              ...passwordView,
              password: !passwordView.password,
            })
          }
          className="absolute top-1/2 -translate-y-1/2 right-2"
        >
          {passwordView.password ? <RiEyeOffLine /> : <RiEyeLine />}
        </div>
      </div>
      <div className="my-1 relative cursor-pointer">
        <input
          className="border-b border-secondary
              w-full h-12 bg-transparent outline-none"
          type={`${passwordView.repeatPassword ? "text" : "password"}`}
          placeholder="repeat password"
          value={formData.repeatPassword}
          onChange={handleFormData}
          name="repeatPassword"
        />
        <div
          onClick={() =>
            setPasswordView({
              ...passwordView,
              repeatPassword: !passwordView.repeatPassword,
            })
          }
          className="absolute top-1/2 -translate-y-1/2 right-2"
        >
          {passwordView.repeatPassword ? <RiEyeOffLine /> : <RiEyeLine />}
        </div>
      </div>
      <button
        type="submit"
        className="bg-secondary mt-6 py-3 px-5 rounded flex items-center justify-center gap-x-1"
      >
        <span>SignUp</span>
        <BiLogIn />
      </button>
    </form>
  );
};

export default SignUp;
