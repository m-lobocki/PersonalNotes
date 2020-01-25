import React, {Component} from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
    value: number;
}

export default class ProgressBar extends Component<ProgressBarProps> {
    render() {
        let value: number = this.props.value;
        if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        }
        return (
            <div className="progress-bar">
                <figure className="progress-bar__filler" style={{'width': value + '%'}}/>
            </div>
        );
    }
}
