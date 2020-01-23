import React, {SyntheticEvent} from "react";
import {Task} from "../../models/Task";
import {TaskList} from "./TaskList";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import "./TaskListItem.scss";
import ToggleButton from "../ToggleButton";
import {c} from "../../helpers/class-name";

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

    toggleExpansion = (isToggled: boolean) => {
        this.setState({isExpanded: isToggled});
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
            <div className="task-list__task task"
                 onClick={this.toggleTaskStatus}>
                <div className={c`task__info info ${{
                    'task__info--has-tasks': hasRelatedTasks,
                    'task--done': isTaskDone
                }}`}>
                    <input className="task__status status"
                           type="checkbox"
                           checked={isTaskDone}
                           onChange={this.toggleTaskStatus}/>
                    <p className="task__title title">{this.props.task.description}</p>
                    {hasRelatedTasks &&
                    <ToggleButton className="task__expansion-button" onToggle={this.toggleExpansion}
                                  isToggled={isExpanded}>
                        <Icon icon={faChevronRight}/>
                    </ToggleButton>
                    }
                </div>
                {isExpanded &&
                <TaskList className="task__related-tasks" tasks={relatedTasks} onTaskChange={this.props.onTaskChange}/>
                }
            </div>
        );
    }
}
