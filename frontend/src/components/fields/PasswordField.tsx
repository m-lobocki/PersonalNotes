import React, {Component, HTMLProps, PropsWithoutRef} from 'react';
import TextField, {TextFieldProps} from "./TextField";
import './PasswordField.scss';

interface PasswordFieldProps extends TextFieldProps {
}

export default class PasswordField extends Component<PasswordFieldProps & PropsWithoutRef<HTMLProps<HTMLInputElement>>> {
    render() {
        return (
            <TextField
                {...this.props}
                type="password"
                fieldClassName="password-field"/>
        );
    }
}
