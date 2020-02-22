import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./NavigationBar.scss";
import {connect} from "react-redux";
import {AppState} from "../../store";
import GuestNavigationLinks from "./GuestNavigationLinks";
import UserNavigationLinks from "./UserNavigationLinks";

interface NavigationBarProps {
    isAuthorized: boolean;
    isNavigationBarVisible: boolean;
}

export class NavigationBar extends Component<NavigationBarProps> {
    render() {
        return (
            this.props.isNavigationBarVisible &&
            <nav className="navigation-bar">
                <Link className="navigation-bar__brand" to="/">Personal Notes</Link>
                {this.props.isAuthorized ? <UserNavigationLinks/> : <GuestNavigationLinks/>}
            </nav>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isAuthorized: state.session.isAuthorized,
    isNavigationBarVisible: state.session.isNavigationBarVisible
});

export default connect(mapStateToProps)(NavigationBar);
