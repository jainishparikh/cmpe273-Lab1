var mysql = require( 'mysql' )

var connection = mysql.createConnection( {
    host: 'localhost',
    user: 'jainish',
    password: 'jainish',
    database: 'cmpe-273-lab1'
} )

//establishing connecting to database
connection.connect( ( error ) => {
    if ( error ) {
        return console.log( "Connection Failed" );
    }
    console.log( "Connection to mysql Successful" );
} );

module.exports = {
    connection: connection
}