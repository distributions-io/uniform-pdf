'use strict';

// FUNCTIONS //


// PDF //

/**
* FUNCTION: pdf( x, a, b )
*	Evaluates the probability density function (PDF) for a Uniform distribution with minimum value `a` and maximum value `b` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} a - minimum value
* @param {Number} b - maximum value
* @returns {Number} evaluated PDF
*/
function pdf( x, a, b ) {
	return ( a <= x && x <= b ) ? 1 / ( b - a ) : 0;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
