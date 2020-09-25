import React, { Component } from 'react'

export class IndividualDish extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            reviewID: this.props.reviewData.reviewID,
            userID: this.props.reviewData.FK_reviews_users,
            reviewerName: this.props.reviewData.reviewerName,
            restaurantID: this.props.reviewData.FK_reviews_restaurants,
            restaurantName: this.props.reviewData.restaurantName,
            reviewText: this.props.reviewData.reviewText,
            date: this.props.reviewData.date,
            ratings: this.props.reviewData.ratings,
            headline: this.props.reviewData.headline,

        }
    }

    render () {



        return (
            <div >
                <table>
                    <tbody>
                        <tr>
                            <td ><h4>{ this.state.headline }</h4></td>

                            <td><h6>{ this.state.date }</h6></td>
                        </tr>
                        <tr><td>
                            { this.state.ratings }
                        </td>
                        </tr>
                        <tr><td>
                            { this.state.reviewText }
                        </td>
                            <td> - <h6>{ this.state.reviewerName }</h6></td></tr>
                    </tbody>
                </table>
            </div>
        )
        var divStyle = {
            h6: {
                "text-align": "right"
            }
        }
        var tableStyle = {
            width: "100%",
            border: "1px solis black"
        }
    }

}


export default IndividualDish

