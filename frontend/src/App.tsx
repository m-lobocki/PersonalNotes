import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";
import Tasks from "./components/tasks/Tasks";

export default class App extends Component {
    render() {
        return (
            <Router>
                <>
                    <NavigationBar/>
                    <main className="main-page">
                        <Switch>
                            <Route exact path="/">
                                HOME
                            </Route>
                            <Route path="/tasks">
                                <Tasks/>
                            </Route>
                            <Route path="/contacts">
                                Contacts
                            </Route>
                        </Switch>
                    </main>
                </>
            </Router>
        );
    }
}
