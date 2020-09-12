var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var connection = require( '../config/db_config' ).connection;

//signup
router.post( '/signup', ( req, res ) => {

    var name = req.body.name;
    var email = req.body.email
    var password = req.body.password


    bcrypt.hash( password, 10, ( err, hash ) => {
        var sql = `insert into users(name,email,password) values(?,?,?)`;
        var values = [ name, email, hash ];
        connection.query( sql, values, ( err, results, fields ) => {
            if ( err ) {
                console.log( err );
                res.status( 400 ).end( 'Error' )
            } else {
                res.writeHead( 200, {
                    "Content-Type": "text/plain"
                } );
                res.end( "User signup successful" );
            }

        } );


    } );


} );


//login
router.post( '/login', ( req, res ) => {
    var email = req.body.email
    var password = req.body.password
    var type = req.body.type


    var sql = `select id,name,email,password from ${ type } where email="${ email }"`;

    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
        } else {
            if ( results.length > 0 ) {
                if ( bcrypt.compareSync( password, results[ 0 ].password ) ) {
                    console.log( results[ 0 ] )
                    userdata = {
                        id: results[ 0 ].id,
                        name: results[ 0 ].name,
                        email: results[ 0 ].email
                    }
                    req.session.user = email;
                    res.status( 200 ).send( JSON.stringify( userdata ) );
                } else {
                    res.status( 400 ).end( "Invalid Credentials" );
                }

            } else {
                res.status( 400 ).end( "User Not found" );
            }
        }
    } );

} );


// //about
// router.post( '/about/:email', ( req, res ) => {
//     var email = req.params.email

//     var sql = `update users set `;
//     Object.keys( req.body ).forEach( key => {
//         if ( req.body[ key ] != '' && key != 'radio' && key != 'password' ) {
//             // values[ key ] = req.body[ key ];
//             sql += key + '=' + req.body[ key ] + ',';
//         }
//     } )
//     sql = sql.slice( 0, -1 );
//     sql += ` where email=${ email }`;
//     // var values = [ email = new_email, nickName = nickName, contactNumber = contactNumber, dateOfBirth = dateOfBirth, city = city, state = state, country = country, headline = headline, yelpingSince = yelpingSince ]
//     connection.query( sql, ( err, results ) => {
//         if ( err ) {
//             console.log( err );
//             res.end( "Error:", err );
//         } else {
//             res.status( 200 ).end( "Update Successfull" );
//         }

//     } );
// } );

module.exports = router;