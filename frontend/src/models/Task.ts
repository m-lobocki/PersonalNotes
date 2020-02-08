export interface Task {
    id?: string,
    isDone: boolean,
    description: string,
    parentId?: string
}
