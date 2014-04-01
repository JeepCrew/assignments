var assert = require('assert'),
    calculator = require('./homework-9.1.js');

/**
 * Test plan for addition():
 * 
 *  1st | 2nd | output
 * -----+-----+-------
 *   -1 |  -1 |  -2
 *   -1 |  +0 |  -1
 *   -1 |  +1 |  +0
 *   +0 |  -1 |  -1
 *   +0 |  +0 |  +0
 *   +0 |  +1 |  +1
 *   +1 |  -1 |  +0
 *   +1 |  +0 |  +1
 *   +1 |  +1 |  +2
 */

/**
 * Test plan for subtraction():
 * 
 *  1st | 2nd | output
 * -----+-----+-------
 *   -1 |  -1 |  +0
 *   -1 |  +0 |  -1
 *   -1 |  +1 |  -2
 *   +0 |  -1 |  +1
 *   +0 |  +0 |  +0
 *   +0 |  +1 |  -1
 *   +1 |  -1 |  +2
 *   +1 |  +0 |  +1
 *   +1 |  +1 |  +0
 */

/**
 * Test plan for multiplication():
 * 
 * 1st / 2nd / output
 * -----+-----+------
 *   -1 |  -1 |  +1
 *   -1 |  +0 |  +0
 *   -1 |  +1 |  -1
 *   +0 |  -1 |  +0
 *   +0 |  +0 |  +0
 *   +0 |  +1 |  -0
 *   +1 |  -1 |  -1
 *   +1 |  +0 |  +0
 *   +1 |  +1 |  +1
 */
 

var tests = [
    [ -1, -1, +1 ],
    [ -1, +0, +0 ],
    [ -1, +1, -1 ],
    [ +0, -1, +0 ],
    [ +0, +0, +0 ],
    [ +0, +1, +0 ],
    [ +1, -1, -1 ],
    [ +1, +0, +0 ],
    [ +1, +1, +1 ],
];

tests.forEach(function(row){
    var a = row[0],
        b = row[1],
        c = row[2];
        
    assertEqual(calculator.multiply(a, b), c);
});

function assertEqual(actual, expected, message){
    assert.equal(actual, expected, message);
    console.log('pass!');
}


 /**
 * Test plan for division():
 * 
 * 1st / 2nd / output
 * -----+-----+------
 *   -1 |  -1 |  +1
 *   -1 |  +0 |  +NaN
 *   -1 |  +1 |  -1
 *   +0 |  -1 |  +0
 *   +0 |  +0 |  +NaN
 *   +0 |  +1 |  +0
 *   +1 |  -1 |  -1
 *   +1 |  +0 |  +NaN
 *   +1 |  +1 |  +1
 */
 
var tests = [
    [-1, -1, +1],
    [-1, +0, null],
    [-1, +1, -1],
    [+0, -1, +0],
    [+0, +0, null],
    [+0, +1, +0],
    [+1, -1, -1],
    [+1, +0, null],
    [+1, +1, +1],
/* // Not running...
// */
];

tests.forEach(function(row){
    var a = row[0],
        b = row[1],
        c = row[2];
    assertEqual(calculator.divide(a, b), c, "division fail on " + row);
});

/**
 * Test plan for addition():
 * 
 *  1st | 2nd | output
 * -----+-----+-------
 *   -1 |  -1 |  -2
 *   -1 |  +0 |  -1
 *   -1 |  +1 |  +0
 *   +0 |  -1 |  -1
 *   +0 |  +0 |  +0
 *   +0 |  +1 |  +1
 *   +1 |  -1 |  +0
 *   +1 |  +0 |  +1
 *   +1 |  +1 |  +2
 */
 
var tests = [
    [-1, -1, -2],
    [-1, +0, -1],
    [-1, +1, +0],
    [+0, -1, -1],
    [+0, +0, +0],
    [+0, +1, +1],
    [+1, -1, +0],
    [+1, +0, +1],
    [+1, +1, +2],
];

tests.forEach(function(row) {
    var a = row[0],
        b = row[1],
        c = row[2];
    assertEqual(calculator.addition(a, b), c, "addition fail on " + row);
});

/**
 * Test plan for subtraction():
 * 
 *  1st | 2nd | output
 * -----+-----+-------
 *   -1 |  -1 |  +0
 *   -1 |  +0 |  -1
 *   -1 |  +1 |  -2
 *   +0 |  -1 |  +1
 *   +0 |  +0 |  +0
 *   +0 |  +1 |  -1
 *   +1 |  -1 |  +2
 *   +1 |  +0 |  +1
 *   +1 |  +1 |  +0
 */

var tests = [
    [-1, -1, +0],
    [-1, +0, -1],
    [-1, +1, -2],
    [+0, -1, +1],
    [+0, +0, +0],
    [+0, +1, -1],
    [+1, -1, +2],
    [+1, +0, +1],
    [+1, +1, +0],
];

tests.forEach(function(row) {
    var a = row[0],
        b = row[1],
        c = row[2];
    assertEqual(calculator.subtraction(a, b), c, "subtraction fail on " + row);
});
