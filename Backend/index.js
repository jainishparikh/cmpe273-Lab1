const PORT = 3001;

var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mysql = require( './config/db_config' );
var path = require( 'path' )
var app = express();
var user = require( './user/routes' )
var restaurant = require( './restaurant/routes' )
var session = require( "express-session" );
var cookieParser = require( "cookie-parser" );
var multer = require( 'multer' );
var cors = require( 'cors' );


//Session management

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( 'public' ) )
app.use( cors( { origin: "http://localhost:3000", credentials: true } ) );
app.use(
    session( {
        key: 'user_sid',
        secret: "cmpe_273_lab1",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000
        }
    } )
);

//image storage
const storage = multer.diskStorage( {
    destination: './public/images/profilepics/',
    filename: function ( req, file, cb ) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname( file.originalname )
        )
    }
} )

const upload = multer( {
    storage: storage
} ).single( 'myImage' )

app.set( "upload", upload );

//APIs

//routes
app.use( '/users', user );
app.use( '/restaurants', restaurant );


//get index page
app.get( '/', ( req, res ) => {
    res.send( 'Welcome to yelp' );
} );

//starting the server
app.listen( PORT, () => {
    console.log( "Server listening on port: ", PORT );
} );


