import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import Navbar from './LandingPage/Navbar';
import Login from './Login/Login';
import Logout from './Login/Logout';
//User
import UsersDashboard from './Users/Dashboard';
import UserAbout from "./Users/About";
import EditUserProfile from "./Users/Profile";
import UserEvents from './Users/Events'
//restaurant
import RestaurantDashboard from './Restaurant/Dashboard';
import RestaurantAbout from "./Restaurant/About";
import EditRestaurantProfile from "./Restaurant/Profile";
import RestaurantReviews from "./Restaurant/Reviews";
import RestaurantEvents from "./Restaurant/Events";
import UserProfiles from "./Restaurant/UserProfile"

export class Main extends Component {
    render () {
        return (
            <div>
                <Route path='/' component={ Navbar } />
                <Route path='/signup' component={ Signup } />
                <Route path='/login' component={ Login } />
                <Route path='/logout' component={ Logout } />
                <Route path='/users/dashboard' component={ UsersDashboard } />
                <Route path='/users/about' component={ UserAbout } />
                <Route path='/users/editprofile' component={ EditUserProfile } />
                <Route path='/users/events' component={ UserEvents } />
                <Route path='/restaurants/dashboard' component={ RestaurantDashboard } />
                <Route path='/restaurants/about' component={ RestaurantAbout } />
                <Route path='/restaurants/editprofile' component={ EditRestaurantProfile } />
                <Route path='/restaurants/reviews' component={ RestaurantReviews } />
                <Route path='/restaurants/events' component={ RestaurantEvents } />
                <Route path='/restaurants/userprofiles/:userEmail' component={ UserProfiles } />

            </div>
        )
    }
}

export default Main