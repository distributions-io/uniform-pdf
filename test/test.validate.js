/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( validate( {}, values[ i ] ) instanceof TypeError );
		}
	});

	it( 'should return an error if provided an option specifying the minimum support which is not a number', function test() {
		var values, err;

		values = [
			'5',
			[],
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'a': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an option specifying the maximum support which is not a number', function test() {
		var values, err;

		values = [
			'5',
			[],
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'b': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an accessor which is not a function', function test() {
		var values, err;

		values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'accessor': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a copy option which is not a boolean primitive', function test() {
		var values, err;

		values = [
			'5',
			5,
			new Boolean( true ),
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'copy': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a path option which is not a string primitive', function test() {
		var values, err;

		values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'path': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a separator option which is not a string primitive', function test() {
		var values, err;

		values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'sep': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a dtype option which is not a string primitive', function test() {
		var values, err;

		values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'dtype': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return null if all options are valid', function test() {
		var err;

		err = validate( {}, {
			'a': -10,
			'b': 10,
			'accessor': function getValue(){},
			'copy': false,
			'deepset': true,
			'path': 'x/y',
			'sep': '/',
			'dtype': 'int32'
		});

		assert.isNull( err );

		err = validate( {}, {
			'beep': true, // misc options
			'boop': 'bop'
		});

		assert.isNull( err );
	});

});
