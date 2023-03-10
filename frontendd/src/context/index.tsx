import { useReducer, createContext , ReactNode} from "react";
import { userReducer } from "./reducers/userReducers";
import { Action,StateTypes } from "../Types";


const initialState : StateTypes = {
  user: {
    isLogged: false,
    _id: "",
    username: "",
    token: "",
    messages:[],
    conversation:{
      status:false,
      friendName:"",
    },
    friends:[],
    profilePic: "",
  },
  unreadMessages:[],
  menu: {
    activeTab:""
  }
};

export const Context:any = createContext({});

const combineReducers = (...reducers:[any]) => (state:StateTypes, action:Action) => {
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
