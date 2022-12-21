import {
    ADD_CHAT_MESSAGE,
    SET_CALL_STATE,
    SET_LOCAL_STREAM,
    SET_REMOTE_STREAM,
    SET_CALLER_USERNAME,
    SET_CALLING_DIALOG_VISIBLE,
    SET_SCREEN_SHARING_ACTIVE,
    RESET_CALL_DATA_STATE,
    SET_CALL_REJECTED,
    CLEAR_CHAT_MESSAGES
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

export const addMessage = (messageReceived, messageContent) => (dispatch) => {
    dispatch({
        type: ADD_CHAT_MESSAGE,
        payload: {
            received: messageReceived,
            content: messageContent
        }
    })
}

export const clearMessages = () => (dispatch) => {
    dispatch({
        type: CLEAR_CHAT_MESSAGES
    })
}

export const setCallerUsername = (callerUsername) => (dispatch) => {
    dispatch({
        type: SET_CALLER_USERNAME,
        payload: callerUsername
    })
}

export const setCallingDialogVisible = (callingDialogVisible) => (dispatch) => {
    dispatch({
        type: SET_CALLING_DIALOG_VISIBLE,
        payload: callingDialogVisible
    })
}

export const setScreenSharingActive = (setActive) => (dispatch) => {
    dispatch({
        type: SET_SCREEN_SHARING_ACTIVE,
        payload: setActive
    })
}

export const resetCallDataState = () => (dispatch) => {
    dispatch({ type: RESET_CALL_DATA_STATE })
}

export const setCallRejected = (data) => (dispatch) => {
    dispatch({
        type: SET_CALL_REJECTED,
        payload: data
    })
}