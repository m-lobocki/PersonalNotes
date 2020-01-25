import React, {Component, SyntheticEvent} from 'react';
import './ToggleButton.scss';
import {c} from "../helpers/class-name";

interface ToggleButtonProps {
    onToggle: (isToggled: boolean) => void;
    isToggled: boolean;
    className?: string;
}

export default class ToggleButton extends Component<ToggleButtonProps> {
    emitOnToggle = (event: SyntheticEvent) => {
        this.props.onToggle(!this.props.isToggled);
        event.stopPropagation();
    };

    render() {
        return (
            <button
                className={c`toggle-button ${this.props.className} ${`toggle-button--${this.props.isToggled ? 'activated' : 'deactivated'}`}`}
                onClick={this.emitOnToggle}>
                {this.props.children}
            </button>
        );
    }
}
