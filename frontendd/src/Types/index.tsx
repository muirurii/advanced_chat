import { Dispatch } from "react";

export interface User {
    user:{ isLogged:boolean;
     _id:string;
     username:string,
     token:string;
     messages:[],
     profilePic:""
    },
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
    user:User,
    dispatch:Dispatch<any>;
}