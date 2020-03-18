import React, {Component, HTMLProps, PropsWithoutRef} from 'react';
import TextField, {TextFieldProps} from "./TextField";
import './PasswordField.scss';
import {c} from "../../helpers/class-name";

interface PasswordFieldProps extends TextFieldProps {
}

export default class PasswordField extends Component<PasswordFieldProps & PropsWithoutRef<HTMLProps<HTMLInputElement>>> {
    render() {
        return (
            <TextField
                {...this.props}
                type="password"
                fieldClassName={c`password-field ${this.props.fieldClassName}`}/>
        );
    }
}
