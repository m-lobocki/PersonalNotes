import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import "./NavigationBar.scss";

export default class NavigationBar extends Component {
    render() {
        return (
            <nav className="navigation-bar">
                <Link className="navigation-bar__brand" to="/">Personal Notes</Link>
                <NavLink className="navigation-bar__link" activeClassName="navigation-bar__link--active"
                         exact to="/">Home</NavLink>
                <NavLink className="navigation-bar__link" activeClassName="navigation-bar__link--active"
                         to="/tasks">Tasks</NavLink>
                <NavLink className="navigation-bar__link" activeClassName="navigation-bar__link--active"
                         to="/contacts">Contacts</NavLink>
            </nav>
        );
    }
}
