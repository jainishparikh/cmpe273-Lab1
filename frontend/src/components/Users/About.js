import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import axios from 'axios';
import profile_picture from '../../images/profile.png';
import getUserProfileAction from '../../actions/getUserProfileAction'
import { connect } from "react-redux";
// import review from './Reviews';

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
            blogLink: "",
            profileImagePath: profile_picture,
        }

    }
    componentDidMount () {
        this.props.getUserProfileAction( this.state );
        // let email = cookie.load( "email" )
        // axios.get( this.backend_url + '/users/about/' + email ).then( ( response ) => {
        //     if ( response.status === 200 ) {
        //         console.log( "got data" )
        //         let imagePath = this.backend_url + "/images/profilepics/" + response.data.profilePicture
        //         if ( response.data.profilePicture === null ) {
        //             console.log( "inside imagepath null" )
        //             imagePath = profile_picture
        //         }
        //         this.setState( {
        //             userID: response.data.userID,
        //             name: response.data.name,
        //             nickName: response.data.nickName,
        //             email: response.data.email,
        //             contactNumber: response.data.contactNumber,
        //             dateOfBirth: response.data.dateOfBirth,
        //             city: response.data.city,
        //             state: response.data.state,
        //             country: response.data.country,
        //             headline: response.data.headline,
        //             yelpingSince: response.data.yelpingSince,
        //             thingsILove: response.data.thingsILove,
        //             blogLink: response.data.blogLink,
        //             profileImagePath: imagePath
        //         } )
        //     }
        //     console.log( this.state );

        // } ).catch( ( err ) => {
        //     console.log( " error getting user data" )
        //     this.setState( {
        //         error: true
        //     } )

        // } );
    }



    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        return (

            < div >
                { redirectVar }
                <div className="container-fluid">
                    <div className="container-fluid" style={ { height: "100vh" } }>
                        <div className="row mt-3 mb-3" style={ { height: "30%", background: "whitesmoke" } }>
                            {/* profile picture */ }
                            <div className="col-2">
                                <img src={ this.props.profileImagePath } width="102%" height="100%" alt="" />
                            </div>
                            {/* profile display */ }
                            <div className="col-8" >
                                <div className="row pt-4">
                                    <div className="col-8">
                                        <table>
                                            <tbody>
                                                <tr></tr>
                                                <tr>
                                                    <td><h2>{ this.props.name }</h2></td>
                                                </tr>
                                                <tr>
                                                    <td><h5>{ this.props.city }, { this.props.state }</h5></td>
                                                </tr>
                                                <tr>&nbsp;</tr>
                                                <tr>&nbsp;</tr>
                                                <tr>
                                                    <td>{ this.props.headline }</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="col-4" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>

                                        <table>
                                            <tbody>
                                                <th>Yelping Since:</th>
                                                <tr>{ this.props.yelpingSince }</tr>
                                                <th>Things I Love:</th>
                                                <tr>{ this.props.thingsILove }&nbsp;</tr>
                                                <th>Blog Link:</th>
                                                <tr>{ this.props.blogLink }&nbsp;</tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className="row" style={ { height: "70%" } }>
                            {/* edit-profile */ }
                            <div className="col-2" >
                                <Link className="btn btn-primary" to={ {
                                    pathname: "/users/editprofile", state: {
                                        userData: {
                                            userID: this.props.userID,
                                            name: this.props.name,
                                            nickName: this.props.nickName,
                                            email: this.props.email,
                                            contactNumber: this.props.contactNumber,
                                            dateOfBirth: this.props.dateOfBirth,
                                            city: this.props.city,
                                            state: this.props.state,
                                            country: this.props.country,
                                            headline: this.props.headline,
                                            yelpingSince: this.props.yelpingSince,
                                            thingsILove: this.props.thingsILove,
                                            blogLink: this.props.blogLink,
                                            profileImagePath: this.props.profileImagePath,
                                        }
                                    }
                                } }>

                                    Edit Profile
                                </Link>
                            </div>
                            {/* reviews */ }
                            <div className="col-8" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>
                                Reviews
                            </div>


                        </div>
                    </div>


                </div >
            </div >
        )
    }

}

const matchStateToProps = ( state ) => {
    console.log( "inside matchStatetoProps", state )
    return {
        userID: state.getUserProfileReducer.userData.userID,
        name: state.getUserProfileReducer.userData.name,
        nickName: state.getUserProfileReducer.userData.nickName,
        email: state.getUserProfileReducer.userData.email,
        contactNumber: state.getUserProfileReducer.userData.contactNumber,
        dateOfBirth: state.getUserProfileReducer.userData.dateOfBirth,
        city: state.getUserProfileReducer.userData.city,
        state: state.getUserProfileReducer.userData.state,
        country: state.getUserProfileReducer.userData.country,
        headline: state.getUserProfileReducer.userData.headline,
        yelpingSince: state.getUserProfileReducer.userData.yelpingSince,
        thingsILove: state.getUserProfileReducer.userData.thingsILove,
        blogLink: state.getUserProfileReducer.userData.blogLink,
        profileImagePath: state.getUserProfileReducer.profileImagePath,
    }

}

const matchDispatchToProps = ( dispatch ) => {
    return {
        getUserProfileAction: ( data ) => dispatch( getUserProfileAction( data ) ),
    }
}

export default connect( matchStateToProps, matchDispatchToProps )( UserAbout )
