import { CallStates } from "../../enums"
import { ADD_CHAT_MESSAGE, SET_CALL_STATE, SET_LOCAL_STREAM, SET_REMOTE_STREAM, SET_CALLING_DIALOG_VISIBLE, SET_SCREEN_SHARING_ACTIVE, RESET_CALL_DATA_STATE, SET_CALLER_USERNAME, SET_CALL_REJECTED } from "../constants/callConstant";

const initialState = {
    localStream: null,
    remoteStream: null,
    callState: CallStates.CALL_UNAVAILABLE,
    messages: [],
    callerUsername: '',
    callingDialogVisible: false,
    screenSharingActive: false,
    localCameraEnabled: true,
    localMicrophoneEnabled: true,
    callRejected: {
        rejected: false,
        reason: ''
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
        case ADD_CHAT_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        case SET_CALLER_USERNAME:
            return {
                ...state,
                callerUsername: action.payload
            }
        case SET_CALLING_DIALOG_VISIBLE:
            return {
                ...state,
                callingDialogVisible: action.payload
            }
        case SET_SCREEN_SHARING_ACTIVE:
            return {
                ...state,
                screenSharingActive: action.payload
            };
        case RESET_CALL_DATA_STATE:
            return {
                ...state,
                remoteStream: null,
                screenSharingActive: false,
                callerUsername: '',
                localMicrophoneEnabled: true,
                localCameraEnabled: true,
                callingDialogVisible: false
            };
        case SET_CALL_REJECTED:
            return {
                ...state,
                callRejected: action.payload
            }
        default: return state;
    }
}