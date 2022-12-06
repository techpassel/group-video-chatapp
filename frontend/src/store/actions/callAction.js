import {
    CALL_SET_CHAT_MESSAGE,
    SET_CALL_STATE,
    SET_LOCAL_STREAM,
    SET_REMOTE_STREAM
} from "../constants/callConstant"

export const setLocalStream = (localStream) => (dispatch) => {
    dispatch({ type: SET_LOCAL_STREAM, payload: localStream })
}

export const setCallState = (callState) => (dispatch) => {
    dispatch({ type: SET_CALL_STATE, payload: callState })
}

export const setRemoteStream = (remoteStream) => (dispatch) => {
    dispatch({ type: SET_REMOTE_STREAM, payload: remoteStream })
}

export const setMessage = (messageReceived, messageContent) => (dispatch) => {
    dispatch({
        type: CALL_SET_CHAT_MESSAGE,
        message: {
            received: messageReceived,
            content: messageContent
        }
    })
}