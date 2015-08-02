'use strict';

// PARTIAL //

/**
* FUNCTION: partial( a, b )
*	Partially applies parameters `a` and `b` and returns a function for evaluating the probability density function (PDF) for a uniform distribution.
*
* @param {Number} a - minimum support
* @param {Number} b - maximum support
* @returns {Function} PDF
*/
function partial( a, b ) {
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a uniform distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		if ( x < a || x > b ) {
			return 0;
		}
		return 1 / (b-a);
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
