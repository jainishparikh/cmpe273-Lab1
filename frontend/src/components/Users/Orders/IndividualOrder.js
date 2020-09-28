import React, { Component } from 'react'
import OrderDetails from './OrderDetails';
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import Modal from 'react-modal';
import profile_picture from '../../../images/restaurant.jpeg'


export class IndividualOrder extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            detailsPopUp: false,
            restaurantData: {},
            cancelled: false
        }
    }

    componentDidMount () {
        var restaurantID = this.props.orderData.ref_restaurantID
        axios.get( BACKEND_URL + '/restaurants/aboutbyID/' + restaurantID ).then( response => {
            this.setState( {
                restaurantData: response.data
            } )

        } ).catch( error => {
            console.log( "Erron in fetching restaurant data", error )
        } )
    }

    toggleDetailsPopUp = ( e ) => {
        this.setState( {
            detailsPopUp: !this.state.detailsPopUp
        } )
    }

    displayPicture = ( name ) => {
        if ( name === null || name === "" ) {
            var restaurantImagePath = profile_picture
        } else {
            var restaurantImagePath = BACKEND_URL + "/images/profilepics/" + name
        }
        return (

            <img src={ restaurantImagePath } width="200px" height="185px" alt="" />

        )
    }
    cancelOrder = () => {
        var orderID = this.props.orderData.orderID
        var data = {
            orderStatus: 'Cancel'
        }
        console.log( orderID )
        axios.put( BACKEND_URL + '/orders/users/cancel/' + orderID, data ).then( response => {
            this.setState( {
                cancelled: true
            } )
            console.log( "Updated and Canceled" )

        } ).catch( error => {
            console.log( "Error in updating status: ", error )
        } )
    }

    render () {
        let cancel = null;
        if ( this.props.orderData.cancelled === 'No' ) {

            cancel = <button className="btn btn-danger " onClick={ this.cancelOrder }>Cancel Order </button>

        } else {
            cancel = <button className="btn btn-danger " >Order Cancelled </button>
        }

        return (
            <div style={ { "padding-top": "20px" } }>
                <div className="row  m-2" style={ { "width": "100%", "height": "235px", "border": "1px gray solid" } }>
                    <div className="col-4" style={ { "padding": "0px" } }>
                        { this.displayPicture( this.state.restaurantData.profilePicture ) }
                    </div>
                    <div className='col-5'>

                        <ul style={ { "list-style-type": "none", "padding-left": "0px" } }>
                            <li><h2>{ this.state.restaurantData.name }</h2></li>
                            <li>{ this.state.restaurantData.description }</li>
                            <li>{ this.state.restaurantData.location }</li>
                            <li>{ this.state.restaurantData.contact }</li>
                            <li style={ { "margin-top": "78px" } }>
                                { cancel }
                            </li>

                        </ul>

                    </div>
                    <div className="col-3" style={ { "padding-right": "0px" } }>
                        <ul style={ { "list-style-type": "none" } }>
                            <li><h6>OrderID:</h6>{ this.props.orderData.orderID }</li>
                            <li><h5>Order Status:</h5></li>
                            <li>{ this.props.orderData.orderStatus }</li>
                            <li>&nbsp;</li>
                            <li><h5>Delivery Type:</h5></li>
                            <li>{ this.props.orderData.orderMethod }</li>
                            <li >
                                <div className="view-details mt-2" >
                                    <button className="btn btn-danger btn-block" onClick={ this.toggleDetailsPopUp }>View Details  &rarr; </button>
                                </div>
                                {/* using react-modal for popup to add dish */ }
                                <Modal isOpen={ this.state.detailsPopUp } style={ {
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
                                    <OrderDetails orderData={ this.props.orderData.orderID } closePopUp={ this.toggleDetailsPopUp } />
                                </Modal>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

export default IndividualOrder
