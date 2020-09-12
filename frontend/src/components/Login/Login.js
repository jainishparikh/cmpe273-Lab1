import React, { Component } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';
import cookie from "react-cookies";

export class Login extends Component {
    constructor( props ) {
        super( props );
        this.backend_url = "http://localhost:3001";
        this.state = {
            type: '',
            email: '',
            password: '',
            error: false
        }
    }
    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }
    //handle submit
    handleSubmit = sub => {
        sub.preventDefault();

        console.log( this.state );
        axios
            .post( this.backend_url + '/user/login', this.state )
            .then( ( response ) => {
                if ( response.status === 200 ) {
                    this.setState( {
                        error: false
                    } )
                    cookie.save( "auth", true, {
                        path: '/',
                        httpOnly: false,
                        maxAge: 90000
                    } )
                    cookie.save( "id", response.data.id, {
                        path: '/',
                        httpOnly: false,
                        maxAge: 90000
                    } )
                    cookie.save( "name", response.data.name, {
                        path: '/',
                        httpOnly: false,
                        maxAge: 90000
                    } )
                    cookie.save( "email", response.data.email, {
                        path: '/',
                        httpOnly: false,
                        maxAge: 90000
                    } )
                    window.location.load( '/home' );
                }
            } )
            .catch( ( err ) => {
                this.setState( {
                    error: true
                } )

            } );
    };

    renderError = () => {
        if ( this.state.error ) {
            return (
                <div>
                    <h5>"Invalid Username or Password"</h5>
                </div>
            )
        }
    }
    render () {

        if ( cookie.load( 'auth' ) ) {
            return <Redirect to='/home' />
        }
        return (
            <div>
                { this.renderError() }
                <form onSubmit={ this.handleSubmit } id="Login">
                    <div className="role" onChange={ this.handleInputChange }>
                        <input type="radio" id='radio-b1' name="type" value='users'
                        />
                        <label>User</label>
                        <input type="radio" id='radio-b2' name="type" value='restaurants'
                        />
                        <label>Restaurant</label>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" name="email" required
                            placeholder="Enter Email" onChange={ this.handleInputChange } />

                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" required
                            placeholder="Enter Password" onChange={ this.handleInputChange } />
                    </div>
                    <button type="submit" className="btn btn-primary" onSubmit={ this.handleSubmit }>Login</button>

                </form>
            </div>
        )
    }
}

export default Login
