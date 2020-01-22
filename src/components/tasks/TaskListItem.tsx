import React, {SyntheticEvent} from "react";
import {Task} from "../../models/Task";
import {TaskList} from "./TaskList";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
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
        const isExpanded: boolean = this.state.isExpanded;
        const isTaskDone: boolean = this.props.task.isDone;
        return (
            <div className={"task-list__task task"}
                 onClick={this.toggleTaskStatus}>
                <div
                    className={"task__info info" + (hasRelatedTasks ? " task__info--has-tasks" : "") + (isTaskDone ? " task--done" : "")}>
                     <input className="task__status status" type="checkbox" checked={isTaskDone}
                            onChange={this.toggleTaskStatus}/>
                    <p className="task__title title">{this.props.task.description}</p>
                    {hasRelatedTasks &&
                    <Icon className="task__expansion-button" icon={faChevronRight} onClick={this.toggleExpansion}/>
                    }
                </div>
                {isExpanded &&
                <TaskList className="task__related-tasks" tasks={relatedTasks} onTaskChange={this.props.onTaskChange}/>
                }
            </div>
        );
    }
}
