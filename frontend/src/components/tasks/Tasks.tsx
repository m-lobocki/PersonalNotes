import React, {Component} from 'react';
import {Task} from "../../models/Task";
import TaskList from "./TaskList";
import {connect} from "react-redux";
import {loadTasks, updateTask} from "../../redux/actions";

interface TasksProps {
    loadData: () => void;
    updateTask: (task: Task) => void;
}

class Tasks extends Component<TasksProps, {}> {
    componentDidMount(): void {
        this.props.loadData();
    }

    render() {
        return (
            <>
                <TaskList parentId={null} onTaskChange={this.props.updateTask}/>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadData: () => dispatch(loadTasks()),
        updateTask: (task: Task) => dispatch(updateTask(task))
    }
};

export default connect(null, mapDispatchToProps)(Tasks);
