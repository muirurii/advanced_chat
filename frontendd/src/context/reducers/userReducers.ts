import actionTypes from "../actions"
import { Action, User } from "../../Types"

export const userReducer = (state:User, action:Action):User => {
    switch (action.type) {
        case actionTypes.SET_USER:
            {
                return {
                    ...state,
                    user: action.payload
                }
            }
        default:
            {
                return state;
            }
    }
}