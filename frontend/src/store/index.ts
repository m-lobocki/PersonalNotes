import {combineReducers, createStore} from 'redux'
import tasksReducer from "./tasks/reducer";
import sessionReducer from "./session/reducer";

const reducers = combineReducers({
    tasks: tasksReducer,
    session: sessionReducer
});

export default createStore(reducers);
export type AppState = ReturnType<typeof reducers>;
