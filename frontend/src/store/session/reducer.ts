import {SessionActionsTypes} from "./actions";

export interface SessionState {
    isAuthorized: boolean
}

const initialState: SessionState = {
    isAuthorized: false
};

export default function sessionReducer(state = initialState, action: SessionActionsTypes): SessionState {
    return {isAuthorized: false}; //todo
}
