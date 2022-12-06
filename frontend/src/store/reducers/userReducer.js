import {
    ACTIVE_USERS_ERROR,
    ADD_SOCKETID,
    ADD_SOCKETID_ERROR,
    ADD_USERNAME,
    CLEAR_ACTIVE_USERS,
    CLEAR_GROUP_CALL_ROOMS,
    GROUP_CALL_ROOMS_ERROR,
    UPDATE_ACTIVE_USERS,
    UPDATE_GROUP_CALL_ROOMS,
} from "../constants/userConstant";

const initialState = {
    userInfo: {},
    userInfoError: null,
    activeUsers: [],
    activeUsersError: null,
    groupCallRooms: [],
    groupCallRoomsError: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERNAME:
            return {
                ...state,
                userInfo: action.payload,
                userInfoError: null
            };
        case ADD_SOCKETID:
            return {
                ...state,
                userInfo: action.payload,
                userInfoError: null
            };
        case ADD_SOCKETID_ERROR:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo, socketId: null
                },
                userInfoError: action.payload
            };
        default:
            return state;
    }
};

export const activeUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: action.payload,
                activeUsersError: null
            };
        case CLEAR_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: [],
                activeUsersError: null
            };
        case ACTIVE_USERS_ERROR:
            return {
                ...state,
                activeUsers: [],
                activeUsersError: action.payload
            };
        default:
            return state;
    }
};

export const groupCallRoomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_GROUP_CALL_ROOMS:
            return {
                ...state,
                groupCallRooms: action.payload,
                groupCallRoomsError: null
            };
        case CLEAR_GROUP_CALL_ROOMS:
            return {
                ...state,
                groupCallRooms: [],
                groupCallRoomsError: null
            };
        case GROUP_CALL_ROOMS_ERROR:
            return {
                ...state,
                groupCallRooms: [],
                groupCallRoomsError: action.payload
            };
        default:
            return state;
    }
};