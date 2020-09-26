import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../../../config/config'

export class EventRegistrations extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Attendees: [],
            eventID: this.props.eventData.eventID,
        }
    }
    componentDidMount () {
        var eventID = this.state.eventID
        axios.get( BACKEND_URL + '/events/attendees/' + eventID ).then( response => {
            response.data.map( ( attendee ) => {
                this.setState( {
                    Attendees: [ ...this.state.Attendees, attendee ]
                } )

            } )
            console.log( this.state )

        } ).catch( error => {
            console.log( "Error getting attendees for an event" )
        } )
    }
    render () {
        let details = this.state.Attendees.map( ( attendee ) => {

            return (
                <tr>
                    <td>{ attendee.userName }</td>
                    <td>{ attendee.userEmail }</td>
                    <Link className="btn btn-primary" to={ `/restaurants/userprofiles/${ attendee.userEmail }` } >
                        View Profile
                    </Link>
                </tr>
            )
        } )
        return (
            <div>
                <div className="container">
                    <div className="details">
                        <table>
                            <tbody>
                                { details }
                            </tbody>
                        </table>

                    </div>
                    <div className="row mt-5">
                        <div className="col-3">
                            <button className="btn btn-danger" onClick={ this.props.closePopUp }>Back</button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default EventRegistrations
