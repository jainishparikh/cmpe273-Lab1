var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var connection = require( '../config/db_config' ).connection;

//signup
router.post( '/signup', ( req, res ) => {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var location = req.body.location;


    bcrypt.hash( password, 10, ( err, hash ) => {
        var sql = `insert into restaurants(name,email,password,location) values(?,?,?,?)`;
        var values = [ name, email, hash, location ];
        connection.query( sql, values, ( err, results, fields ) => {
            if ( err ) {
                console.log( err );
                res.status( 400 ).send( 'Error' )
            } else {
                console.log( "RSS" )
                res.status( 200 ).send( "Restaurant signup successful" );
            }

        } );


    } );


} );


//login
router.post( '/login', ( req, res ) => {
    var email = req.body.email
    var password = req.body.password
    var type = req.body.type


    var sql = `select restaurantID,name,email,password from ${ type } where email="${ email }"`;

    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
        } else {
            if ( results.length > 0 ) {
                if ( bcrypt.compareSync( password, results[ 0 ].password ) ) {
                    console.log( results[ 0 ] )
                    restaurantData = {
                        id: results[ 0 ].restaurantID,
                        name: results[ 0 ].name,
                        email: results[ 0 ].email
                    }
                    req.session.user = email;
                    res.status( 200 ).send( JSON.stringify( restaurantData ) );
                } else {
                    res.status( 400 ).end( "Invalid Credentials" );
                }

            } else {
                res.status( 400 ).end( "Restaurant Not found" );
            }
        }
    } );

} );


//get about
router.get( '/about', ( req, res ) => {
    var email = req.body.email;
    var sql = `select * from restaurants where email="${ email }"`;
    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.end( "Error:", err );
        } else {
            res.status( 200 ).send( JSON.stringify( results[ 0 ] ) );
        }

    } );
} );

//update restaurants about
router.put( '/about', ( req, res ) => {
    var restaurantID = req.body.restaurantID;
    var name = req.body.name;
    var email = req.body.email;
    var location = req.body.location;
    var description = req.body.description;
    var contact = req.body.contact;
    var timing = req.body.timing;

    var sql = `update restaurants set email=?,name=?,location=?,description=?,contact=?,timing=? where restaurantID=${ restaurantID }`;
    var values = [ email, name, location, description, contact, timing ]
    connection.query( sql, values, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.end( "Error:", err );
        } else {
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} );



//get dishes
router.get( '/dishes', ( req, res ) => {
    var restaurantID = req.body.restaurantID;
    var sql = `select * from dishes where FK_dishes_restaurants="${ restaurantID }"`;
    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.end( "Error:", err );
        } else {
            // Object.keys(results).forEach((dish)=>{

            // })
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} );

//add dishes
router.post( '/dishes', ( req, res ) => {
    var restaurantID = req.body.restaurantID;
    var name = req.body.dishName;
    var ingrediants = req.body.ingrediants;
    var price = req.body.price;
    var description = req.body.description;
    var category = req.body.category;

    var sql = `insert into dishes(FK_dishes_restaurants,dishName, dishIngrediants,dishPrice,dishDescription,dishCategory) values(?,?,?,?,?,?)`;
    var values = [ restaurantID, name, ingrediants, price, description, category ]
    connection.query( sql, values, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.end( "Error:", err );
        } else {
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} );

//update dish
router.put( '/dishes', ( req, res ) => {
    var dishID = req.body.dishID;
    var name = req.body.dishName;
    var ingrediants = req.body.ingrediants;
    var price = req.body.price;
    var description = req.body.description;
    var category = req.body.category;

    var sql = `UPDATE dishes SET dishName=? , dishIngrediants=? ,dishPrice=? ,dishDescription=?, dishCategory=? where dishID=${ dishID }`;
    var values = [ name, ingrediants, price, description, category ]
    connection.query( sql, values, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.end( "Error:", err );
        } else {
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} );


module.exports = router;
