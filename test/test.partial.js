/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number Uniform-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the Uniform pdf for given parameter values', function test() {
		var pdf;
		pdf = partial( 0 );
		expect( pdf ).to.be.a( 'function' );
	});

});
