import React, {Component} from 'react';
import TextField from "../fields/TextField";
import './RegisterTab.scss';
import PasswordField from "../fields/PasswordField";

class RegisterTab extends Component {
    render() {
        return (
            <form className="register">
                <TextField fieldClassName="email-field" label="Email" id="email"/>
                <PasswordField fieldClassName="password-field" label="Password" id="password"/>
                <PasswordField fieldClassName="password-repeat-field" label="Repeat Password" id="repeat-password"/>
                <button className="button button--primary register-button" type="submit">Register</button>
            </form>
        );
    }
}

export default RegisterTab;