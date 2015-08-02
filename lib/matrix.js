'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, matrix, a, b )
*	Evaluates the probability density function (PDF) for a uniform distribution with minimum support `a` and maximum support `b` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} a - minimum support
* @param {Number} b - maximum support
* @returns {Matrix} output matrix
*/
function pdf( y, x, a, b ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'pdf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( a, b );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
