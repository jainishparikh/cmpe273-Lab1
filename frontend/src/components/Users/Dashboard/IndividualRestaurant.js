import React, { Component } from 'react'
import BACKEND_URL from '../../../config/config'
import profile_picture from '../../../images/restaurant.jpeg'
import { Link } from 'react-router-dom';


export class IndividualRestaurant extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            profileImagePath: profile_picture,
        }
    }

    displayPicture = ( name ) => {
        if ( name === null || name === "" ) {
            var restaurantImagePath = profile_picture
        } else {
            var restaurantImagePath = BACKEND_URL + "/images/profilepics/" + name
        }
        return (

            <img src={ restaurantImagePath } width="200px" height="180px" alt="" />

        )
    }

    render () {
        return (
            <div>
                <div className="row p-1 m-2" style={ { "width": "100%", "height": "200px", "border": "1px gray solid" } }>
                    <div className="col-4">
                        { this.displayPicture( this.props.restaurantData.profilePicture ) }
                    </div>
                    <div className='col-6'>
                        <div className='row'><h3>{ this.props.restaurantData.name }</h3></div>
                        <div className='row'>{ this.props.restaurantData.location }</div>
                        <div className='row'>{ this.props.restaurantData.description }</div>
                        <div className='row'>{ this.props.restaurantData.timing }</div>
                    </div>
                    <div className="col-2">
                        <Link className="btn btn-primary" to={ `/users/restaurantprofiles/${ this.props.restaurantData.email }/${ this.props.restaurantData.restaurantID }` } >
                            View Restaurant
                    </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default IndividualRestaurant
