import {Task} from "../../models/Task";
import {Action} from 'redux';

export const ADD_TASK = 'ADD_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';

interface AddTaskAction extends Action<typeof ADD_TASK> {
    task: Task;
}

export function addTask(task: Task) {
    return {type: ADD_TASK, task};
}

interface LoadTasksAction extends Action<typeof LOAD_TASKS> {
}

export function loadTasks() {
    return {type: LOAD_TASKS};
}

interface UpdateTaskAction extends Action<typeof UPDATE_TASK> {
    updatedTask: Task
}

export function updateTask(updatedTask: Task) {
    return {type: UPDATE_TASK, updatedTask};
}

export type TasksActionsTypes = AddTaskAction | LoadTasksAction | UpdateTaskAction;
