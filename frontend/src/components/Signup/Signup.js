import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import userSignUpAction from '../../actions/userSignUpAction';

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
        console.log( this.state )
        if ( this.state.type === "users" ) {
            this.props.userSignUpAction( this.state )
        }
        // if ( this.state.type === 'users' ) {
        // axios
        //     .post( this.backend_url + '/users/signup', this.state )
        //     .then( ( response ) => {
        //         if ( response.status === 200 ) {
        //             window.location.assign( '/login' )
        //         }

        //     } )
        //     .catch( ( err ) => {
        //         this.setState( {
        //             error: true
        //         } )

        //     } );
        // } else if ( this.state.type === 'restaurants' ) {
        //     axios
        //         .post( this.backend_url + '/restaurants/signup', this.state )
        //         .then( ( response ) => {
        //             console.log( response )
        //             if ( response.status === 200 ) {
        //                 console.log( "redirecting to login" )
        //                 window.location.assign( '/login' )
        //             }

        //         } ).catch( ( err ) => {
        //             console.log( "inside restaurant error" )
        //             this.setState( {
        //                 error: true
        //             } )

        //         } );
        // }
    };

    renderError = () => {
        if ( this.props.error ) {
            return (
                <div>
                    <h5>"User with this email already exist"</h5>
                </div>
            )
        }
    }

    render () {
        let redirectVar = null
        if ( this.props.auth ) {
            redirectVar = <Redirect to='/login' />
        }

        return (
            <div>
                { redirectVar }
                { this.renderError() }
                <div className="container" style={ { height: "100vh" } }>
                    <div className="h-100">
                        <div className="upper" style={ { height: "30%" } }></div>
                        <div className="lower" style={ { height: "70%" } }>
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

const matchStateToProps = ( state ) => {
    console.log( "inside matchStatetoProps", state )
    return {
        auth: state.userSignUpReducer.auth,
        error: state.userSignUpReducer.error,
        message: state.userSignUpReducer.message
    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        userSignUpAction: ( data ) => dispatch( userSignUpAction( data ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( Signup )
