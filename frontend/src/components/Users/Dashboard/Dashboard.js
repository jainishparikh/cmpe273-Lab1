import React, { Component } from 'react'
import { Redirect } from 'react-router'
import cookie from "react-cookies";
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import IndividualRestaurant from './IndividualRestaurant';


export class Dashboard extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Restaurants: [],
            searchInput: ""

        }
    }

    componentDidMount () {
        // getting all restaurants
        axios.get( BACKEND_URL + '/restaurants/all' ).then( response => {
            console.log( "got all restaurants", response.data )
            response.data.map( ( restaurant ) => {
                this.setState( {
                    Restaurants: [ ...this.state.Restaurants, restaurant ],
                    searchInput: ""
                } )

            } )
            console.log( this.state )

        } ).catch( error => {
            console.log( "Error in fetching restaurants : ", error );
        } )


    }

    handleSearch = ( e ) => {
        console.log( e.target.name, e.target.value )
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }


    render () {
        if ( !cookie.load( 'auth' ) ) {
            return <Redirect to='/login' />
        }
        let filteredRestaurants = this.state.Restaurants.filter( ( restaurant ) => {
            return restaurant.name.toLowerCase().includes( this.state.searchInput.toLowerCase() )
        } )

        let restaurants = filteredRestaurants.map( restaurant => {
            return (
                <IndividualRestaurant restaurantData={ restaurant } />
            )
        } )
        return (

            <div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-7 m-4">
                        <input type="text" style={ { "width": "700px" } } name="searchInput" onChange={ this.handleSearch } placeholder="Search Restaurants"></input>
                    </div>
                    <div className="col-3"></div>

                </div>
                <div className="row mt-2">
                    <div className="col-2">Filters</div>
                    <div className="col-7">
                        { restaurants }
                    </div>
                    <div className="col-3">Map</div>

                </div>
            </div>
        )
    }
}

export default Dashboard
