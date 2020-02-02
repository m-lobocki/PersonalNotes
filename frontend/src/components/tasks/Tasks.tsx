import React, {Component} from 'react';
import {Task} from "../../models/Task";
import {TaskList} from "./TaskList";

interface TasksState {
    rootTasks: Task[];
}

//todo get rid of local storage
export default class Tasks extends Component<{}, TasksState> {
    constructor(props: {}) {
        super(props);
        const tasksJson = localStorage.tasksJson || '[]';
        this.state = {rootTasks: JSON.parse(tasksJson)};
    }


    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<TasksState>): void {
        this.autoSave(prevState.rootTasks);
    }

    autoSave(tasks: Task[]): void {
        localStorage.tasksJson = JSON.stringify(tasks)
    }

    updateTask(changedTask: Task, tasks: Task[]): Task[] {
        const index: number = tasks.findIndex(task => task.id === changedTask.id);
        if (index === -1) {
            tasks.map(task => this.updateTask(changedTask, task.relatedTasks));
        } else {
            tasks[index] = {...changedTask};
        }
        return tasks;
    }

    handleTaskChange = (changedTask: Task) => {
        this.setState(state => ({
            rootTasks: this.updateTask(changedTask, state.rootTasks)
        }));
    };

    render() {
        return (
            <>
                <TaskList tasks={this.state.rootTasks} onTaskChange={this.handleTaskChange}/>
            </>
        );
    }
}
