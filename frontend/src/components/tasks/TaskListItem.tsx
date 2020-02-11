import React, {SyntheticEvent} from "react";
import {Task} from "../../models/Task";
import TaskList from "./TaskList";
import {faChevronDown, faPlus} from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import "./TaskListItem.scss";
import {c} from "../../helpers/class-name";
import {CSSTransition} from "react-transition-group";
import {connect} from "react-redux";
import {addTask, updateTask} from "../../redux/actions";

interface TaskListItemProps {
    task: Task;
    relatedTasks?: Task[];
    className?: string;
    onTaskUpdate?: (changedTask: Task) => void;
    onTaskAdd?: any;
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
        this.props.onTaskUpdate?.(task);
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
                            <Icon onClick={this.props.onTaskAdd} icon={faPlus}/>
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

const mapStateToProps = (state: any, ownProperties: any) => ({
    relatedTasks: state.tasks.filter((task: Task) => task.parentId === ownProperties.task.id)
});

const mapDispatchToProps = (dispatch: any, ownProperties: TaskListItemProps) => ({
    onTaskAdd: () => dispatch(addTask({description: 'test1', isDone: false, parentId: ownProperties.task.id})),
    onTaskUpdate: (task: Task) => dispatch(updateTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListItem);
