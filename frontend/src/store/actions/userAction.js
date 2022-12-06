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
    const { user: { userInfo } } = getState();
    dispatch({ type: ADD_SOCKETID, payload: { ...userInfo, socketId } });
};

export const updateActiveUsers = (activeUsers) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_ACTIVE_USERS, payload: activeUsers });
}

export const clearActiveUsers = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_ACTIVE_USERS });
}

export const updateGroupCallRooms = (groupCallRooms) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_GROUP_CALL_ROOMS, payload: groupCallRooms });
}

export const clearGroupCallRooms = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_GROUP_CALL_ROOMS });
}