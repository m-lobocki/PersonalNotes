import React, {Component} from 'react';
import NavigationLink from "./NavigationLink";

export default class UserNavigationLinks extends Component {
    render() {
        return (
            <>
                <NavigationLink exact to="/">Home</NavigationLink>
                <NavigationLink to="/tasks">Tasks</NavigationLink>
                <NavigationLink to="/contacts">Contacts</NavigationLink>
            </>
        );
    }
}
