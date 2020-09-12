import React, { Component } from 'react';
import axios from 'axios';
export class Signup extends Component {
    constructor( props ) {
        super( props );
        this.backend_url = "http://localhost:3001";
        this.state = {
            type: '',
            name: '',
            email: '',
            password: '',
            error: false
        }
    }
    //handle input change
    handleInputChange = inp => {
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }


    //handle submit
    handleSubmit = sub => {
        sub.preventDefault();

        console.log( this.state );

        if ( this.state.type === 'user' ) {
            axios
                .post( this.backend_url + '/user/signup', this.state )
                .then( ( response ) => {
                    if ( response.status === 200 ) {
                        window.location.load( '/login' )
                    }

                } )
                .catch( ( err ) => {
                    this.setState( {
                        error: true
                    } )

                } );
        } else if ( this.state.type === 'restaurant' ) {
            axios
                .post( this.backend_url + '/restaurant/signup', this.state )
                .then( ( response ) => {
                    if ( response.status === 200 ) {
                        window.location.load( '/login' )
                    }

                } )
                .catch( ( err ) => {
                    this.setState( {
                        error: true
                    } )

                } );
        }
    };

    renderError = () => {
        if ( this.state.error ) {
            return (
                <div>
                    <h5>"User with this email already exist"</h5>
                </div>
            )
        }
    }

    render () {

        return (
            <div>
                { this.renderError() }
                <form onSubmit={ this.handleSubmit } id="Signup">
                    <div className="role" >
                        <input type="radio" id='radio-b1' name="type" value='users' onChange={ this.handleInputChange }
                        />
                        <label>User</label>
                        <input type="radio" id='radio-b2' name="type" value='restaurants' onChange={ this.handleInputChange }
                        />
                        <label>Restaurant</label>

                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" name="name" autoFocus required
                            placeholder="Enter Name" onChange={ this.handleInputChange } />

                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="email" required
                            placeholder="Enter Email" onChange={ this.handleInputChange } />

                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" required
                            placeholder="Enter Password" onChange={ this.handleInputChange } />
                    </div>
                    <div className="form-group">
                        { this.state.type === 'restaurants' ? <input type="text" className="form-control" name="location" required
                            placeholder="Enter location" onChange={ this.handleInputChange } /> : undefined }
                    </div>
                    <button type="submit" className="btn btn-primary" onSubmit={ this.handleSubmit }>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup
