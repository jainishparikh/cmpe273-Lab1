import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export class Signup extends Component {
    constructor( props ) {
        super( props );
        this.backend_url = "http://localhost:3001";
        this.state = {
            type: '',
            name: '',
            email: '',
            password: '',
            address: '',
            error: false
        }
    }
    //handle input change
    handleInputChange = inp => {
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }


    //handle submit
    handleSubmit = sub => {
        sub.preventDefault();

        console.log( this.state );

        if ( this.state.type === 'users' ) {
            axios
                .post( this.backend_url + '/users/signup', this.state )
                .then( ( response ) => {
                    if ( response.status === 200 ) {
                        window.location.assign( '/login' )
                    }

                } )
                .catch( ( err ) => {
                    this.setState( {
                        error: true
                    } )

                } );
        } else if ( this.state.type === 'restaurants' ) {
            axios
                .post( this.backend_url + '/restaurants/signup', this.state )
                .then( ( response ) => {
                    console.log( response )
                    if ( response.status === 200 ) {
                        console.log( "redirecting to login" )
                        window.location.assign( '/login' )
                    }

                } ).catch( ( err ) => {
                    console.log( "inside restaurant error" )
                    this.setState( {
                        error: true
                    } )

                } );
        }
    };

    renderError = () => {
        if ( this.state.error ) {
            return (
                <div>
                    <h5>"User with this email already exist"</h5>
                </div>
            )
        }
    }

    render () {

        return (
            <div>
                { this.renderError() }
                <div className="container" style={ { height: "100vh" } }>
                    <div className="h-100">
                        <div className="h-25"></div>
                        <div className="h-75">
                            <div className="col-5">
                                <form onSubmit={ this.handleSubmit } id="Signup">
                                    <div className="role" >
                                        <input type="radio" id='radio-b1' name="type" value='users' onChange={ this.handleInputChange }
                                        />
                                        <label>User</label>
                                        <input type="radio" id='radio-b2' name="type" value='restaurants' onChange={ this.handleInputChange }
                                        />
                                        <label>Restaurant</label>

                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" name="name" autoFocus required
                                            placeholder="Enter Name" onChange={ this.handleInputChange } />

                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="email" required
                                            placeholder="Enter Email" onChange={ this.handleInputChange } />

                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" required
                                            placeholder="Enter Password" onChange={ this.handleInputChange } />
                                    </div>
                                    <div className="form-group">
                                        { this.state.type === 'restaurants' ? <input type="text" className="form-control" name="address" required
                                            placeholder="Enter location" onChange={ this.handleInputChange } /> : undefined }
                                    </div>
                                    <button type="submit" className="btn btn-primary" onSubmit={ this.handleSubmit }>Sign Up</button>
                                </form>
                                <br></br>
                                Already have an account? { <Link to="/login">Login</Link> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup
