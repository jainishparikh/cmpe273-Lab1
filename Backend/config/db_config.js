var mysql = require( 'mysql' )

var connection = mysql.createConnection( {
    host: 'cmpe-273-lab1.ctugnikkreqp.us-east-1.rds.amazonaws.com',
    user: 'cmpe_273',
    password: 'cmpe_273',
    database: 'cmpe-273-lab1'
} )

var pool = mysql.createPool( {
    host: 'cmpe-273-lab1.ctugnikkreqp.us-east-1.rds.amazonaws.com',
    user: 'cmpe_273',
    password: 'cmpe_273',
    database: 'cmpe-273-lab1',
    connectionLimit: 10
} )

//establishing connecting to database
connection.connect( ( error ) => {
    if ( error ) {
        return console.log( "Connection Failed" );
    }
    console.log( "Connection to mysql Successful" );
} );

module.exports = {
    connection: pool
}