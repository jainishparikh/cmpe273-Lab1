import React, { Component } from 'react'
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import axios from 'axios';
import profile_picture from '../../images/profile.png';
import review from './Reviews';

export class UserAbout extends Component {
    constructor( props ) {
        super( props )
        this.backend_url = "http://localhost:3001"
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
    componentDidMount () {
        let email = cookie.load( "email" )
        axios.get( this.backend_url + '/users/about/' + email ).then( ( response ) => {
            console.log( response )
            if ( response.status === 200 ) {
                console.log( "got data" )
                this.setState( {
                    userID: response.data.userID,
                    name: response.data.name,
                    nickName: response.data.nickName,
                    email: response.data.email,
                    contactNumber: response.data.contactNumber,
                    dateOfBirth: response.data.dateOfBirth,
                    city: response.data.city,
                    state: response.data.state,
                    country: response.data.country,
                    headline: response.data.headline,
                    yelpingSince: response.data.yelpingSince,
                    thingsILove: response.data.thingsILove,
                    blogLink: response.data.blogLink
                } )
            }

        } ).catch( ( err ) => {
            console.log( " error getting user data" )
            this.setState( {
                error: true
            } )

        } );
    }


    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (

            < div >
                { redirectVar }
                <div className="container-fluid ml-1" style={ { height: "100vh" } }>
                    <div className="row h-25 mt-3 mb-3">
                        <div className="col-3">
                            <img src={ profile_picture } width="180" height="180" alt="" />
                        </div>

                        <div className="col-8">
                            Profile
                        </div>


                    </div>
                    <div className="row h-75">
                        <div className="col-3 mr-1">
                            <Link className="btn btn-primary" to={ {
                                pathname: "/users/editprofile", state: {
                                    userData: this.state
                                }
                            } }>Edit Profile</Link>
                        </div>
                        <div className="col-8">
                            Reviews
                            </div>


                    </div>
                </div>


            </div >
        )
    }
}

export default UserAbout
