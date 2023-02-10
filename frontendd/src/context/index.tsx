import { useReducer, createContext , ReactNode} from "react";
import { userReducer } from "./reducers/userReducers";
import { Action, User } from "../Types";


const initialState : User = {
  user: {
    isLogged: false,
    _id: "",
    username: "",
    token: "",
    messages: [],
    profilePic: "",
  },
  menu: false,
};

export const Context:any = createContext({});

const combineReducers = (...reducers:[any]) => (state:User, action:Action) => {
    // console.log(reducers)
    for (let i = 0; i < reducers.length; i++) {
      state = reducers[i](state, action);
    }
    return state;
  };

export const Provider = ({ children }:{children: ReactNode}) => {
  const [state, dispatch] = useReducer(
    combineReducers(userReducer),
    initialState
  );
  const value = { state, dispatch };

  return <Context.Provider value={value}> {children} </Context.Provider>;
};
