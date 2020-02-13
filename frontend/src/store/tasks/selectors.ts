import {Task} from "../../models/Task";
import {AppState} from "../index";

export function getRelatedTasks(state: AppState, parentId?: string) {
    return state.tasks.all.filter((task: Task) => task.parentId === parentId);
}
