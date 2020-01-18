import React from 'react';
import './App.scss';
import {TaskList} from "./components/TaskList";
import {Task} from "./models/Task";

interface AppState {
    rootTasks: Task[];
}

export interface AppLocalStorage extends Storage {
    tasksJson?: string;
}

declare var localStorage: AppLocalStorage;

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        const tasksJson = localStorage.tasksJson || '[]';
        this.state = {rootTasks: JSON.parse(tasksJson)};
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>): void {
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
            <div className="app">
                <TaskList tasks={this.state.rootTasks} onTaskChange={this.handleTaskChange}/>
            </div>
        );
    }
}
