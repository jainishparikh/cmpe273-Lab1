import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import Modal from 'react-modal';
import axios from 'axios';
import GetDishes from '../../Restaurant/Dishes/GetDishes';
import BACKEND_URL from '../../../config/config';
import profile_picture from '../../../images/restaurant.jpeg';
import AddReview from '../Reviews/AddReview'

export class RestaurantProfile extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            restaurantID: "",
            name: "",
            email: "",
            contact: "",
            location: "",
            description: "",
            timing: "",
            dishPopUp: false,
            profileImagePath: profile_picture,
            images: [],
            reviewPopUp: false,
        }

    }
    componentDidMount () {
        let email = this.props.match.params.restaurantEmail
        axios.get( BACKEND_URL + '/restaurants/about/' + email ).then( ( response ) => {
            console.log( response )
            if ( response.status === 200 ) {
                console.log( "got data" )
                let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
                if ( response.data.profilePicture === null ) {
                    console.log( "inside imagepath null" )
                    imagePath = profile_picture
                }
                this.setState( {
                    restaurantID: response.data.restaurantID,
                    name: response.data.name,
                    email: response.data.email,
                    contact: response.data.contact,
                    location: response.data.location,
                    description: response.data.description,
                    timing: response.data.timing,
                    profileImagePath: imagePath,

                } )
            }

        } ).catch( ( err ) => {
            console.log( " error getting restaurant data" )
            this.setState( {
                error: true
            } )

        } );
    }

    toggleReviewPopUp = ( e ) => {
        this.setState( {
            reviewPopUp: !this.state.reviewPopUp
        } )
    }
    displayImageStore = ( imageArray ) => {
        this.setState( {
            images: [ ...imageArray ]
        } )
    }


    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        let displayDishImages = this.state.images.map( ( image ) => {
            console.log( "images,", image )
            var dishImagePath = BACKEND_URL + "/images/dishes/" + image
            return (
                <img src={ dishImagePath } style={ { "margin": "10px" } } width="200px" height="90%" alt="" />
            )
        } )

        return (
            < div >
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row mt-2 mb-2 ml-5">
                        <div className="col-3">
                            <Link className="btn btn-primary" to="/users/dashboard"  >
                                Back to Dashboard
                        </Link>
                        </div>
                        <div className="col-7">
                            <div className="add-dish" >
                                <button className="btn btn-primary" onClick={ this.toggleReviewPopUp }>Give a Review</button>
                            </div>

                            <Modal isOpen={ this.state.reviewPopUp } >
                                <AddReview reviewData={ this.state } closePopUp={ this.toggleReviewPopUp } />
                            </Modal>
                        </div>
                        <div className="col-2">

                            <Link className="btn btn-primary" to=""  >
                                Order Now
                        </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3" style={ { "border-right": "1px solid #e6e6e6" } }>
                            <ul style={ { "list-style-type": "none" } }>
                                <li><img src={ this.state.profileImagePath } style={ { "border": "1px solid black" } } width="200px" height="90%" alt="" /></li>
                                <li><h2>{ this.state.name }</h2></li>
                                <li>{ this.state.location }</li>
                                <li>{ this.state.description }</li>

                            </ul>

                            <ul style={ { "list-style-type": "none", "padding-top": '80px' } }>
                                <li><h5>Contact Details:</h5></li>
                                <li><b>Mail at:</b> { this.state.email }</li>
                                <li><b>Call at:</b> { this.state.contact }</li>
                                <li><b>We are OPEN:</b> { this.state.timing }</li>

                            </ul>


                        </div>
                        <div className="col-9" style={ { "padding-left": "40px" } }>
                            <div className="row" style={ { "padding-left": "40px" } }>
                                <h3>Here's What We Offer</h3>
                            </div>
                            <div className="row" style={ { "padding-left": "20px" } }>
                                <div style={ {
                                    "width": "auto",
                                    "overflow": "auto",
                                    "white-space": "nowrap",
                                    "height": "200px"
                                } }>
                                    { displayDishImages }
                                </div>
                            </div>
                            {/* Display dishes */ }
                            <div className="row">
                                <div className="dishes">
                                    <GetDishes type="users" restaurantID={ this.props.match.params.restaurantID } displayDishes={ this.displayImageStore } />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


            </div >
        )

    }

}

export default RestaurantProfile
