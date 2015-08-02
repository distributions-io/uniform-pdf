/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'partial', function tests() {

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		var pdf = partial( 0, 1 );
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the probability density function', function test() {
		var pdf = partial( -10, 10 );
		assert.strictEqual( pdf( 20 ), 0 );
		assert.strictEqual( pdf( 9 ), 1/20 );
	});

});
