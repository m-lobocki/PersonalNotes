import {SessionActionsTypes, TOGGLE_NAVIGATION_BAR} from "./actions";

export interface SessionState {
    isAuthorized: boolean;
    isNavigationBarVisible: boolean;
}

const initialState: SessionState = {
    isAuthorized: false,
    isNavigationBarVisible: true
};

export default function sessionReducer(state = initialState, action: SessionActionsTypes): SessionState {
    switch (action.type) {
        case TOGGLE_NAVIGATION_BAR:
            return {...state, isNavigationBarVisible: action.isVisible};
        default:
            return state;
    }
}
