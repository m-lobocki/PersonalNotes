import React, {SyntheticEvent} from "react";
import {Task} from "../../models/Task";
import {TaskList} from "./TaskList";
import {faChevronRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import "./TaskListItem.scss";
import {c} from "../../helpers/class-name";
import ProgressBar from "../ProgressBar";

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

    toggleTaskStatus = () => {
        const task: Task = {...this.props.task};
        task.isDone = !task.isDone;
        this.props.onTaskChange?.(task);
    };

    countRelatedTaskStatuses(task: Task): [number, number] {
        let all: number = task.relatedTasks.length;
        let done: number = task.relatedTasks.filter(task => task.isDone).length;
        for (const relatedTask of task.relatedTasks) {
            const [allRelated, doneRelated] = this.countRelatedTaskStatuses(relatedTask);
            all += allRelated;
            done += doneRelated;
        }
        return [all, done];
    }

    calculateTaskProgress(task: Task): number {
        const [all, done] = this.countRelatedTaskStatuses(task);
        if (all === 0) {
            return 0;
        }
        return done * 100 / all;
    }

    render() {
        const relatedTasks: Task[] = this.props.task.relatedTasks;
        const hasRelatedTasks: boolean = relatedTasks.length > 0;
        const isExpanded: boolean = this.state.isExpanded;
        const isTaskDone: boolean = this.props.task.isDone;
        const doneRelatedTaskPercentage: number = this.calculateTaskProgress(this.props.task);
        return (
            <section className="task-list__related-tasks"
                     onClick={this.toggleExpansion}>
                <div className={c`task-item ${{
                    'task-item--has-related-tasks': hasRelatedTasks,
                    'task-item--done': isTaskDone
                }}`}>
                    <div className={c`task-item__info`}>
                        <input className="task-item__status" onClick={e => e.stopPropagation()} type="checkbox"
                               checked={isTaskDone} onChange={this.toggleTaskStatus}/>
                        <p className="task-item__title">{this.props.task.description}</p>
                        <div className="task-item__toolbar">
                            {hasRelatedTasks &&
                            <Icon
                                className={c`task-item__expansion-indicator ${`task-item__expansion-indicator--${this.state.isExpanded ? 'activated' : 'deactivated'}`}`}
                                icon={faChevronRight}/>
                            }
                            <Icon icon={faPlus}/>
                        </div>
                    </div>
                    <ProgressBar value={doneRelatedTaskPercentage}/>
                </div>
                {isExpanded &&
                <TaskList tasks={relatedTasks} onTaskChange={this.props.onTaskChange}/>
                }
            </section>
        );
    }
}