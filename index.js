var webdriverio = require( 'webdriverio' ),
	assert = require( 'assert' ),
	url = require( 'url' );

var config = require( './config' );

var client = {};

describe( 'Logging into WordPress.com', function() {
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
				assert( undefined === err, 'loginform exists' );
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
} );

describe( 'Logging into self-hosted site', function() {
	it( 'login form exists and user can log in', function( done ) {
		client
			.url( url.resolve( config.jetpackSite.url, '/wp-admin' ) )
			.waitFor( '#loginform', 2000, function( err ) {
				assert( undefined === err, 'loginform exists' );
			} )
			.setValue( '#user_login', config.jetpackSite.username, function( err ) {
				assert( undefined === err, 'there was not an error filling in the username' );
			} )
			.setValue( '#user_pass', config.jetpackSite.password, function( err ) {
				assert( undefined === err, 'there was not an error filling in the password' );
			} )
			.submitForm( '#loginform' )
			.waitFor( '.wp-admin', 2000, function( err ) {
				assert( undefined === err, 'login was successful' );
			} )
			.call( done );
	} );
} );

describe( 'Logging out of WordPress.com', function() {
	this.timeout( 99999999 );

	it( 'sign out button should exist on /me sidebar', function( done ) {
		client
			.url( 'https://wordpress.com/me' )
			.waitFor( '.me-sidebar__menu__signout', 2000, function( err ) {
				assert( undefined === err, 'the sign out button exists in the /me sidebar' );
			} )
			.call( done );
	} );

	it( 'user should be signed out after clicking the /me sign out button', function( done ) {
		client
			.click( '.me-sidebar__menu__signout', function( err ) {
				assert( undefined === err, 'there was not an error clicking the sign out button' );
			} )
			.waitFor( '.click-wpcom-login', 2000, function( err ) {
				assert( undefined === err, 'the login button exists' );
			} )
			.call( done );
	} );

	after( function( done ) {
		client.end( done );
	} );
} );
