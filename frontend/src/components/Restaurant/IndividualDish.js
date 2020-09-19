import React, { Component } from 'react'
import AddDishes from './AddDishes';
import Modal from 'react-modal';

export class IndividualDish extends Component {
    constructor( props ) {
        super( props );
        this.backend_url = "http://localhost:3001"
        this.state = {
            dishID: this.props.dishData.dishID,
            dishName: this.props.dishData.dishName,
            dishIngrediants: this.props.dishData.dishIngrediants,
            dishPrice: this.props.dishData.dishPrice,
            dishDescription: this.props.dishData.dishDescription,
            dishCategory: this.props.dishData.dishCategory,
            dishPicture: this.props.dishData.dishPicture,
            dishPopUp: false
        }
    }

    toggleDishPopUp = ( e ) => {
        this.setState( {
            dishPopUp: !this.state.dishPopUp
        } )
    }

    displayPicture = ( name ) => {
        var dishImagePath = this.backend_url + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="100%" height="100%" alt="" />

        )
    }

    render () {



        return (
            <div>
                <tr>
                    <td >{ this.displayPicture( this.state.dishPicture ) }</td>
                    <td>{ this.state.dishName }</td>
                    <td>{ this.state.dishPrice }</td>
                    <td>{ this.state.dishCategory }</td>
                    <td>{ this.state.dishIngrediants }</td>
                    <td>{ this.state.dishDescription }</td>
                    <td>
                        <div className="edit-dish" >
                            <button className="btn btn-primary" onClick={ this.toggleDishPopUp }>Edit Dish</button>
                        </div>
                        {/* using react-modal for popup to add dish */ }
                        <Modal isOpen={ this.state.dishPopUp } >
                            <AddDishes call="edit" dishData={ this.state } closePopUp={ this.toggleDishPopUp } />
                        </Modal>

                    </td>
                </tr>
            </div>
        )
    }
}


export default IndividualDish

