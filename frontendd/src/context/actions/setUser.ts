import { Dispatch } from "react";
import actionTypes from ".";
import { User } from "../../Types";

export const setUser = (dispatch:Dispatch<any>, user:User) => {
    dispatch({
        type: actionTypes.SET_USER,
        payload: {
            ...user,
            isLogged: true
        }
    });
}