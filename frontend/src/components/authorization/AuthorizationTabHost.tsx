import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import SignInTab from "./SignInTab";
import RegisterTab from "./RegisterTab";
import {connect} from "react-redux";
import {toggleNavigationBar} from "../../store/session/actions";
import Icon from '../Icon';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "./AuthorizationTabHost.scss";
import {withActiveClassNames} from "../../helpers/withActiveClassNames";

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
        const NavigationLink = withActiveClassNames(NavLink, 'authorization__tab');
        return (
            <article className="authorization">
                <header className="authorization__header">
                    <NavigationLink to="/auth/sign-in">Sign In</NavigationLink>,
                    <NavigationLink to="/auth/register">Register</NavigationLink>,
                    <NavigationLink exact to="/"><Icon icon={faArrowRight}/></NavigationLink>
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