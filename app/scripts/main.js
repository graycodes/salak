console.log('Loaded main.js');
var app = app || {};

Salak = (function() {
    'use strict';

    return Class.extend({
	init: function() {
	    console.log('new salak');

	    this.paper = new Raphael(0, 0, window.screen.height, window.screen.width);

	    this.salaks = [];
	    
//            this.createDots();// OH GOD, THE HUGE MANATEE!

            Salak = this;

            document.onclick = function(event) {
                Salak.add(event.x, event.y);
            }
	},

	add: function(x, y) {
	    var addedSalak = new Snake(this.paper, x, y);

            this.salaks.push(addedSalak);
           
            return addedSalak;
	},

        createDots: function() {
            var x, y;
            for( x = 0; x < window.screen.width; x+=5) {
                for ( y = 0; y < window.screen.height; y+=5) {
                    this.paper.circle(x, y, 1)
                        .attr("stroke-width", 0)
                        .attr("fill", "#797e89")
                        .attr("fill-opacity", 0.5);
                }
            }
        }
    });

}());

Snake = (function() {
    'use strict';
    
    return Class.extend({
        init: function(paper, x, y) {
            console.log('  new snake');

            this.paper = paper;

            this.colour = this.randColor();
            this.opacity = 0.99;

            if (x && y) {
                this.lastOptions = {
                    x3: x,
                    y3: y
                }
            }

            this.createSectionWide(this.colour, 80);// TODO: Randomise this
            this.createSectionNarrow(this.colour, 80);
            this.createSectionNarrow(this.colour, 80);            

            return this;
        },

        getPosition: function(inc) {
            var x = this.lastOptions ? this.lastOptions.x3 : Math.floor(Math.random() * window.screen.width);
            var y = this.lastOptions ? this.lastOptions.y3 : Math.floor(Math.random() * window.screen.height);
            var options = [
                  {x1: x, y1: y, x2: x,       y2: y + inc, x3: x + inc, y3: y + inc},
                  {x1: x, y1: y, x2: x + inc, y2: y,       x3: x + inc, y3: y + inc},
                  {x1: x, y1: y, x2: x + inc, y2: y      , x3: x + inc, y3: y - inc},
                  {x1: x, y1: y, x2: x      , y2: y - inc, x3: x + inc, y3: y - inc},
                  {x1: x, y1: y, x2: x,       y2: y - inc, x3: x - inc, y3: y - inc},
                  {x1: x, y1: y, x2: x - inc, y2: y      , x3: x - inc, y3: y - inc},
                  {x1: x, y1: y, x2: x - inc, y2: y,       x3: x - inc, y3: y + inc},
                  {x1: x, y1: y, x2: x,       y2: y + inc, x3: x - inc, y3: y + inc},
                ]
              , chosen = /*this.lastChosen ? (Math.floor(Math.random()) ? this.lastChosen + 1 : this.lastChosen - 1) :*/ Math.floor(Math.random() * options.length);

            chosen = chosen == 4 ? 0 : chosen;
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
            var line, circle1, circle2;
            circle1 = this.paper.circle(x1,y1,size)
                .attr("fill", colour)
                .attr("stroke-width", 0)
                .attr("fill-opacity", this.opacity)
                .toBack();
            circle2 = this.paper.circle(x1, y1, size)
                .attr("fill", colour)
                .attr("stroke-width", 0)
                .attr("fill-opacity", this.opacity)
                .toBack();
            line = this.paper.path("M" + x1 + "," + y1 + 
                                   "C" + x1 + "," + y1 + 
                                   "," + x1 + "," + y1 + 
                                   "," + x1 + "," + y1)
                .attr("stroke", colour)
                .attr("stroke-width", size * 2)
                .attr("stroke-opacity", this.opacity)
                .toBack();

            line.animate({path: "M" + x1 + "," + y1 + 
                         "C" + x1 + "," + y1 + 
                         "," + x2 + "," + y2 + 
                         "," + x3 + "," + y3}, 1000);
            circle2.animate({transform: "T" + (x3 - x1) + "," + (y3 - y1)}, 1000);

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
    s.add();
    s.add();
    s.add();

    

}());
