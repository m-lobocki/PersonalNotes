export interface Task {
    id: string,
    isDone: boolean,
    description: string,
    relatedTasks: Task[]
}
