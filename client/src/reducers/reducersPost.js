import {
    DELETE_POST,
    GET_POST,
    SEND_POST,
} from "../actions";

const inicialState = {
    posts: [],
    status: {},
}

export default function reducerPost(state = inicialState, action) {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                posts: action.payload,
            };
        case SEND_POST:
            return {
                ...state,
                status: action.payload,
            };
        case DELETE_POST:
            return {
                ...state,
                status: action.payload,
            };
        default:
            return { ...state };
    }
}
