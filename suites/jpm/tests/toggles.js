/**
 * External dependencies
 */
var assert = require( 'assert' ),
	url = require( 'url' );

/**
 * Internal dependencies
 */
var config = require( '../config' ),
	client = require( 'lib/client' );

describe( 'Toggle actions', function() {
	this.timeout( 99999999 );

	before( function( done ) {
		client
			.wpcomLogin( config.username, config.password )
			.selfHostedLogin(
				config.jetpackSite.url,
				config.jetpackSite.username,
				config.jetpackSite.password,
				done
			);
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

	it( 'test akismet is initially deactivated', function( done ) {
		client
			.url( url.resolve( config.jetpackSite.url, '/wp-admin/plugins.php' ) )
			.waitFor( '.akismet_activate', 6000, function( err ) {
				assert( undefined !== err, 'akismet is deactivated' );
			} )
			.call( done );
	} );

	it( 'toggles function correctly', function( done ) {
		var siteSlug = url.parse( config.jetpackSite.url ).host;

		client
			.url( url.resolve( 'https://wordpress.com', 'plugins/' + siteSlug ) )
			.waitFor( '.plugin-item__actions', 10000, function( err ) {
				assert( undefined === err, 'plugin actions do exist' );
			} )
			.click( '.plugin-item .plugin-action .form-toggle__label', function( err ) {
				assert( undefined === err, 'clicked the active toggle' );
			} )
			.waitFor( '.notice.is-success', 10000, function( err ) {
				assert( undefined === err, 'toggle successfully toggled' );
			} )
			.url( url.resolve( config.jetpackSite.url, '/wp-admin/plugins.php' ) )
			.waitFor( '.akismet_activate', 6000, function( err ) {
				assert( undefined === err, 'akismet is deactivated' );
			} )
			.url( url.resolve( 'https://wordpress.com', 'plugins/' + siteSlug ) )
			.waitFor( '.plugin-item__actions', 10000, function( err ) {
				assert( undefined === err, 'plugin actions do exist' );
			} )
			.click( '.plugin-item .plugin-action .form-toggle__label', function( err ) {
				assert( undefined === err, 'clicked the active toggle' );
			} )
			.call( done );
	} );

	after( function( done ) {
		client.wpcomLogout();
		client.end( done );
	} );
} );
