'use strict';

// PDF //

/**
* FUNCTION: pdf( x, a, b )
*	Evaluates the probability density function (PDF) for a uniform distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} a - minimum support
* @param {Number} b - maximum support
* @returns {Number} evaluated PDF
*/
function pdf( x, a, b ) {
	if ( x < a || x > b ) {
		return 0;
	}
	return 1 / (b-a);
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
