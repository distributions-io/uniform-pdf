'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( a, b )
*	Partially applies minimum value `a` and maximum value `b` and returns a function for evaluating the probability density function (PDF) for a Uniform distribution.
*
* @param {Number} a - minimum value
* @param {Number} b - maximum value
* @returns {Function} PDF
*/
function partial( a, b ) {

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Uniform distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		return ( a <= x && x <= b ) ? 1 / ( b - a ) : 0;
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
