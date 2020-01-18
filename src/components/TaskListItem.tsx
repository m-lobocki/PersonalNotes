import React, {SyntheticEvent} from "react";
import {Task} from "../models/Task";
import {TaskList} from "./TaskList";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";
import "./TaskListItem.scss";

interface TaskListItemProps {
    task: Task;
    className?: string;
    onTaskChange?: (changedTask: Task) => void;
}

interface TaskListItemState {
    isExpanded: boolean;
}

export class TaskListItem extends React.Component<TaskListItemProps, TaskListItemState> {
    readonly state = {isExpanded: false};

    toggleExpansion = (event: SyntheticEvent) => {
        this.setState(state => ({isExpanded: !state.isExpanded}));
        event.stopPropagation();
    };

    toggleTaskStatus = (event: SyntheticEvent) => {
        const task: Task = {...this.props.task};
        task.isDone = !task.isDone;
        this.props.onTaskChange?.(task);
        event.stopPropagation();
    };

    render() {
        const relatedTasks: Task[] = this.props.task.relatedTasks;
        const hasRelatedTasks: boolean = relatedTasks.length > 0;
        const isExpanded = this.state.isExpanded;
        return (
            <div className="task-list__item item" onClick={this.toggleTaskStatus}>
                <div className={"item__info info " + (hasRelatedTasks ? "item__info--has-tasks" : "")}>
                    <input type="checkbox" checked={this.props.task.isDone} onChange={this.toggleTaskStatus}/>
                    <p>{this.props.task.description}</p>
                    {hasRelatedTasks &&
                    <Icon icon={faChevronRight} onClick={this.toggleExpansion}/>
                    }
                </div>
                {isExpanded &&
                <TaskList className="item__related-tasks" tasks={relatedTasks} onTaskChange={this.props.onTaskChange}/>
                }
            </div>
        );
    }
}
