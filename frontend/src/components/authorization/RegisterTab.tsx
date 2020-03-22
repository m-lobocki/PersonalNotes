import React, {Component} from 'react';
import './RegisterTab.scss';
import TextField from "../form/TextField";
import PasswordField from "../form/PasswordField";
import Form, {FormValidation} from "../form/Form";

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
                <TextField type="email" label="Email" id="email"/>
                <PasswordField label="Password" id="password"/>
                <PasswordField label="Repeat Password" id="passwordRepeat"/>
                <button className="button button--primary register-button" type="submit">Register</button>
            </Form>
        );
    }

    * validateForm(state: RegisterForm): FormValidation<RegisterForm> {
        if (!state.email || !/[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(state.email)) {
            yield ['email', 'Email is invalid'];
        }
        if (state.password.length < 8) {
            yield ['password', 'Password has to be at least 8 characters long'];
        }
        if (state.password !== state.passwordRepeat) {
            yield ['passwordRepeat', 'Passwords are not identical'];
        }
    }
}

export default RegisterTab;