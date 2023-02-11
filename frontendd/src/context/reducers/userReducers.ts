import actionTypes from "../actions";
import { State } from "../../Types";

export const userReducer = (
  state: State,
  action: { type: string; payload: any }
): State => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: {
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
          friends: action.payload,
        },
      };
    case actionTypes.TOGGLE_ONLINE:
      return {
        ...state,
        user: {
          ...state.user,
          friends: state.user.friends.map((friend) =>
            friend.username === action.payload.username
              ? { ...friend, isOnline: action.payload.value }
              : friend
          ),
        },
      };
    default:
      return state;
  }
};
