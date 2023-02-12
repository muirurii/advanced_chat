import { Dispatch } from "react";

export interface MessageTypes {
    _id:string;
    from:string;
    to:string;
    body:string;
    createdAt:string;
}

export interface FriendTypes {
    username:string;
    _id:string;
    isOnline: boolean;
}

export interface UserTypes {
     isLogged:boolean;
    _id:string;
    username:string,
    token:string;
    messages:MessageTypes[];
    conversation:{
        status:boolean;
        friendName:string;
    }
    friends:FriendTypes[];
    profilePic:"";
}

export interface StateTypes {
    user:UserTypes,
    menu: boolean,
}

export interface Action {
    type:string,
    payload:any,
}

export interface FormParams {
    setTab: (value:number)=> void;
    setUser: ({user}:{user: UserTypes})=> void;
}

export interface ContextTypes {
    state:StateTypes;
    dispatch:Dispatch<any>;
}