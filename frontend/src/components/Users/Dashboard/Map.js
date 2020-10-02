import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Maps extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            center: {
                lat: 37.77,
                lng: 238.41,
            },
            locations: []
        }

    }




    render () {
        let data = this.props.restaurantData.map( restaurant => {
            console.log( "restaurant", restaurant.name )

            return (
                <Marker name={ restaurant.name } position={ { lat: lat, lng: lng } } />
            )

        } )

        return (
            <div style={ { "margin-top": "20px", height: '70vh', width: '80%', "border": "1px solid gray" } }>
                <Map
                    google={ this.props.google }
                    zoom={ 9 }
                    className={ 'map' }
                    initialCenter={ { lat: 37.77, lng: 238.41 } }

                >
                    { data }
                </Map>
            </div>
        )
    }
}



export default GoogleApiWrapper( {
    apiKey: "AIzaSyCQYNrspA9KMomMhP23bp6Qlmk7ZPK9eA4"
} )( Maps )
