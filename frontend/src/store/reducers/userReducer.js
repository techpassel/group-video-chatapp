import {
    ADD_SOCKETID,
    ADD_USERNAME,
    CLEAR_ACTIVE_USERS,
    CLEAR_GROUP_CALL_ROOMS,
    UPDATE_ACTIVE_USERS,
    UPDATE_GROUP_CALL_ROOMS,
} from "../constants/userConstant";

const initialState = {
    userInfo: {},
    activeUsers: [],
    groupCallRooms: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERNAME:
            return {
                ...state,
                userInfo: action.payload
            };
        case ADD_SOCKETID:
            return {
                ...state,
                userInfo: action.payload
            };
        case UPDATE_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: action.payload
            };
        case CLEAR_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: []
            };
        case UPDATE_GROUP_CALL_ROOMS:
            return {
                ...state,
                groupCallRooms: action.payload
            };
        case CLEAR_GROUP_CALL_ROOMS:
            return {
                ...state,
                groupCallRooms: []
            };
        default:
            return state;
    }
};
