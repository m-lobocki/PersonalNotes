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
                    id: "t1", isDone: false, description: "great task", relatedTasks: [
                        {
                            id: 't11', isDone: true, description: "task related", relatedTasks: [
                                {id: 't111', isDone: true, description: 'even more related', relatedTasks: []}
                            ]
                        },
                        {id: 't12', isDone: false, description: "task related 2", relatedTasks: []},
                    ]
                },
                {id: "t2", isDone: true, description: "awsom task", relatedTasks: []},
                {id: "t3", isDone: false, description: "super task", relatedTasks: []},
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
