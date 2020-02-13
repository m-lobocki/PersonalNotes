import {combineReducers, createStore} from 'redux'
import tasksReducer from "./tasks/reducer";

const reducers = combineReducers({
    tasks: tasksReducer
});

export default createStore(reducers);
export type AppState = ReturnType<typeof reducers>;
