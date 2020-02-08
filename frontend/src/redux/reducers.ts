import {combineReducers} from 'redux'
import {Task} from "../models/Task";

//todo use normalizr
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
        case 'LOAD_TASKS':
            const tasksJson = localStorage.tasksJson || '[]';
            const tasks = JSON.parse(tasksJson);
            return [...tasks];
        case 'UPDATE_TASK':
            const updatedTasks = updateTask(action.updatedTask, [...state]);
            localStorage.tasksJson = JSON.stringify(updatedTasks);
            return updatedTasks;
        default:
            return state;
    }
};

function updateTask(updatedTask: Task, tasks: Task[]): Task[] {
    const index: number = tasks.findIndex((task: Task) => task.id === updatedTask.id);
    tasks[index] = updatedTask;
    return [...tasks];
}

export const rootReducer = combineReducers({
    tasks
});
