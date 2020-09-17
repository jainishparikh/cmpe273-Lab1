import React, { Component } from 'react'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

export class Reviews extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            userID: "",
            restaurantID: "",
            reviewText: "",
        }
    }
    componentDidMount () {

    }
    render () {
        var redirectVar = ""
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                { redirectVar }


            </div>
        )
    }
}

export default Reviews
