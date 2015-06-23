/**
 * External dependencies
 */
var webdriverio = require( 'webdriverio' ),
	assert = require( 'assert' ),
	url = require( 'url' );

/**
 * Internal dependencies
 */
var config = require( '../config' ),
	utils = require( 'lib/utils' );

var client = {};

describe( 'Toggle actions', function() {
	this.timeout( 99999999 );

	before( function( done ) {
		client = webdriverio.remote( {
			desiredCapabilities: { browserName: 'chrome' }
		} );
		client.init();
		utils.wpcomLogin( client, config.username, config.password, function() {
			done();
		} );
	} );

	it( 'toggles do not exist on all sites plugin list', function( done ) {
		client
			.url( 'https://wordpress.com/plugins' )
			.waitFor( '.plugin-item__actions', 2000, function( err ) {
				assert( err, 'plugin actions do not exist' );
			} )
			.call( done );
	} );

	it( 'toggles exist on single site plugin list', function( done ) {
		var siteSlug = url.parse( config.jetpackSite.url ).host;
		client
			.url( url.resolve( 'https://wordpress.com', 'plugins/' + siteSlug ) )
			.waitFor( '.plugin-item__actions', 2000, function( err ) {
				assert( undefined === err, 'plugin actions do exist' );
			} )
			.call( done );
	} );

	after( function( done ) {
		utils.wpcomLogout( client, function() {
			client.end( done );
		} );
	} );
} );
