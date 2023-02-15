import { Dispatch } from "react";
import actionTypes from ".";
import { FriendTypes, MessageTypes, UserTypes } from "../../Types";

export const setUser = (dispatch: Dispatch<any>, user: UserTypes): void => {
  dispatch({
    type: actionTypes.SET_USER,
    payload: user,
  });
};

export const setFriends = (
  dispatch: Dispatch<any>,
  friends: FriendTypes[]
): void => {
  dispatch({
    type: actionTypes.SET_FRIENDS,
    payload: friends,
  });
};
export const toggleOnline = (
  dispatch: Dispatch<any>,
  data: { username: string }[]
): void => {
  dispatch({
    type: actionTypes.TOGGLE_ONLINE,
    payload: data,
  });
};
export const setConversation = (
  dispatch: Dispatch<any>,
  data: { friendName: string; status: boolean }
): void => {
  dispatch({
    type: actionTypes.TOGGLE_CONVERSATION,
    payload: data,
  });
};
export const setMessages = (
  dispatch: Dispatch<any>,
  data: MessageTypes[]
): void => {
  dispatch({
    type: actionTypes.SET_MESSAGES,
    payload: data,
  });
};
export const setNewMessage = (
  dispatch: Dispatch<any>,
  data: MessageTypes
): void => {
  dispatch({
    type: actionTypes.SET_MESSAGE,
    payload: data,
  });
};
export const setTab = (dispatch: Dispatch<any>, value: string): void => {
  dispatch({
    type: actionTypes.SET_TAB,
    payload: value,
  });
};
