import React, {Component, HTMLProps} from 'react';
import "./TextField.scss";
import {c} from "../../helpers/class-name";

export interface TextFieldProps {
    label: string;
    id: any;
    fieldClassName?: string;
}

export default class TextField extends Component<TextFieldProps & HTMLProps<HTMLInputElement>> {
    render() {
        let props = {...this.props};
        const {id, label, fieldClassName} = props;
        delete props.label;
        delete props.fieldClassName;
        return (
            <div className={c`text-field ${fieldClassName}`}>
                <input className="text-field__input" placeholder=" " {...props}/>
                <label className="text-field__label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}
