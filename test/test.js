/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( 'dstructs-matrix' ),
	isnan = require( 'validate.io-nan' ),
	pdf = require( './../lib' ),
	PDF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-uniform-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided support parameters `a` and `b` such that a >= b', function test() {
		var values = [
			[ 2, 1 ],
			[ 3, 3 ],
			[ -1, -2 ]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( [ 1, 2, 3, 4 ], {
					'a': value[ 0 ],
					'b': value[ 1 ]
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( pdf( values[ i ] ) ) );
		}
	});

	it( 'should evaluate the probability density function when provided a number', function test() {
		assert.strictEqual( pdf( -1 ), 0 );
		assert.strictEqual( pdf( 0.5 ), 1 );
	});

	it( 'should evaluate the probability density function when provided a plain array', function test() {
		var data, actual, expected;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = [
			0, 1/4, 1/4, 1/4, 1/4, 1/4, 0
		];

		actual = pdf( data, {
			'a': -2,
			'b': 2
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = pdf( data, {
			'a': -2,
			'b': 2,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should evaluate the probability density function when provided a typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ -3, -2, -1, 0, 1, 2, 3 ] );

		expected = new Float64Array([
			0, 1/4, 1/4, 1/4, 1/4, 1/4, 0
		]);

		actual = pdf( data, {
			'a': -2,
			'b': 2
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = pdf( data, {
			'a': -2,
			'b': 2,
			'copy': false
		});
		expected = new Int8Array([
			0, 0, 0, 0, 0, 0, 0
		]);
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the probability density function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = new Int8Array([
			0, 0, 0, 1, 1, 0, 0
		]);

		actual = pdf( data, {
			'dtype': 'int8'
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the probability density function element-wise using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,-3],
			[1,-2],
			[2,-1],
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [
			0,
			1/4,
			1/4,
			1/4,
			1/4,
			1/4,
			0
		];

		actual = pdf( data, {
			'a': -2,
			'b': 2,
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = pdf( data, {
			'a': -2,
			'b': 2,
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the probability density function element-wise and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[0,0]},
			{'x':[1,1/4]},
			{'x':[2,1/4]},
			{'x':[3,1/4]},
			{'x':[4,1/4]},
			{'x':[5,1/4]},
			{'x':[6,0]}
		];

		actual = pdf( data, {
			'a': -2,
			'b': 2,
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = pdf( data, {
			'a': -2,
			'b': 2,
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the probability density function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = PDF( i / 5, 2, 4 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'a': 2,
			'b': 4
		});

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = pdf( mat, {
			'a': 2,
			'b': 4,
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the probability density function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = PDF( i / 5, 2, 4 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'a': 2,
			'b': 4,
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( pdf( [] ), [] );
		assert.deepEqual( pdf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( pdf( new Int8Array() ), new Float64Array() );
	});

});
