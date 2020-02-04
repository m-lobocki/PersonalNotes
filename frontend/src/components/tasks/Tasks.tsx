import React, {Component} from 'react';
import {Task} from "../../models/Task";
import {TaskList} from "./TaskList";
import {connect} from "react-redux";
import {addTask} from "../../redux/actions";

interface TasksProps {
    tasks: Task[];
    loadData(): any;
}

//todo get rid of local storage
class Tasks extends Component<TasksProps, {}> {
    constructor(props: any) {
        super(props);
        // () => {
        //     const tasksJson = localStorage.tasksJson || '[]';
        //     const tasks = JSON.parse(tasksJson);
        // }
    }

    componentDidMount(): void {
        this.props.loadData();
    }

    // componentDidUpdate(prevProps: Readonly<TasksProps>, prevState: Readonly<TasksState>): void {
    //     this.autoSave(prevState.rootTasks);
    // }
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
        // this.setState(state => ({
        //     tasks: this.updateTask(changedTask, state.rootTasks)
        // }));
    };

    render() {
        return (
            <>
                <TaskList tasks={this.props.tasks} onTaskChange={this.handleTaskChange}/>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    console.log(state);
    return ({
        tasks: state.tasks
    });
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadData: () => dispatch(addTask({id: 'dddd', isDone: false, relatedTasks: [], description: 'TESTING REDUX'}))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
