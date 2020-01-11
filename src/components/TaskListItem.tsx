import React from "react";
import {Task} from "../models/Task";
import {TaskList} from "./TaskList";

export interface TaskListItemProps {
    task: Task;
    className?: string;
}

export class TaskListItem extends React.Component<TaskListItemProps, {}> {
    render() {
        let itemInfoClass = "item__info";
        if (this.props.task.relatedTasks.length > 0) {
            itemInfoClass += " item__info--has-tasks";
        }
        return (
            <div className="task-list__item item">
                <div className={itemInfoClass}>
                    <p>{this.props.task.title}</p>
                    <p>{this.props.task.description}</p>
                </div>
                <TaskList className="item__related-tasks" tasks={this.props.task.relatedTasks}/>
            </div>
        );
    }
}
