import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import Navbar from './LandingPage/Navbar';
import Login from './Login/Login';
import Logout from './Login/Logout'
import UsersDashboard from './Users/Dashboard'
import RestaurantDashboard from './Restaurant/Dashboard';

export class Main extends Component {
    render () {
        return (
            <div>
                <Route path='/' component={ Navbar } />
                <Route path='/restaurants/dashboard' component={ RestaurantDashboard } />
                <Route path='/signup' component={ Signup } />
                <Route path='/login' component={ Login } />
                <Route path='/logout' component={ Logout } />
                <Route path='/users/dashboard' component={ UsersDashboard } />



            </div>
        )
    }
}

export default Main