import { Dispatch } from "react";

interface Message {
    from:string;
    to:string;
    body:string;
    createdAt:string;
}

export interface Friend {
    username:string;
    _id:string;
    isOnline: boolean;
}

export interface User {
     isLogged:boolean;
    _id:string;
    username:string,
    token:string;
    messages:Message[];
    conversation:{
        status:boolean;
        friendName:string;
    }
    friends:Friend[];
    profilePic:"";
}

export interface State {
    user:User,
    menu: boolean,
}

export interface Action {
    type:string,
    payload:any,
}

export interface FormParams {
    setTab: (value:number)=> void;
    setUser: ({user}:{user: User})=> void;
}

export interface ContextTypes {
    state:State;
    dispatch:Dispatch<any>;
}