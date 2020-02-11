import {Task} from "../../models/Task";

const initialState: TasksState = {
    all: []
};

export interface TasksState {
    all: Task[];
}

//todo use normalizr
export default function tasksReducer(state = initialState, action: any): TasksState {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                all: [...state.all, {...action.task}]
            };
        case 'LOAD_TASKS':
            const tasksJson = localStorage.tasksJson || '[]';
            const tasks = JSON.parse(tasksJson);
            return {
                all: [...tasks]
            };
        case 'UPDATE_TASK':
            const updatedTasks = updateTask(action.updatedTask, [...state.all]);
            localStorage.tasksJson = JSON.stringify(updatedTasks);
            return {
                all: updatedTasks
            };
        default:
            return state;
    }
};

function updateTask(updatedTask: Task, tasks: Task[]): Task[] {
    const index: number = tasks.findIndex((task: Task) => task.id === updatedTask.id);
    tasks[index] = updatedTask;
    return [...tasks];
}
