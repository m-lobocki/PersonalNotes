import React, {SyntheticEvent} from "react";
import {Task} from "../../models/Task";
import TaskList from "./TaskList";
import {faChevronDown, faPlus} from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import "./TaskListItem.scss";
import {c} from "../../helpers/class-name";
import {CSSTransition} from "react-transition-group";
import {connect} from "react-redux";
import uuid from "uuid";
import {AppState} from "../../store";
import {addTask, updateTask} from "../../store/tasks/actions";
import {getRelatedTasks} from "../../store/tasks/selectors";

interface TaskListItemProps {
    task: Task;
    relatedTasks?: Task[];
    className?: string;
    addTask?: typeof addTask;
    updateTask?: typeof updateTask;
}

interface TaskListItemState {
    isExpanded: boolean;
}

//todo try to split into more components
export class TaskListItem extends React.Component<TaskListItemProps, TaskListItemState> {
    readonly state = {isExpanded: false};

    toggleExpansion = (event: SyntheticEvent) => {
        this.setState(state => ({isExpanded: !state.isExpanded}));
        event.stopPropagation();
    };

    toggleTaskStatus = () => {
        const task: Task = {...this.props.task};
        task.isDone = !task.isDone;
        this.props.updateTask?.(task);
    };

    addTask = (event: SyntheticEvent) => {
        const newTask: Task = {description: 'dupa', isDone: false, id: uuid.v4(), parentId: this.props.task.id};
        this.props.addTask?.(newTask);
        event.stopPropagation();
    };

    render() {
        const relatedTasks: Task[] = this.props.relatedTasks ?? [];
        const hasRelatedTasks: boolean = relatedTasks.length > 0;
        const isExpanded: boolean = this.state.isExpanded;
        const isTaskDone: boolean = this.props.task.isDone;
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
                            <Icon onClick={this.addTask} icon={faPlus}/>
                        </div>
                    </div>
                    {hasRelatedTasks &&
                    <Icon
                        className={c`task-item__expansion-indicator ${`task-item__expansion-indicator--${this.state.isExpanded ? 'activated' : 'deactivated'}`}`}
                        icon={faChevronDown}/>
                    }
                </div>
                <CSSTransition in={isExpanded} classNames={"task-list"} timeout={300} unmountOnExit>
                    <TaskList parentId={this.props.task.id}/>
                </CSSTransition>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState, ownProperties: TaskListItemProps) => ({
    relatedTasks: getRelatedTasks(state, ownProperties.task.id)
});

export default connect(mapStateToProps, {addTask, updateTask})(TaskListItem);
