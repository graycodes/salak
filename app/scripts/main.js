console.log('Loaded main.js');
var app = app || {};

Salak = (function() {
    'use strict';

    return Class.extend({
	init: function() {
	    console.log('new salak');

	    this.paper = new Raphael(0,0,1000,1000);

	    this.salaks = [];
	    
	},

	add: function() {
	    var addedSalak = new Snake(this.paper);

            this.salaks.push(addedSalak);
           
            return addedSalak;
	}
    });

}());

Snake = (function() {
    'use strict';
    
    return Class.extend({
        init: function(paper) {
            console.log('  new snake');

            this.paper = paper;

            this.colour = this.randColor();

            //this.createSectionWide(this.colour, 80);
            this.createSectionNarrow(this.colour, 80);
            this.createSectionNarrow(this.colour, 80);
            //this.createSectionWide(this.colour, 80);
            

            return this;
        },

        getPosition: function(inc, x, y) {
            var x = this.lastOptions ? this.lastOptions.x3 : Math.floor(Math.random() * 800);
            var y = this.lastOptions ? this.lastOptions.y3 : Math.floor(Math.random() * 800);
            var options = [
                  {x1: x, y1: y, x2: x,       y2: y + inc, x3: x + inc, y3: y + inc},
                  {x1: x, y1: y, x2: x + inc, y2: y,       x3: x + inc, y3: y + inc},
                  {x1: x, y1: y, x2: x + inc, y2: y      , x3: x + inc, y3: y - inc},
                  {x1: x, y1: y, x2: x      , y2: y + inc, x3: x + inc, y3: y - inc},
                  {x1: x, y1: y, x2: x,       y2: y - inc, x3: x - inc, y3: y - inc},
                  {x1: x, y1: y, x2: x - inc, y2: y      , x3: x - inc, y3: y - inc},
                  {x1: x, y1: y, x2: x - inc, y2: y,       x3: x - inc, y3: y + inc},
                  {x1: x, y1: y, x2: x,       y2: y - inc, x3: x - inc, y3: y + inc},
                ]
              , chosen = /*this.lastChosen ? (Math.floor(Math.random()) ? this.lastChosen + 1 : this.lastChosen - 1) :*/ Math.floor(Math.random() * options.length);

            chosen = chosen == 4 ? 0 : chosen;
            console.log(chosen);
            this.lastChosen = chosen;
            this.lastOptions = options[chosen];

            return options[chosen];
        },

        getPositionNarrow: function(x, y) {
            return this.getPosition(100, x, y);
        },

        getPositionWide: function(x, y) {
            return this.getPosition(200, x, y);
        },

        createSectionNarrow: function(colour, size) {
            this.createSection(this.getPositionNarrow(), colour, size);
        },

        createSectionWide: function(colour, size) {
            this.createSection(this.getPositionWide(), colour, size);
        },

        createSection: function(positions, colour, size) {
            var x1 = positions.x1, y1 = positions.y1
              , x2 = positions.x2, y2 = positions.y2
              , x3 = positions.x3, y3 = positions.y3;

            this.paper.circle(x1,y1,size)
                .attr("fill", colour)
                .attr("stroke-width", 0);
            this.paper.circle(x3, y3, size)
                .attr("fill", colour)
                .attr("stroke-width", 0);
            this.paper.path("M" + x1 + "," + y1 + 
                            "C" + x1 + "," + y1 + 
                            "," + x2 + "," + y2 + 
                            "," + x3 + "," + y3)
                .attr("stroke", colour)
                .attr("stroke-width", size * 2);

            return this; 
            
        },

        randColor: function() {
            var colors = ["00b196", "797e89", "3a3f56", "c9cc38", "32baec", "aa519a", "4058a4"]
              , rand = Math.floor(Math.random() * colors.length);
            return "#" + colors[rand];
        }
    });

}());

(function() {
    'use strict';

    var s = new Salak();
    
    s.add();

}());
