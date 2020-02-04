import {Task} from "../models/Task";
import uuid from "uuid";

export const addTask = (task: Task) => ({
    type: 'ADD_TASK',
    id: uuid.v4(),
    task
});
