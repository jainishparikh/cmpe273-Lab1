import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import Modal from 'react-modal';
import axios from 'axios';
import AddDish from './AddDishes';
import GetDishes from './GetDishes';
import BACKEND_URL from '../../config/config';

export class RestaurantAbout extends Component {
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
            dishPopUp: false
        }

    }
    componentDidMount () {
        let email = cookie.load( "email" )
        axios.get( BACKEND_URL + '/restaurants/about/' + email ).then( ( response ) => {
            console.log( response )
            if ( response.status === 200 ) {
                console.log( "got data" )
                this.setState( {
                    restaurantID: response.data.restaurantID,
                    name: response.data.name,
                    email: response.data.email,
                    contact: response.data.contact,
                    location: response.data.location,
                    description: response.data.description,
                    timing: response.data.timing
                } )
            }

        } ).catch( ( err ) => {
            console.log( " error getting restaurant data" )
            this.setState( {
                error: true
            } )

        } );
    }

    toggleDishPopUp = ( e ) => {
        this.setState( {
            dishPopUp: !this.state.dishPopUp
        } )
    }


    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            < div >
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row h-100">
                        <div className="col-3">
                            <div className="profile-info" style={ { height: "70%" } }>
                                <table style={ { height: "100%" } }>
                                    <tbody>
                                        <div className="restaurant-info" style={ { height: "60%" } }>
                                            <tr>{ this.state.name }</tr>
                                            <tr>{ this.state.location }</tr>
                                            <tr>{ this.state.description }</tr>
                                        </div>
                                        <div className="rstaurant-contact" style={ { height: "40%" } }>
                                            <tr>Contact Detals:</tr>
                                            <tr>{ this.state.contact }</tr>
                                            <tr>{ this.state.email }</tr>
                                            <tr>{ this.state.timing }</tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <div className="profile-edit" style={ { height: "30%" } }>
                                <Link className="btn btn-primary" to={ {
                                    pathname: "/restaurants/editprofile", state: {
                                        userData: this.state
                                    }
                                } }>Edit Profile</Link>
                            </div>
                        </div>
                        <div className="col-9">
                            {/* Add dish */ }
                            <div className="row mb-3">

                                <div className="add-dish m-2" >
                                    <button className="btn btn-primary" onClick={ this.toggleDishPopUp }>Add Dish</button>
                                </div>
                                {/* using react-modal for popup to add dish */ }
                                <Modal isOpen={ this.state.dishPopUp } style={ {
                                    overlay: {
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)'
                                    },
                                    content: {
                                        position: 'relative',
                                        top: '20%',
                                        left: '20%',
                                        right: '20%',
                                        bottom: '20%',
                                        border: '2px solid #ccc',
                                        background: '#fff',
                                        overflow: 'auto',
                                        WebkitOverflowScrolling: 'touch',
                                        borderRadius: '4px',
                                        outline: 'none',
                                        padding: '20px'
                                    }
                                } } >
                                    <AddDish call="add" closePopUp={ this.toggleDishPopUp } />
                                </Modal>



                            </div>
                            {/* Display dishes */ }
                            <div className="row">
                                <div className="dishes">
                                    <GetDishes />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div >
        )

    }
}

export default RestaurantAbout
