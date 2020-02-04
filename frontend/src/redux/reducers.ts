import {combineReducers} from 'redux'

export const tasks = (state = [], action: any) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    ...action.task,
                    id: action.id
                }
            ];
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    tasks
});
