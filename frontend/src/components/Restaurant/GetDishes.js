import React, { Component } from 'react'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';
import IndividualDish from './IndividualDish'

export class GetDishes extends Component {
    constructor( props ) {
        super( props )
        this.backend_url = "http://localhost:3001"
        this.state = {
            Dishes: [],
            dishPopUp: false
        }
    }
    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }

    componentDidMount () {
        var restaurantID = cookie.load( "id" );
        axios.get( this.backend_url + "/restaurants/dishes/" + restaurantID ).then( response => {
            if ( response.status === 200 ) {
                response.data.map( ( dish ) => {
                    this.setState( {
                        Dishes: [ ...this.state.Dishes, dish ]
                    } )

                } )
                console.log( this.state )

            }
        } ).catch( err => {
            console.log( "Error in getting dishes" + err );
        } )


    }
    displayPicture = ( name ) => {
        var dishImagePath = this.backend_url + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="102%" height="100%" alt="" />

        )
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
        let details = this.state.Dishes.map( ( dish ) => {
            return (
                <IndividualDish dishData={ dish } />
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="container">
                    <table>
                        <thead></thead>
                        <tbody>
                            { details }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default GetDishes