import actionTypes from "../actions"
import { State,User } from "../../Types"


export const userReducer = (state:State, action:{type:string,payload:User}):State => {
    switch (action.type) {
        case actionTypes.SET_USER:
            console.log(action.payload)
            {
                return {
                    ...state,
                    user:{
                        ...action.payload,
                        isLogged:true
                    }
                }
            }
        default:
            {
                return state;
            }
    }
}