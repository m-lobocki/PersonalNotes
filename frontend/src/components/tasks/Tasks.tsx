import React, {Component} from 'react';
import TaskList from "./TaskList";
import {connect} from "react-redux";
import {loadTasks} from "../../redux/actions";

interface TasksProps {
    loadData: () => void;
}

class Tasks extends Component<TasksProps, {}> {
    componentDidMount(): void {
        this.props.loadData();
    }

    render() {
        return (
            <>
                <TaskList parentId={undefined}/>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    loadData: () => dispatch(loadTasks())
});

export default connect(null, mapDispatchToProps)(Tasks);
