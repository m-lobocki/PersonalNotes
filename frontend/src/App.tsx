import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavigationBar from "./components/navigation/NavigationBar";
import Tasks from "./components/tasks/Tasks";
import AuthorizationTabHost from "./components/authorization/AuthorizationTabHost";

export default class App extends Component {
    render() {
        return (
            <Router>
                <>
                    <NavigationBar/>
                    <Switch>
                        <Route exact path="/">
                            HOME
                        </Route>
                        <Route path="/tasks" component={Tasks}/>
                        <Route path="/contacts">
                            Contacts
                        </Route>
                        <Route path="/auth" component={AuthorizationTabHost}/>
                    </Switch>
                </>
            </Router>
        );
    }
}
