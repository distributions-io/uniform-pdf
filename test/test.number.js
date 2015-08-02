/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function for a single value', function test() {
		assert.strictEqual( pdf( 0.5, 0, 1 ), 1 );
		assert.strictEqual( pdf( 1.5, 0, 1 ), 0 );
	});

});
