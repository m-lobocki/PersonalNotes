import React, {SyntheticEvent} from "react";
import {Task} from "../models/Task";
import {TaskList} from "./TaskList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

export interface TaskListItemProps {
    task: Task;
    className?: string;
}

export interface TaskListItemState {
    isExpanded: boolean;
    hasBeenClicked: boolean;
}

export class TaskListItem extends React.Component<TaskListItemProps, TaskListItemState> {
    readonly state = {isExpanded: false, hasBeenClicked: false};

    toggleExpansion = () => {
        this.setState(state => ({isExpanded: !state.isExpanded, hasBeenClicked: true}));
    };

    stopPropagation = (event: SyntheticEvent) => {
        event.stopPropagation();
    };

    render() {
        const relatedTasks: Task[] = this.props.task.relatedTasks;
        const hasRelatedTasks: boolean = relatedTasks.length > 0;
        const isExpanded = this.state.isExpanded;
        return (
            <div className="task-list__item item">
                <div className={"item__info info " + (hasRelatedTasks ? "item__info--has-tasks" : "")}>
                    <input type="checkbox" checked={this.props.task.isDone}/>
                    <p>{this.props.task.description}</p>
                    {hasRelatedTasks &&
                    <figure className="icon-wrapper" onClick={this.toggleExpansion}>
                        <FontAwesomeIcon
                            className={"info__icon " + (isExpanded ? "info__icon--expanded" : (this.state.hasBeenClicked ? "info__icon--shrank" : ""))}
                            icon={faChevronRight}/>
                    </figure>
                    }
                </div>
                {isExpanded &&
                <TaskList className="item__related-tasks" tasks={relatedTasks}/>
                }
            </div>
        );
    }
}
