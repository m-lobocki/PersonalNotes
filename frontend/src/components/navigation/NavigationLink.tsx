import React, {Component} from 'react';
import {NavLink, NavLinkProps} from "react-router-dom";

interface NavigationLinkProps extends NavLinkProps {
}

export default class NavigationLink extends Component<NavigationLinkProps> {
    render() {
        return (
            <NavLink {...this.props}
                     className="navigation-bar__link"
                     activeClassName="navigation-bar__link--active">
                {this.props.children}
            </NavLink>
        );
    }
}
