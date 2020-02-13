import {AppState} from "../store";
import {Task} from "../../models/Task";

export function getRelatedTasks(state: AppState, parentId?: string) {
    return state.tasks.all.filter((task: Task) => task.parentId === parentId);
}
