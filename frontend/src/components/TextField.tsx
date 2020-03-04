import React, {Component, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import "./TextField.scss";

interface TextFieldProps {
    label: string;
    id: any;
}

type HTMLInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default class TextField extends Component<TextFieldProps & HTMLInputProps> {
    render() {
        const {id, label} = this.props;
        return (
            <div className="field">
                <input className="field__input" placeholder=" " {...this.props}/>
                <label className="field__label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}
