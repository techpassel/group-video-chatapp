import {
    ACTIVE_USERS_ERROR,
    ADD_SOCKETID,
    ADD_SOCKETID_ERROR,
    ADD_USERNAME,
    CLEAR_ACTIVE_USERS,
    CLEAR_GROUP_CALL_ROOMS,
    GROUP_CALL_ROOMS_ERROR,
    UPDATE_ACTIVE_USERS,
    UPDATE_GROUP_CALL_ROOMS
} from "../constants/userConstant";

export const addUsername = (username) => async (dispatch, getState) => {
    const { user: { userInfo } } = getState();
    dispatch({ type: ADD_USERNAME, payload: { ...userInfo, username } });
};

export const addSocketId = (socketId) => async (dispatch, getState) => {
    try {
        const { user: { userInfo } } = getState();
        dispatch({ type: ADD_SOCKETID, payload: { ...userInfo, socketId } });
    } catch (error) {
        dispatch({ type: ADD_SOCKETID_ERROR, payload: { error } });
    }
};

export const updateActiveUsers = (activeUsers) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_ACTIVE_USERS, payload: activeUsers });
    } catch (error) {
        dispatch({ type: ACTIVE_USERS_ERROR, payload: error });
    }
}

export const clearActiveUsers = (activeUsers) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLEAR_ACTIVE_USERS });
    } catch (error) {
        dispatch({ type: ACTIVE_USERS_ERROR, payload: error });
    }
}

export const updateGroupCallRooms = (groupCallRooms) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_GROUP_CALL_ROOMS, payload: groupCallRooms });
    } catch (error) {
        dispatch({ type: GROUP_CALL_ROOMS_ERROR, payload: error });
    }
}

export const clearGroupCallRooms = (groupCallRooms) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLEAR_GROUP_CALL_ROOMS });
    } catch (error) {
        dispatch({ type: GROUP_CALL_ROOMS_ERROR, payload: error });
    }
}