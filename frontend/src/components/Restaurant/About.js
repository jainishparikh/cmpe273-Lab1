import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import axios from 'axios';

export class RestaurantAbout extends Component {
    constructor( props ) {
        super( props )
        this.backend_url = "http://localhost:3001"
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
    componentDidMount () {
        let email = cookie.load( "email" )
        axios.get( this.backend_url + '/restaurants/about/' + email ).then( ( response ) => {
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


    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (

            < div >
                { redirectVar }
                <div className="container-fluid ml-1" style={ { height: "100vh" } }>

                    <Link className="btn btn-primary" to={ {
                        pathname: "/restaurants/editprofile", state: {
                            userData: this.state
                        }
                    } }>Edit Profile</Link>

                </div>


            </div >
        )
    }
}

export default RestaurantAbout
