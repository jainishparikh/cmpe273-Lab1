import React, { Component } from 'react'
import { Redirect } from 'react-router'
import cookie from "react-cookies";
export class Home extends Component {
    render () {
        if ( !cookie.load( 'auth' ) ) {
            return <Redirect to='/login' />
        }
        return (

            <div>
                Welcome to Home!!
            </div>
        )
    }
}

export default Home
