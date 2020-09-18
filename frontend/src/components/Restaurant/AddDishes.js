import React, { Component } from 'react'
import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';

export class AddDishes extends Component {
    constructor( props ) {
        super( props )
        this.backend_url = "http://localhost:3001"
        this.state = {
            dishID: "",
            dishName: "",
            dishIngrediants: "",
            dishpPrice: "",
            dishDescription: "",
            dishCategory: "",
        }
    }

    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }

    handleOnSubmit_AddDish = sub => {
        sub.preventDefault();
        var dishData = {
            restaurantID: cookie.load( 'id' ),
            dishName: this.state.dishName,
            dishIngrediants: this.state.dishIngrediants,
            dishPrice: this.state.dishPrice,
            dishDescription: this.state.dishDescription,
            dishCategory: this.state.dishCategory

        }
        axios
            .post( this.backend_url + "/restaurants/dishes", dishData ).then( response => {
                if ( response.status === 200 ) {
                    console.log( "dish successfully added" + response.data );
                    this.props.closePopUp();
                }
            } ).catch( err => {
                console.log( "Error in adding dish" );
            } )
    }

    handleOnSubmit_EditDish = sub => {
        // sub.preventDefault();
        // var dishData = {
        //     restaurantID: cookie.load( 'id' ),
        //     dishName: this.state.dishName,
        //     dishIngrediants: this.state.dishIngrediants,
        //     dishPrice: this.state.dishPrice,
        //     dishDescription: this.state.dishDescription,
        //     dishCategory: this.state.dishCategory

        // }
        // axios
        //     .post( this.backend_url + "/restaurants/dishes", dishData ).then( response => {
        //         if ( response.status === 200 ) {
        //             console.log( "dish successfully added" + response.data );
        //             this.props.closePopUp();
        //         }
        //     } ).catch( err => {
        //         console.log( "Error in adding dish" );
        //     } )
    }

    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                { redirectVar }

                <div className="container">
                    <form onSubmit={ this.handleOnSubmit_AddDish }>
                        <div className="row">
                            Provide Dish Details here:
                        </div>
                        <div className="row mt-5">
                            <div className="col-5">
                                Dish Name: <input type="text" className="form-control" name="dishName"
                                    placeholder={ this.state.dishName } onChange={ this.handleInputChange } />
                            </div>
                            <div className="col-5">
                                Dish Price: <input type="text" className="form-control" name="dishPrice"
                                    placeholder={ this.state.dishPrice } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10">
                                Category:<input type="text" className="form-control" name="dishCategory"
                                    placeholder={ this.state.dishCategory } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10">
                                Description: <input type="text" className="form-control" name="dishDescription"
                                    placeholder={ this.state.dishDescription } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10">
                                Ingrediants: <input type="text" className="form-control" name="dishIngrediants"
                                    placeholder={ this.state.dishIngrediants } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-5">
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                            <div className="col-5">
                                <button className="btn btn-danger" onClick={ this.props.closePopUp }>Cancel</button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default AddDishes
