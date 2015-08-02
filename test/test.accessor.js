/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	pdf = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];
		actual = new Array( data.length );

		actual = pdf( actual, data, -2, 2, getValue );

		expected = [
			0,
			1/4,
			1/4,
			1/4,
			1/4,
			1/4,
			0
		];

		assert.deepEqual( actual, expected );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = pdf( actual, data, 0, 1, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
