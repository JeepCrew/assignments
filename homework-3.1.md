`Example 1:`
```javascript
var oConsole = document.getElementById("console");
var oList =  oConsole.getElementsByTagName("ul")[0];
function fpLog(sMessage)
{
	var oElement = document.createElement("li");
	oElement.appendChild(document.createTextNode("- " + sMessage));
	oList.appendChild(oElement);
};

if(!window.console)
{
	window.console = {};
	window.console.log = function(sMessage)
	{
		fpLog(sMessage);
	};
}else
{
	if(window.console.log)
	{
		var fpConsoleLog = window.console.log;
		window.console.log = function(sMessage)
		{
			fpLog(sMessage);
			fpConsoleLog.call(window.console, sMessage);
		};
	}
}
```

`Cleaned up version of Example 1:`
```javascript
var oConsole = document.getElementById("console");
var oList = oConsole.getElementsByTagName("ul")[0];
function fpLog(sMessage) {
	var oElement = document.createElement("li");
	oElement.appendChild(document.createTextNode("- " + sMessage));
	oList.appendChild(oElement);
};

if(!window.console) {
	window.console = {};
	window.console.log = function(sMessage) {
		fpLog(sMessage);
	}
} else {
	if(window.console.log) {
		var fpConsoleLog = window.console.log;
		window.console.log = function(sMessage) {
			fpLog(sMessage);
			fpConsoleLog.call(window.console, sMessage);
		};
	}
}
```

`Example 2 (rhill-voronoi-demo5.html)`
```javascript
var VoronoiDemo = {
	voronoi: new Voronoi(),
	diagram: null,
	margin: 0.1,
	canvas: null,
	bbox: {xl:0,xr:800,yt:0,yb:600},
	sites: [],
	timeoutDelay: 100,

	init:   function() {
		    this.canvas = document.getElementById('voronoiCanvas');
		    this.randomSites(100,true);
		    },

	clearSites: function() {
		        this.compute([]);
		        },

	randomSites: function(n, clear) {
		var sites = [];
		if (!clear) {
			sites = this.sites.slice(0);
		}
		// create vertices
		var xmargin = this.canvas.width*this.margin,
			ymargin = this.canvas.height*this.margin,
			xo = xmargin,
			dx = this.canvas.width-xmargin*2,
			yo = ymargin,
			dy = this.canvas.height-ymargin*2;
		for (var i=0; i<n; i++) {
			sites.push({x:self.Math.round((xo + self.Math.random() * dx) * 10) / 10,y:self.Math.round((yo + self.Math.random() * dy) * 10) / 10});
		}
		this.compute(sites);
		// relax sites
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		var me = this;
		this.timeout = setTimeout(function() {me.relaxSites();},  this.timeoutDelay);
	},

	relaxSites: function() {
		if (!this.diagram) {return;}
		var cells = this.diagram.cells,
			iCell = cells.length,
			cell,
			site, sites = [],
			again = false,
			rn, dist;
		var p = 1 / iCell * 0.1;
		while (iCell--) {
			cell = cells[iCell];
			rn = Math.random();
			// probability of apoptosis
			if (rn < p) {
				continue;
				}
			site = this.cellCentroid(cell);
			dist = this.distance(site, cell.site);
			again = again || dist > 1;
			// don't relax too fast
			if (dist > 2) {
				site.x = (site.x+cell.site.x)/2;
				site.y = (site.y+cell.site.y)/2;
				}
			// probability of mytosis
			if (rn > (1-p)) {
				dist /= 2;
				sites.push({
					x: site.x+(site.x-cell.site.x)/dist,
					y: site.y+(site.y-cell.site.y)/dist,
					});
				}
			sites.push(site);
		    }
		this.compute(sites);
		if (again) {
			var me = this;
			this.timeout = setTimeout(function(){
				me.relaxSites();
				}, this.timeoutDelay);
			}
	},

	distance: function(a, b) {
		var dx = a.x-b.x,
			dy = a.y-b.y;
		return Math.sqrt(dx * dx + dy * dy);
	},

	cellArea: function(cell) {
		var area = 0,
			halfedges = cell.halfedges,
			iHalfedge = halfedges.length,
			halfedge,
			p1, p2;
		while (iHalfedge--) {
			halfedge = halfedges[iHalfedge];
			p1 = halfedge.getStartpoint();
			p2 = halfedge.getEndpoint();
			area += p1.x * p2.y;
			area -= p1.y * p2.x;
		}
		area /= 2;
		return area;
	},

	cellCentroid: function(cell) {
		var x = 0, y = 0,
			halfedges = cell.halfedges,
			iHalfedge = halfedges.length,
			halfedge,
			v, p1, p2;
		while (iHalfedge--) {
			halfedge = halfedges[iHalfedge];
			p1 = halfedge.getStartpoint();
			p2 = halfedge.getEndpoint();
			v = p1.x*p2.y - p2.x*p1.y;
			x += (p1.x+p2.x) * v;
			y += (p1.y+p2.y) * v;
			}
		v = this.cellArea(cell) * 6;
		return {x:x/v,y:y/v};
	},

	compute: function(sites) {
		this.sites = sites;
		this.voronoi.recycle(this.diagram);
		this.diagram = this.voronoi.compute(sites, this.bbox);
		this.updateStats();
		this.render();
	},

	updateStats: function() {
		if (!this.diagram) {return;}
		var e = document.getElementById('voronoiStats');
		if (!e) {return;}
		e.innerHTML = '('+this.diagram.cells.length+' Voronoi cells computed from '+this.diagram.cells.length+' Voronoi sites in '+this.diagram.execTime+' ms &ndash; rendering <i>not</i> included)';
	},

	render: function() {
		var ctx = this.canvas.getContext('2d');
		// background
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.rect(0,0,this.canvas.width,this.canvas.height);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.strokeStyle = '#888';
		ctx.stroke();
		// voronoi
		if (!this.diagram) {return;}
		// edges
		ctx.beginPath();
		ctx.strokeStyle = '#000';
		var edges = this.diagram.edges,
			iEdge = edges.length,
			edge, v;
		while (iEdge--) {
			edge = edges[iEdge];
			v = edge.va;
			ctx.moveTo(v.x,v.y);
			v = edge.vb;
			ctx.lineTo(v.x,v.y);
			}
		ctx.stroke();
		// sites
		ctx.beginPath();
		ctx.fillStyle = '#44f';
		var sites = this.sites,
			iSite = sites.length;
		while (iSite--) {
			v = sites[iSite];
			ctx.rect(v.x-2 / 3,v.y-2 / 3,2,2);
		}
		ctx.fill();
	},
};
```

`Cleaned up Example 2 (rhill-voronoi-demo5.html)`
```javascript

//Check lines 384, 404

//User is inconsistant with spacing between arithmetic operators

//Really long variable declaration
var VoronoiDemo = {

	voronoi: new Voronoi(),
	diagram: null,
	margin: 0.1,
	canvas: null,
	bbox: {xl:0,xr:800,yt:0,yb:600},
	sites: [],
	timeoutDelay: 100,

	init: function() {
		this.canvas = document.getElementById('voronoiCanvas');
		this.randomSites(100,true);
	},

	clearSites: function() {
		this.compute([]);
	},

	randomSites: function(n, clear) {
		var sites = [];
		
		if (!clear) {
			sites = this.sites.slice(0);
		}
		// create vertices
		var xmargin = this.canvas.width*this.margin,
			ymargin = this.canvas.height*this.margin,
			xo = xmargin,
			dx = this.canvas.width-xmargin*2,
			yo = ymargin,
			dy = this.canvas.height-ymargin*2;
			
		for (var i=0; i<n; i++) {
			    sites.push({x:self.Math.round((xo + self.Math.random() * dx) * 10) / 10,y:self.Math.round((yo + self.Math.random() * dy) * 10) / 10});
		}
		
		this.compute(sites);
		// relax sites
		if (this.timeout) {
			clearTimeout(this.timeout)
			this.timeout = null;
		}
		
		var me = this;
		this.timeout = setTimeout(function() {
		    me.relaxSites();
		}, this.timeoutDelay);
	},

	relaxSites: function() {
		if (!this.diagram) {return;}
		var cells = this.diagram.cells,
			iCell = cells.length,
			cell,
			site, sites = [],
			again = false,
			rn, dist;
		var p = 1 / iCell * 0.1;
		while (iCell--) {
			cell = cells[iCell];
			rn = Math.random();
			// probability of apoptosis
			if (rn < p) {
				continue;
			}
			site = this.cellCentroid(cell);
			dist = this.distance(site, cell.site);
			again = again || dist > 1;
			// don't relax too fast
			if (dist > 2) {
				site.x = (site.x + cell.site.x) / 2;
				site.y = (site.y + cell.site.y) / 2;
			}
			// probability of mytosis
			if (rn > (1 - p)) {
				dist /= 2;
				sites.push({
					x: site.x + (site.x - cell.site.x) / dist,
					y: site.y + (site.y - cell.site.y) / dist,
				});
			}
			sites.push(site);
		}
		this.compute(sites);
		
		if (again) {
			var me = this;
			this.timeout = setTimeout(function(){
				me.relaxSites();
				}, this.timeoutDelay);
		}
	},

	distance: function(a, b) {
		var dx = a.x - b.x,
			dy = a.y - b.y;
		return Math.sqrt(dx * dx + dy * dy);
	},

	cellArea: function(cell) {
		var area = 0,
			halfedges = cell.halfedges,
			iHalfedge = halfedges.length,
			halfedge,
			p1, p2;
		while (iHalfedge--) {
			halfedge = halfedges[iHalfedge];
			p1 = halfedge.getStartpoint();
			p2 = halfedge.getEndpoint();
			area += p1.x * p2.y;
			area -= p1.y * p2.x;
		}
		area /= 2;
		return area;
	},

	cellCentroid: function(cell) {
		var x = 0, y = 0,
			halfedges = cell.halfedges,
			iHalfedge = halfedges.length,
			halfedge,
			v, p1, p2;
		while (iHalfedge--) {
			halfedge = halfedges[iHalfedge];
			p1 = halfedge.getStartpoint();
			p2 = halfedge.getEndpoint();
			v = p1.x * p2.y - p2.x * p1.y;
			x += (p1.x+p2.x) * v;
			y += (p1.y+p2.y) * v;
		}
		v = this.cellArea(cell) * 6;
		
//Not sure what ":" is used for

		return {x:x / v,y:y / v};
	},

	compute: function(sites) {
		this.sites = sites;
		this.voronoi.recycle(this.diagram);
		this.diagram = this.voronoi.compute(sites, this.bbox);
		this.updateStats();
		this.render();
	},

	updateStats: function() {
		if (!this.diagram) {return;}
		var e = document.getElementById('voronoiStats');
		if (!e) {return;}
		e.innerHTML = '('+this.diagram.cells.length+' Voronoi cells computed from '+this.diagram.cells.length+' Voronoi sites in '+this.diagram.execTime+' ms &ndash; rendering <i>not</i> included)';
	},

//Uses bracked endings like I have been for lines 406+443, 407+442

	render: function() {
		var ctx = this.canvas.getContext('2d');
		// background
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.rect(0,0,this.canvas.width,this.canvas.height);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.strokeStyle = '#888';
		ctx.stroke();
		// voronoi
		if (!this.diagram) {return;}
		// edges
		ctx.beginPath();
		ctx.strokeStyle = '#000';
		var edges = this.diagram.edges,
			iEdge = edges.length,
			edge, v;
		while (iEdge--) {
			edge = edges[iEdge];
			v = edge.va;
			ctx.moveTo(v.x,v.y);
			v = edge.vb;
			ctx.lineTo(v.x,v.y);
		}
		ctx.stroke();
		// sites
		ctx.beginPath();
		ctx.fillStyle = '#44f';
		var sites = this.sites,
			iSite = sites.length;
		while (iSite--) {
			v = sites[iSite];
			ctx.rect(v.x - 2 / 3,v.y - 2 / 3,2,2);
		}
		ctx.fill();
	},
};
```

`Example 3 (rhill-voronoi-core.min.js)`
```javascript

//Big Challenge :(

function Voronoi(){this.vertices=null;this.edges=null;this.cells=null;this.toRecycle=null;this.beachsectionJunkyard=[];this.circleEventJunkyard=[];
this.vertexJunkyard=[];this.edgeJunkyard=[];this.cellJunkyard=[]}Voronoi.prototype.reset=function(){if(!this.beachline){this.beachline=new this.RBTree()
}if(this.beachline.root){var a=this.beachline.getFirst(this.beachline.root);while(a){this.beachsectionJunkyard.push(a);a=a.rbNext
}}this.beachline.root=null;if(!this.circleEvents){this.circleEvents=new this.RBTree()}this.circleEvents.root=this.firstCircleEvent=null;
this.vertices=[];this.edges=[];this.cells=[]};Voronoi.prototype.sqrt=Math.sqrt;Voronoi.prototype.abs=Math.abs;Voronoi.prototype.ε=Voronoi.ε=1e-9;
Voronoi.prototype.invε=Voronoi.invε=1/Voronoi.ε;Voronoi.prototype.equalWithEpsilon=function(d,c){return this.abs(d-c)<1e-9
};Voronoi.prototype.greaterThanWithEpsilon=function(d,c){return d-c>1e-9};Voronoi.prototype.greaterThanOrEqualWithEpsilon=function(d,c){return c-d<1e-9
};Voronoi.prototype.lessThanWithEpsilon=function(d,c){return c-d>1e-9};Voronoi.prototype.lessThanOrEqualWithEpsilon=function(d,c){return d-c<1e-9
};Voronoi.prototype.RBTree=function(){this.root=null};Voronoi.prototype.RBTree.prototype.rbInsertSuccessor=function(e,a){var d;
if(e){a.rbPrevious=e;a.rbNext=e.rbNext;if(e.rbNext){e.rbNext.rbPrevious=a}e.rbNext=a;if(e.rbRight){e=e.rbRight;while(e.rbLeft){e=e.rbLeft
}e.rbLeft=a}else{e.rbRight=a}d=e}else{if(this.root){e=this.getFirst(this.root);a.rbPrevious=null;a.rbNext=e;e.rbPrevious=a;
e.rbLeft=a;d=e}else{a.rbPrevious=a.rbNext=null;this.root=a;d=null}}a.rbLeft=a.rbRight=null;a.rbParent=d;a.rbRed=true;var c,b;
e=a;while(d&&d.rbRed){c=d.rbParent;if(d===c.rbLeft){b=c.rbRight;if(b&&b.rbRed){d.rbRed=b.rbRed=false;c.rbRed=true;e=c}else{if(e===d.rbRight){this.rbRotateLeft(d);
e=d;d=e.rbParent}d.rbRed=false;c.rbRed=true;this.rbRotateRight(c)}}else{b=c.rbLeft;if(b&&b.rbRed){d.rbRed=b.rbRed=false;c.rbRed=true;
e=c}else{if(e===d.rbLeft){this.rbRotateRight(d);e=d;d=e.rbParent}d.rbRed=false;c.rbRed=true;this.rbRotateLeft(c)}}d=e.rbParent
}this.root.rbRed=false};Voronoi.prototype.RBTree.prototype.rbRemoveNode=function(f){if(f.rbNext){f.rbNext.rbPrevious=f.rbPrevious
}if(f.rbPrevious){f.rbPrevious.rbNext=f.rbNext}f.rbNext=f.rbPrevious=null;var e=f.rbParent,g=f.rbLeft,b=f.rbRight,d;if(!g){d=b
}else{if(!b){d=g}else{d=this.getFirst(b)}}if(e){if(e.rbLeft===f){e.rbLeft=d}else{e.rbRight=d}}else{this.root=d}var a;if(g&&b){a=d.rbRed;
d.rbRed=f.rbRed;d.rbLeft=g;g.rbParent=d;if(d!==b){e=d.rbParent;d.rbParent=f.rbParent;f=d.rbRight;e.rbLeft=f;d.rbRight=b;b.rbParent=d
}else{d.rbParent=e;e=d;f=d.rbRight}}else{a=f.rbRed;f=d}if(f){f.rbParent=e}if(a){return}if(f&&f.rbRed){f.rbRed=false;return
}var c;do{if(f===this.root){break}if(f===e.rbLeft){c=e.rbRight;if(c.rbRed){c.rbRed=false;e.rbRed=true;this.rbRotateLeft(e);
c=e.rbRight}if((c.rbLeft&&c.rbLeft.rbRed)||(c.rbRight&&c.rbRight.rbRed)){if(!c.rbRight||!c.rbRight.rbRed){c.rbLeft.rbRed=false;
c.rbRed=true;this.rbRotateRight(c);c=e.rbRight}c.rbRed=e.rbRed;e.rbRed=c.rbRight.rbRed=false;this.rbRotateLeft(e);f=this.root;
break}}else{c=e.rbLeft;if(c.rbRed){c.rbRed=false;e.rbRed=true;this.rbRotateRight(e);c=e.rbLeft}if((c.rbLeft&&c.rbLeft.rbRed)||(c.rbRight&&c.rbRight.rbRed)){if(!c.rbLeft||!c.rbLeft.rbRed){c.rbRight.rbRed=false;
c.rbRed=true;this.rbRotateLeft(c);c=e.rbLeft}c.rbRed=e.rbRed;e.rbRed=c.rbLeft.rbRed=false;this.rbRotateRight(e);f=this.root;
break}}c.rbRed=true;f=e;e=e.rbParent}while(!f.rbRed);if(f){f.rbRed=false}};
```

`Clean version of Example 3(rhill-voronoi-core.min.js)`
```javascript

//Here goes...

    function    Voronoi() {
        this.vertices = null; this.edges = null; this.cells = null; this.toRecycle = null; this.beachsectionJunkyard = [];
        this.circleEventJunkyard = []; this.vertexJunkyard = []; this.edgeJunkyard = []; this.cellJunkyard = [];
    }

    Voronoi.prototype.reset = function() {
        if(!this.beachline) {
            this.beachline=new this.RBTree();
        }
        
        if(this.beachline.root) {
            var a = this.beachline.getFirst(this.beachline.root);
            while(a) {
                this.beachsectionJunkyard.push(a);
                a = a.rbNext;
            }
        }
        
    this.beachline.root=null;
        
        if(!this.circleEvents) {
            this.circleEvents = new this.RBTree()
        }
        
    this.circleEvents.root = this.firstCircleEvent = null;
    this.vertices = [];
    this.edges = [];
    this.cells = [];
    }

    Voronoi.prototype.sqrt = Math.sqrt;
    Voronoi.prototype.abs = Math.abs;
    Voronoi.prototype.ε = Voronoi.ε = 1e-9;
    Voronoi.prototype.invε = Voronoi.invε = 1 / Voronoi.ε;
    
    Voronoi.prototype.equalWithEpsilon = function(d,c) {
        return this.abs(d - c) < 1e-9;
    }
    
    Voronoi.prototype.greaterThanWithEpsilon = function(d,c) { 
        return d - c > 1e-9;
    }
    
    Voronoi.prototype.greaterThanOrEqualWithEpsilon = function(d,c) {
        return c - d < 1e-9;
    }
    
    Voronoi.prototype.lessThanWithEpsilon = function(d,c) {
        return c-d>1e-9;
    }
    
    Voronoi.prototype.lessThanOrEqualWithEpsilon = function(d,c) {
        return d-c<1e-9;
    }
    
    Voronoi.prototype.RBTree = function() {
        this.root=null;
    }
    
    Voronoi.prototype.RBTree.prototype.rbInsertSuccessor = function(e,a) {
        var d;
        if(e) {
            a.rbPrevious = e;
            a.rbNext = e.rbNext;
                if(e.rbNext) {
                    e.rbNext.rbPrevious = a;
                }
                e.rbNext=a;
                if(e.rbRight) { 
                    e = e.rbRight;
                    while(e.rbLeft) { 
                        e = e.rbLeft;
                    }
                    e.rbLeft = a;
                }   else { 
                    e.rbRight = a;
                }
                d=e;
        }   else {
            
                if(this.root) {
                    e = this.getFirst(this.root);
                    a.rbPrevious = null;
                    a.rbNext = e;
                    e.rbPrevious = a;
                    e.rbLeft = a;
                    d=e;
                }   else {
                        a.rbPrevious = a.rbNext = null;
                        this.root = a;
                        d = null;
                    }
            }
            
        a.rbLeft = a.rbRight = null;
        a.rbParent = d;
        a.rbRed = true;
        var c,b;
        e=a;
        while(d && d.rbRed) {
            c = d.rbParent;
            if(d === c.rbLeft) {
                b = c.rbRight;
                if(b && b.rbRed) {
                    d.rbRed = b.rbRed = false;
                    c.rbRed = true;
                    e = c;
                }   else {
                        if(e === d.rbRight) {
                            this.rbRotateLeft(d);
                            e = d;
                            d = e.rbParent;
                        }
                        d.rbRed = false;
                        c.rbRed = true;
                        this.rbRotateRight(c);
                    }
            }   else {
                    b = c.rbLeft;
                    if(b && b.rbRed) {
                        d.rbRed = b.rbRed = false;
                        c.rbRed = true;
                        e=c;
                    }   else {
                        if(e === d.rbLeft) {
                            this.rbRotateRight(d);
                            e = d;
                            d = e.rbParent
                        }
                        d.rbRed = false;
                        c.rbRed = true;
                        this.rbRotateLeft(c);
                        }
                    }
                    d = e.rbParent;
        }
        this.root.rbRed=false;
    }
    
    Voronoi.prototype.RBTree.prototype.rbRemoveNode = function(f) {
        if(f.rbNext) {
            f.rbNext.rbPrevious=f.rbPrevious
        }
        if(f.rbPrevious) {
            f.rbPrevious.rbNext = f.rbNext
        }
        f.rbNext = f.rbPrevious = null;
        var e = f.rbParent;
        g = f.rbLeft;
        b = f.rbRight;
        d;
        if(!g) {
            d = b
        } else {
            if(!b) {
                d = g
            } else {
                d = this.getFirst(b)
            }
        }
        if(e) {
            if(e.rbLeft === f) {
                e.rbLeft = d
            } else {
                e.rbRight = d
            }
        } else {
                this.root = d
        }
        var a;
        if(g && b) {
        a = d.rbRed;
        d.rbRed = f.rbRed;
        d.rbLeft = g;
        g.rbParent = d;
        if(d !== b) {
            e = d.rbParent;
            d.rbParent = f.rbParent;
            f = d.rbRight;
            e.rbLeft = f;
            d.rbRight = b;
            b.rbParent = d;
        } else {
            d.rbParent = e;
            e = d;
            f = d.rbRight
        }
        } else {
            a = f.rbRed;
            f = d
        }
        if(f) {
            f.rbParent = e
        }
        if(a) {
            return
        }
        if(f && f.rbRed) {
            f.rbRed = false;
            return;
        }
        var c;
        do {
            if(f === this.root) {
                break
            }
            if(f === e.rbLeft) {
                c = e.rbRight;
                if(c.rbRed) {
                    c.rbRed = false;
                    e.rbRed = true;
                    this.rbRotateLeft(e);
                    c = e.rbRight
                }
                if((c.rbLeft && c.rbLeft.rbRed) || (c.rbRight&&c.rbRight.rbRed)) {
                    if(!c.rbRight ||! c.rbRight.rbRed) {
                        c.rbLeft.rbRed = false;
                        c.rbRed = true;
                        this.rbRotateRight(c);
                        c = e.rbRight
                    }
                    c.rbRed = e.rbRed;
                    e.rbRed = c.rbRight.rbRed = false;
                    this.rbRotateLeft(e);
                    f = this.root;
                    break
                }
            } else {
                c = e.rbLeft;
                if(c.rbRed) {
                    c.rbRed = false;
                    e.rbRed = true;
                    this.rbRotateRight(e);
                    c = e.rbLeft
                }
                if((c.rbLeft && c.rbLeft.rbRed) || (c.rbRight && c.rbRight.rbRed)) {
                    if(!c.rbLeft ||! c.rbLeft.rbRed) {
                        c.rbRight.rbRed = false;
                        c.rbRed = true;
                        this.rbRotateLeft(c);
                        c = e.rbLeft
                    }
                    c.rbRed = e.rbRed;
                    e.rbRed = c.rbLeft.rbRed = false;
                    this.rbRotateRight(e);
                    f = this.root;
                    break
                }
            }
            c.rbRed = true;
            f = e;
            e = e.rbParent
        }
        while(!f.rbRed);
        if(f) {
            f.rbRed = false
        }
    }
```