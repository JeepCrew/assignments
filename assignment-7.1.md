`javascript - rhill-voronoi-core.js 86-96`
```javascript

/**
 * Function name is "Voronoi"
 * "this" is dictionary
 * "vertices, edges, cells, and toRecycle" are and their value is "null"
 * "beachsectionJunkyard, circleEventJunkyard, vertexJunkyard, edgeJunkyard, and cellJunkyard" are and their values are empty 
**/

function Voronoi() {
    this.vertices = null;
    this.edges = null;
    this.cells = null;
    this.toRecycle = null;
    this.beachsectionJunkyard = [];
    this.circleEventJunkyard = [];
    this.vertexJunkyard = [];
    this.edgeJunkyard = [];
    this.cellJunkyard = [];
    }
    
```

`javascript - valid-function.js 1-10`
```javascript
'use strict';

/**
 * Function name is "isFunction"
**/

var isFunction = require('./is-function');

module.exports = function (x) {
	if (!isFunction(x)) {
		throw new TypeError(x + " is not a function");
	}
	return x;
};
```