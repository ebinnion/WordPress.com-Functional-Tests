var webdriverio = require( 'webdriverio' ),
	assert = require( 'assert' );

var config = require( './config' );

describe( 'Logging into WordPress.com', function() {
	var client = {};
	this.timeout( 99999999 );

	before( function( done ) {
		client = webdriverio.remote( {
			desiredCapabilities: { browserName: 'chrome' }
		} );

		client.init( done );
	} );

	it( 'login button exists when user not logged in', function( done ) {
		client
			.url( 'https://wordpress.com' )
			.click( '.click-wpcom-login', function( err ) {
				assert( undefined === err, 'there was not an error clicking the login button' );
			} )
			.call( done );
	} );

	it( 'login form exists and user can log in', function( done ) {
		client
			.waitFor( '#loginform', 2000, function( err ) {
				assert( undefined === err, 'loginform is visible' );
			} )
			.setValue( '#user_login', config.username, function( err ) {
				assert( undefined === err, 'there was not an error filling in the username' );
			} )
			.setValue( '#user_pass', config.password, function( err ) {
				assert( undefined === err, 'there was not an error filling in the password' );
			} )
			.submitForm( '#loginform' )
			.waitFor( 'ul.menu-right li.me a', 2000, function( err ) {
				assert( undefined === err, 'login was successful' );
			} )
			.call( done );
	} );

	after( function( done ) {
		client.end( done );
	} );
} );
