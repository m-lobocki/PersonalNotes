import React, {Component} from 'react';
import {Switch, Route, NavLink, NavLinkProps} from 'react-router-dom';
import SignInTab from "./SignInTab";
import RegisterTab from "./RegisterTab";
import {connect} from "react-redux";
import {toggleNavigationBar} from "../../store/session/actions";
import Icon from '../Icon';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "./AuthorizationTabHost.scss";

interface AuthorizationTabHostProps {
    toggleNavigationBar: typeof toggleNavigationBar;
}

class AuthorizationTabHost extends Component<AuthorizationTabHostProps> {
    componentDidMount(): void {
        this.props.toggleNavigationBar(false);
    }

    componentWillUnmount(): void {
        this.props.toggleNavigationBar(true);
    }

    render() {
        const classes: Partial<NavLinkProps> = {
            className: 'authorization__tab',
            activeClassName: 'authorization__tab--active'
        };
        return (
            <article className="authorization">
                <header className="authorization__header">
                    <NavLink {...classes} to="/auth/sign-in">Sign In</NavLink>,
                    <NavLink {...classes} to="/auth/register">Register</NavLink>,
                    <NavLink {...classes} exact to="/"><Icon icon={faArrowRight}/></NavLink>
                </header>
                <section className="authorization__content">
                    <Switch>
                        <Route path="/auth/sign-in" component={SignInTab}/>
                        <Route path="/auth/register" component={RegisterTab}/>
                    </Switch>
                </section>
            </article>
        );
    }
}

export default connect(null, {toggleNavigationBar})(AuthorizationTabHost);