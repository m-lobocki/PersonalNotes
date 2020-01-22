import React, {Component, SyntheticEvent} from 'react';

interface ToggleButtonProps {
    onToggle: (event: SyntheticEvent, isToggled: boolean) => void;
    isToggled: boolean;
    className?: string;
}

export default class ToggleButton extends Component<ToggleButtonProps> {
    render() {
        return (
            <button className={this.props.className}>
                {this.props.children}
            </button>
        );
    }
}
