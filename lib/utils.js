module.exports = {
	wpcomLogin: function( client, username, password, callback ) {
		client
			.url( 'https://wordpress.com' )
			.click( '.click-wpcom-login', function( err ) {
				if ( err ) {
					throw new Error( 'there was an error clicking the login button' );
				}
			} )
			.waitFor( '#loginform', 2000, function( err ) {
				if ( err ) {
					throw new Error( 'loginform does not exist' );
				}
			} )
			.setValue( '#user_login', username, function( err ) {
				if ( err ) {
					throw new Error( 'there was an error filling in the username' );
				}
			} )
			.setValue( '#user_pass', password, function( err ) {
				if ( err ) {
					throw new Error( 'there was an error filling in the password' );
				}
			} )
			.submitForm( '#loginform' )
			.waitFor( 'ul.menu-right li.me a', 2000, function( err ) {
				if ( err ) {
					throw new Error( 'login was not successful' );
				}
			} );

		callback();
	},

	wpcomLogout: function( client, callback ) {
		client
			.url( 'https://wordpress.com/me' )
			.waitFor( '.me-sidebar__menu__signout', 2000, function( err ) {
				if ( err ) {
					throw new Error( 'the sign out button does not exist in the /me sidebar' );
				}
			} )
			.click( '.me-sidebar__menu__signout', function( err ) {
				if ( err ) {
					throw new Error( 'there was an error clicking the sign out button' );
				}
			} )
			.waitFor( '.click-wpcom-login', 2000, function( err ) {
				if ( err ) {
					throw new Error( 'the user was not logged out of WordPress.com' );
				}
			} );

		callback();
	}
};
