import React, {Component} from 'react';
import './RegisterTab.scss';
import TextField from "../form/TextField";
import PasswordField from "../form/PasswordField";
import Form, {FormErrors} from "../form/Form";

interface RegisterForm {
    email: string;
    password: string;
    passwordRepeat: string;
}

class RegisterTab extends Component {
    render() {
        return (
            <Form<RegisterForm>
                validate={this.validateForm}
                className="register"
                initialState={{email: '', password: '', passwordRepeat: ''}}>
                <TextField label="Email" id="email"/>
                <PasswordField label="Password" id="password"/>
                <PasswordField label="Repeat Password" id="passwordRepeat"/>
                <button className="button button--primary register-button" type="submit">Register</button>
            </Form>
        );
    }

    validateForm = (state: RegisterForm): FormErrors<RegisterForm> => {
        return {
            ...((!state.email || !/[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(state.email)) && {email: 'Email is invalid'}),
            ...(state.password?.length < 8 && {password: 'Password has to be at least 8 characters long'}),
            ...(state.password !== state.passwordRepeat && {passwordRepeat: 'Passwords are not identical'})
        }
    }
}

export default RegisterTab;