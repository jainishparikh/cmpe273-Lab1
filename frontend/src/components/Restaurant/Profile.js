import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import BACKEND_URL from '../../config/config'

export class Profile extends Component {
    constructor( props ) {
        super( props )
        if ( this.props.location.state ) {
            this.state = {
                restaurantID: this.props.location.state.userData.restaurantID,
                name: this.props.location.state.userData.name,
                email: this.props.location.state.userData.email,
                contact: this.props.location.state.userData.contact,
                location: this.props.location.state.userData.location,
                description: this.props.location.state.userData.description,
                timing: this.props.location.state.userData.timing
            }
        } else {
            this.state = {
                restaurantID: "",
                name: "",
                email: "",
                contact: "",
                location: "",
                description: "",
                timing: ""
            }
        }
    }
    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }

    handleOnSubmit = e => {
        e.preventDefault();
        console.log( "in handle submit" )
        axios
            .put( BACKEND_URL + "/restaurants/about", this.state ).then( response => {
                if ( response.status === 200 ) {

                    if ( cookie.load( 'email' ) !== this.state.email ) {
                        cookie.remove( "email", {
                            path: '/'
                        } );
                        cookie.save( "email", this.state.email, {
                            path: '/',
                            httpOnly: false,
                            maxAge: 90000
                        } )
                    }
                    if ( cookie.load( 'name' ) !== this.state.name ) {
                        cookie.remove( "name", {
                            path: '/'
                        } );
                        cookie.save( "name", this.state.name, {
                            path: '/',
                            httpOnly: false,
                            maxAge: 90000
                        } )
                    }
                    window.location.assign( "/restaurants/about" );
                }

            } ).catch( err => {
                console.log( "error in updating profile" );
            } )


    }



    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                { redirectVar }
                <div className="container-fluid" style={ { height: "100vh" } }>
                    <div className="row h-100 mt-5">
                        <div className="col-2">
                            <h3>Edit Profile</h3>
                        </div>
                        <div className="col-10">
                            <form onSubmit={ this.handleOnSubmit }>
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Name:</label>
                                        <input type="text" className="form-control" name="name"
                                            placeholder={ this.state.name } onChange={ this.handleInputChange } />


                                    </div>
                                </div>

                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Email:</label>
                                        <input type="text" className="form-control" name="email"
                                            placeholder={ this.state.email } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Contact Number:</label>
                                        <input type="text" className="form-control" name="contact"
                                            placeholder={ this.state.contact } onChange={ this.handleInputChange } />


                                    </div>
                                    <div className="col-5">
                                        <label>Location</label>
                                        <input type="text" className="form-control" name="location"
                                            placeholder={ this.state.location } onChange={ this.handleInputChange } />
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Timing</label>
                                        <input type="text" className="form-control" name="timing"
                                            placeholder={ this.state.timing } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Description</label>
                                        <input type="text" className="form-control" name="description"
                                            placeholder={ this.state.description } onChange={ this.handleInputChange } />


                                    </div>

                                </div>


                                <div className="row mt-3 ml-1">
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                    <div className="col-8">
                                        <Link className="btn btn-danger" to="/restaurants/about">Cancel</Link>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

export default Profile
