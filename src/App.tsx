import React from 'react';
import './App.scss';
import {TaskList} from "./components/TaskList";
import {Task} from "./models/Task";

export interface AppState {
    rootTasks: Task[];
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        const tasksJson = localStorage.getItem('tasks') || '[]';
        this.state = {rootTasks: JSON.parse(tasksJson)};
        this.state = {
            rootTasks: [
                {
                    id: "t1", title: "task1", description: "great task", relatedTasks: [
                        {
                            id: 't11', title: "task11", description: "task related", relatedTasks: [
                                {id: 't111', title: 'task111', description: 'even more related', relatedTasks: []}
                            ]
                        },
                        {id: 't12', title: "task12", description: "task related 2", relatedTasks: []},
                    ]
                },
                {id: "t2", title: "task2", description: "awsom task", relatedTasks: []},
                {id: "t3", title: "task3", description: "super task", relatedTasks: []},
            ]
        };
    }

    render() {
        return (
            <div className="app">
                <TaskList tasks={this.state.rootTasks}/>
            </div>
        );
    }
}
