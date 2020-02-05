import {Task} from "../models/Task";
import uuid from "uuid";

export const addTask = (task: Task) => ({
    type: 'ADD_TASK',
    id: uuid.v4(),
    task
});

export const loadTasks = () => ({
    type: 'LOAD_TASKS'
});

export const updateTask = (updatedTask: Task) => ({
    type: 'UPDATE_TASK',
    updatedTask
});
