import { CallStates } from "../../enums"
import { CALL_SET_CHAT_MESSAGE, SET_CALL_STATE, SET_LOCAL_STREAM, SET_REMOTE_STREAM } from "../constants/callConstant";

const initialState = {
    localStream: null,
    remoteStream: null,
    callState: CallStates.CALL_UNAVAILABLE,
    message: {
        received: false,
        content: ''
    }
}

export const callReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.payload
            }
        case SET_CALL_STATE:
            return {
                ...state,
                callState: action.payload
            }
        case SET_REMOTE_STREAM:
            return {
                ...state,
                remoteStream: action.payload
            }
        case CALL_SET_CHAT_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default: return state;
    }
}