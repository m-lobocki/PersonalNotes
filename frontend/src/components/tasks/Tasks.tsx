import React, {Component} from 'react';
import TaskList from "./TaskList";
import {connect} from "react-redux";
import {loadTasks} from "../../store/tasks/actions";

interface TasksProps {
    loadTasks: typeof loadTasks;
}

class Tasks extends Component<TasksProps, {}> {
    componentDidMount(): void {
        this.props.loadTasks();
    }

    render() {
        return (
            <>
                <TaskList/>
            </>
        );
    }
}

export default connect(null, {loadTasks})(Tasks);
