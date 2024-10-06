import {
    GET_HOMEPAGE_CONTENT,
    GET_USER_PROFILE,
} from "../actions/types";

const initialState = {};

export default function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_HOMEPAGE_CONTENT:
            return {
                ...state,
                homePageContent: payload.data
            }
        case GET_USER_PROFILE:
            return {
                ...state,
                userProfile: payload.data
            }
        default:
            return state;

    }
}