import React from "react";
import {Task} from "../models/Task";
import {TaskListItem} from "./TaskListItem";
import "./TaskList.scss";

export interface TaskListProps {
    tasks: Task[];
    className?: string;
}

export class TaskList extends React.Component<TaskListProps, {}> {
    render() {
        if (this.props.tasks.length === 0) {
            return null;
        }
        return (
            <div className={"task-list " + this.props.className}>
                {this.props.tasks.map(task =>
                    <TaskListItem key={task.id} task={task}/>
                )}
            </div>
        );
    }
}
