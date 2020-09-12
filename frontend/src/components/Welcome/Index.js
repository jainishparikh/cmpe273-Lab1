import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Index extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to Yelp</h1>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>

            </div>
        )
    }
}

export default Index
