import React, {Component} from 'react';
import NavigationLink from "./NavigationLink";

export default class GuestNavigationLinks extends Component {
    render() {
        return (
            <>
                <NavigationLink to="/auth/sign-in">Sign In</NavigationLink>
                <NavigationLink to="/auth/register">Register</NavigationLink>
            </>
        );
    }
}
