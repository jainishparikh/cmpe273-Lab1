import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';

export class Profile extends Component {
    constructor( props ) {
        super( props )
        this.backend_url = "http://localhost:3001";
        if ( this.props.location.state ) {
            this.state = {
                userID: this.props.location.state.userData.userID,
                name: this.props.location.state.userData.name,
                nickName: this.props.location.state.userData.nickName,
                email: this.props.location.state.userData.email,
                contactNumber: this.props.location.state.userData.contactNumber,
                dateOfBirth: this.props.location.state.userData.dateOfBirth,
                city: this.props.location.state.userData.city,
                state: this.props.location.state.userData.state,
                country: this.props.location.state.userData.country,
                headline: this.props.location.state.userData.headline,
                yelpingSince: this.props.location.state.userData.yelpingSince,
                thingsILove: this.props.location.state.userData.thingsILove,
                blogLink: this.props.location.state.userData.blogLink

            }
        } else {
            this.state = {
                userID: "",
                name: "",
                nickName: "",
                email: "",
                contactNumber: "",
                dateOfBirth: "",
                city: "",
                state: "",
                country: "",
                headline: "",
                yelpingSince: "",
                thingsILove: "",
                blogLink: ""
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
            .put( this.backend_url + "/users/about", this.state ).then( response => {
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
                    window.location.assign( "/users/about" );
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
                                <div className="row ml-3">
                                    <label>Profile Photo:</label>
                                    {/* <input type="text" className="form-control" name="name"
                                    placeholder={ this.state.userID } onChange={ this.handleInputChange } /> */}

                                </div>
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Name:</label>
                                        <input type="text" className="form-control" name="name"
                                            placeholder={ this.state.name } onChange={ this.handleInputChange } />


                                    </div>
                                    <div className="col-5">
                                        <label>Nick Name:</label>
                                        <input type="text" className="form-control" name="nickName"
                                            placeholder={ this.state.nickName } onChange={ this.handleInputChange } />

                                    </div>
                                </div>

                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Email:</label>
                                        <input type="text" className="form-control" name="email"
                                            placeholder={ this.state.email } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Contact Number:</label>
                                        <input type="text" className="form-control" name="contactNumber"
                                            placeholder={ this.state.contactNumber } onChange={ this.handleInputChange } />


                                    </div>
                                    <div className="col-5">
                                        <label>Date Of Birth: (YYYY-MM-DD)</label>
                                        <input type="text" className="form-control" name="dateOfBirth"
                                            placeholder={ this.state.dateOfBirth } onChange={ this.handleInputChange } />
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="col-3">
                                        <label>City:</label>
                                        <input type="text" className="form-control" name="city"
                                            placeholder={ this.state.city } onChange={ this.handleInputChange } />


                                    </div>
                                    <div className="col-3">
                                        <label>State:</label>
                                        <input type="text" className="form-control" name="state"
                                            placeholder={ this.state.state } onChange={ this.handleInputChange } />

                                    </div>
                                    <div className="col-3">
                                        <label>Country:</label>
                                        <input type="text" className="form-control" name="country"
                                            placeholder={ this.state.country } onChange={ this.handleInputChange } />


                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Headline:</label>
                                        <input type="text" className="form-control" name="headline"
                                            placeholder={ this.state.headline } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Things I Love:</label>
                                        <input type="text" className="form-control" name="thingsILove"
                                            placeholder={ this.state.thingsILove } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Yelping Since:</label>
                                        <input type="text" className="form-control" name="yelpingSince"
                                            placeholder={ this.state.yelpingSince } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Blog Link:</label>
                                        <input type="text" className="form-control" name="blogLink"
                                            placeholder={ this.state.blogLink } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row mt-3 ml-1">
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                    <div className="col-8">
                                        <Link className="btn btn-danger" to="/users/about">Cancel</Link>
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
