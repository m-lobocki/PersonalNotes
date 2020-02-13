import uuid from "uuid";
import {Task} from "../../models/Task";
import {Action, ActionCreator} from 'redux';

export const ADD_TASK = 'ADD_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';

interface AddTaskAction extends Action<typeof ADD_TASK> {
    id: string;
    task: Task;
}

export const addTask: ActionCreator<AddTaskAction> = (task: Task) => ({
    type: ADD_TASK,
    id: uuid.v4(),
    task
});

interface LoadTasksAction extends Action<typeof LOAD_TASKS> {
}

export const loadTasks: ActionCreator<LoadTasksAction> = () => ({
    type: LOAD_TASKS
});

interface UpdateTaskAction extends Action<typeof UPDATE_TASK> {
    updatedTask: Task
}

export const updateTask: ActionCreator<UpdateTaskAction> = (updatedTask: Task) => ({
    type: UPDATE_TASK,
    updatedTask
});

export type TasksActionsTypes = AddTaskAction | LoadTasksAction | UpdateTaskAction;
