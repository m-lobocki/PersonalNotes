import React, {Component} from 'react';
import TaskList from "./TaskList";
import {connect} from "react-redux";
import {loadTasks} from "../../redux/actions/tasksActions";

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
                <TaskList parentId={undefined}/>
            </>
        );
    }
}

export default connect(null, {loadTasks})(Tasks);
