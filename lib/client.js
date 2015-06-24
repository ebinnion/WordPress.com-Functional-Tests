/*
 * External dependencies
 */
var urls = require( 'url' ),
	webdriverio = require( 'webdriverio' );

var client = webdriverio.remote( {
	desiredCapabilities: { browserName: 'chrome' }
} );

client.addCommand( 'wpcomLogin', function( username, password ) {
	var callback = arguments[ arguments.length - 1 ];
	this
		.url( 'https://wordpress.com/wp-login.php?redirect_to=https%3A%2F%2Fwordpress.com%2F' )
		.setValue( '#user_login', username )
		.setValue( '#user_pass', password )
		.submitForm( '#loginform' )
		.call( callback );
} );

client.addCommand( 'wpcomLogout', function() {
	var callback = arguments[ arguments.length - 1 ];
	this
		.url( 'https://wordpress.com/me' )
		.waitFor( '.me-sidebar__menu__signout', 2000 )
		.click( '.me-sidebar__menu__signout' )
		.call( callback );
} );

client.addCommand( 'selfHostedLogin', function( url, username, password ) {
	var callback = ( arguments.length ) ? arguments[ arguments.length - 1 ] : false;
	this
		.url( urls.resolve( url, '/wp-admin' ) )
		.setValue( '#user_login', username )
		.setValue( '#user_pass', password )
		.submitForm( '#loginform' )
		.call( callback );
} );

client.init();

module.exports = client;
