import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import "./NavigationBar.scss";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {withActiveClassNames} from "../../helpers/withActiveClassNames";

interface NavigationBarProps {
    isAuthorized: boolean;
    isNavigationBarVisible: boolean;
}

export class NavigationBar extends Component<NavigationBarProps> {
    render() {
        const NavigationLink = withActiveClassNames(NavLink, 'navigation-bar__link');
        return (
            this.props.isNavigationBarVisible &&
            <nav className="navigation-bar">
                <Link className="navigation-bar__brand" to="/">Personal Notes</Link>
                {this.props.isAuthorized ? <>
                    <NavigationLink exact to="/">Home</NavigationLink>
                    <NavigationLink to="/tasks">Tasks</NavigationLink>
                    <NavigationLink to="/contacts">Contacts</NavigationLink>
                </> : <>
                    <NavigationLink to="/auth/sign-in">Sign In</NavigationLink>
                    <NavigationLink to="/auth/register">Register</NavigationLink>
                </>}
            </nav>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isAuthorized: state.session.isAuthorized,
    isNavigationBarVisible: state.session.isNavigationBarVisible
});

export default connect(mapStateToProps)(NavigationBar);
