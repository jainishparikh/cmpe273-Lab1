import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Signup from './Signup/Signup';
import Index from './Welcome/Index';
import Login from './Login/Login';
import Home from './Home/Home'

export class Main extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route path='/signup' component={ Signup } />
                    <Route path='/login' component={ Login } />
                    <Route path='/home' component={ Home } />
                    <Route path='/' component={ Index } />

                </Switch>
            </div>
        )
    }
}

export default Main