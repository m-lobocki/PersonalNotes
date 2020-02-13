import {Task} from "../../models/Task";
import {ADD_TASK, LOAD_TASKS, UPDATE_TASK, TasksActionsTypes} from "./actions";

export interface TasksState {
    all: Task[];
}

//todo use normalizr
export default function tasksReducer(state = initialState, action: TasksActionsTypes): TasksState {
    switch (action.type) {
        case ADD_TASK:
            return {
                all: [...state.all, {...action.task}]
            };
        case LOAD_TASKS:
            const tasksJson = localStorage.tasksJson || '[]';
            const tasks = JSON.parse(tasksJson);
            return {
                all: [...tasks]
            };
        case UPDATE_TASK:
            const updatedTasks = updateTask(action.updatedTask, [...state.all]);
            localStorage.tasksJson = JSON.stringify(updatedTasks);
            return {
                all: updatedTasks
            };
        default:
            return state;
    }
};

const initialState: TasksState = {
    all: []
};

function updateTask(updatedTask: Task, tasks: Task[]): Task[] {
    const index: number = tasks.findIndex((task: Task) => task.id === updatedTask.id);
    tasks[index] = updatedTask;
    return [...tasks];
}
