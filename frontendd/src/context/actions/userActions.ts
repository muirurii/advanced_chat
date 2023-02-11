import { Dispatch } from "react";
import actionTypes from ".";
import { Friend, User } from "../../Types";

export const setUser = (dispatch:Dispatch<any>, user:User):void => {
    dispatch({
        type: actionTypes.SET_USER,
        payload: user
    });
}

export const setFriends = (dispatch:Dispatch<any>, friends:Friend[]):void => {
    dispatch({
        type: actionTypes.SET_FRIENDS,
        payload: friends
    });
}
export const toggleOnline = (dispatch:Dispatch<any>, user:{username:string,value:boolean}):void => {
    dispatch({
        type: actionTypes.TOGGLE_ONLINE,
        payload: user
    });
}