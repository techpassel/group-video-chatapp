import { CallStates } from "../../enums"
import { SET_CHAT_MESSAGE, SET_CALL_STATE, SET_LOCAL_STREAM, SET_REMOTE_STREAM, SET_CALLING_DIALOG_VISIBLE, SET_SCREEN_SHARING_ACTIVE, RESET_CALL_DATA_STATE, SET_CALLER_USERNAME } from "../constants/callConstant";

const initialState = {
    localStream: null,
    remoteStream: null,
    callState: CallStates.CALL_UNAVAILABLE,
    message: {
        received: false,
        content: ''
    },
    callerUsername: '',
    callingDialogVisible: false,
    screenSharingActive: false,
    localCameraEnabled: true,
    localMicrophoneEnabled: true,
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
        case SET_CHAT_MESSAGE:
            return {
                ...state,
                message: action.message
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
        default: return state;
    }
}