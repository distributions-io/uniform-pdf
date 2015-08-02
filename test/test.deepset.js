/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	pdf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function and deep set', function test() {
		var data, expected;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		data = pdf( data, -2, 2, 'x' );

		expected = [
			{'x':0},
			{'x':1/4},
			{'x':1/4},
			{'x':1/4},
			{'x':1/4},
			{'x':1/4},
			{'x':0}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,-3]},
			{'x':[9,-2]},
			{'x':[9,-1]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = pdf( data, -2, 2, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,1/4]},
			{'x':[9,1/4]},
			{'x':[9,1/4]},
			{'x':[9,1/4]},
			{'x':[9,1/4]},
			{'x':[9,0]}
		];

		assert.deepEqual( data, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], 0, 1, 'x' ), [] );
		assert.deepEqual( pdf( [], 0, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = pdf( data, 0, 1, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
