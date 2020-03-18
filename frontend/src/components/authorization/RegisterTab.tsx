import React, {Component} from 'react';
import './RegisterTab.scss';
import TextField from "../form/TextField";
import PasswordField from "../form/PasswordField";
import Form from "../form/Form";

interface RegisterForm {
    email: string;
    password: string;
    passwordRepeat: string;
}

class RegisterTab extends Component {
    render() {
        return (
            <Form<RegisterForm> className="register" initialState={{email: '', password: '', passwordRepeat: ''}}>
                <TextField label="Email" id="email"/>
                <PasswordField label="Password" id="password"/>
                <PasswordField label="Repeat Password" id="passwordRepeat"/>
                <button className="button button--primary register-button" type="submit">Register</button>
            </Form>
        );
    }
}

export default RegisterTab;