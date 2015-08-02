/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	pdf = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function', function test() {
		var data, actual, expected;

		data = [
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3
		];
		actual = new Array( data.length );

		actual = pdf( actual, data, -1, 1 );

		expected = [
			0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
		];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = pdf( actual, data, 0, 1 );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
