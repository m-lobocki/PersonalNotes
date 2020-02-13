import React from "react";
import {Task} from "../../models/Task";
import TaskListItem from "./TaskListItem";
import "./TaskList.scss";
import {c} from "../../helpers/class-name";
import {connect} from "react-redux";
import {AppState} from "../../redux/store";
import {getRelatedTasks} from "../../redux/selectors/tasksSelectors";

export interface TaskListProps {
    tasks?: Task[];
    parentId?: string;
    className?: string;
}

export class TaskList extends React.Component<TaskListProps, {}> {
    render() {
        if (this.props.tasks?.length === 0) {
            return null;
        }
        return (
            <div className={c`task-list ${this.props.className}`}>
                {this.props.tasks?.map(task =>
                    <TaskListItem key={task.id} task={task}/>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProperties: TaskListProps) => ({
    tasks: getRelatedTasks(state, ownProperties.parentId)
});

export default connect(mapStateToProps)(TaskList);
