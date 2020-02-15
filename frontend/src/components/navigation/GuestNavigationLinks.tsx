import React, {Component} from 'react';
import NavigationLink from "./NavigationLink";

export default class GuestNavigationLinks extends Component {
    render() {
        return (
            <>
                <NavigationLink to="/sign-in">Sign In</NavigationLink>
                <NavigationLink to="/register">Register</NavigationLink>
            </>
        );
    }
}
