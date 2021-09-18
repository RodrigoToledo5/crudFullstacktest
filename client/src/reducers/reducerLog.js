import {
    DES_LOG,
        LOG
    } from "../actions";

const initialState={
    token:"",
    firstName:"",
    lastName:"",
}
export default function reducerLog(state=initialState,action){
    switch(action.type){
        case LOG:
            return{
                ...state,
                token:action.payload.token,
                firstName:action.payload.firstName,
                lastName:action.payload.lastName,
            };
        case DES_LOG:
            return{
            token:"",
            firstName:"",
            lastName:"",
        }
        default:
             return state;
    }

}