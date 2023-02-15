import actionTypes from "../actions";
import { FriendTypes, StateTypes } from "../../Types";

export const userReducer = (
  state: StateTypes,
  action: { type: string; payload: any }
): StateTypes => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
          conversation: {
            status: false,
            friendName: "",
          },
          isLogged: true,
        },
      };
    case actionTypes.SET_FRIENDS:
      return {
        ...state,
        user: {
          ...state.user,
          friends: action.payload.map((friend: FriendTypes) => ({
            ...friend,
            isOnline: false,
          })),
        },
      };
    case actionTypes.TOGGLE_ONLINE:
      return {
        ...state,
        user: {
          ...state.user,
          friends: state.user.friends.map((friend) => {
            return action.payload.some(
              (user: { username: string }) => user.username === friend.username
            )
              ? {
                  ...friend,
                  isOnline: true,
                }
              : {
                  ...friend,
                  isOnline: false,
                };
          }),
        },
      };
    case actionTypes.TOGGLE_CONVERSATION:
      return {
        ...state,
        user: {
          ...state.user,
          conversation: action.payload,
        },
      };
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        user: {
          ...state.user,
          messages: [...action.payload],
        },
      };
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        user: {
          ...state.user,
          messages: [
            ...state.user.messages.filter(
              (mess) => mess._id !== action.payload._id
            ),
            action.payload,
          ],
        },
      };
    case actionTypes.SET_TAB:
      return {
        ...state,
        menu: {
          activeTab: action.payload,
        },
      };
    default:
      return state;
  }
};
