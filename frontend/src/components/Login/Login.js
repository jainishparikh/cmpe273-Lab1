import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from "react-cookies";
import BACKEND_URL from '../../config/config'

export class Login extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            type: '',
            email: '',
            password: '',
            error: false,
            errorMessage: '',
        }
    }

    handlePasswordChange = inp => {
        this.setState( {
            password: inp.target.value
        } )

    }

    handleEmailChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        if ( /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test( inp.target.value ) ) {
            this.setState( {
                error: true,
                errorMessage: "Special characters not allowed",
                [ inp.target.name ]: ""
            } )
        } else {
            this.setState( {
                error: false,
                [ inp.target.name ]: inp.target.value
            } )
        }
    }
    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        if ( /[~`!#$@%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test( inp.target.value ) ) {
            this.setState( {
                error: true,
                errorMessage: "Special characters not allowed",
                [ inp.target.name ]: ""
            } )
        } else {
            this.setState( {
                error: false,
                [ inp.target.name ]: inp.target.value
            } )
        }
    }


    //handle submit
    handleSubmit = sub => {
        sub.preventDefault();
        if ( this.state.type === "" ) {
            this.setState( {
                error: true,
                errorMessage: "Please Select User or Restaurant"
            } )
        } else {

            var backend_path = '';
            if ( this.state.type === 'users' ) {
                backend_path = '/users/login'
            } else if ( this.state.type === 'restaurants' ) {
                backend_path = '/restaurants/login'
            }
            console.log( this.state );
            console.log( BACKEND_URL + backend_path )
            axios
                .post( BACKEND_URL + backend_path, this.state )
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
                        cookie.save( "type", this.state.type, {
                            path: '/',
                            httpOnly: false,
                            maxAge: 90000
                        } )
                        if ( this.state.type === 'users' ) {
                            window.location.assign( '/users/dashboard' );
                        } else if ( this.state.type === 'restaurants' ) {
                            window.location.assign( '/restaurants/about' );
                        }
                    }
                } )
                .catch( ( err ) => {
                    this.setState( {
                        error: true,
                        errorMessage: "Invalid Credentials"
                    } )

                } );
        }
    };


    render () {

        if ( cookie.load( 'auth' ) && cookie.load( 'type' ) === 'users' ) {
            return <Redirect to='/users/dashboard' />
        }
        else if ( cookie.load( 'auth' ) && cookie.load( 'type' ) === 'restaurants' ) {
            return <Redirect to='/restautants/dashboard' />
        }
        let renderError = null
        if ( this.state.error ) {
            renderError = <div style={ { 'color': 'red' } }>{ this.state.errorMessage }</div>
        }
        return (
            <div>

                <div className="container" style={ { height: "100vh" } }>
                    <div className="h-100">
                        <div className="upper" style={ { height: "30%" } }>
                        </div>
                        <div className="lower" style={ { height: "70%" } }>
                            <div className="col-4">

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
                                            autoFocus placeholder="Enter Email" onChange={ this.handleEmailChange } />

                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" required
                                            placeholder="Enter Password" onChange={ this.handlePasswordChange } />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onSubmit={ this.handleSubmit }>Login</button>

                                </form>
                                { renderError }
                                <br></br>
                                Don't have an account? { <Link to="/signup">Sign Up</Link> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
