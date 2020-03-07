import React, {Component, HTMLProps} from 'react';
import "./TextField.scss";

interface TextFieldProps {
    label: string;
    id: any;
}

export default class TextField extends Component<TextFieldProps & HTMLProps<HTMLInputElement>> {
    render() {
        const {id, label} = this.props;
        return (
            <div className="text-field">
                <input className="text-field__input" placeholder=" " {...this.props}/>
                <label className="text-field__label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}
