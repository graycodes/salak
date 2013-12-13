console.log('Loaded main.js');
var app = app || {};

Salak = (function() {
    'use strict';

    return Class.extend({
	init: function() {
	    console.log('new salak');

	    this.paper = new Raphael(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);

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
            this.opacity = 1;

            if (x && y) {
                this.lastOptions = {
                    x3: x,
                    y3: y
                }
            }

/*            this.createSectionWide(this.colour, 80);// TODO: Randomise this
            this.createSectionNarrow(this.colour, 80);
            this.createSectionNarrow(this.colour, 80);            
 */
            this.width = Math.floor(Math.random() * 30) + 20;
            this.incSmall = this.width * 1.05;
            this.incLarge = this.incSmall * 3;
            
            this.snakeMakers = [this.createS1, this.createS2, this.createS3];

            this.randomSnake();

            return this;
        },

        randomSnake: function() {
            
            var randomMaker = Math.floor(Math.random() * this.snakeMakers.length)
              , snake
              , shapeSet
              , rotateDeg;

            snake = this.snakeMakers[randomMaker].call(this)

            shapeSet = this.paper.set.apply(this, snake);

            //this.shapeSet.attr({transform: "r45"}); 

            rotateDeg = Math.floor(Math.random() * 4) * 90;

            shapeSet.rotate(rotateDeg, this.getMidPoint(shapeSet).x, this.getMidPoint(shapeSet).y);

        },

        getMidPoint: function(set) {
            var l, r, t, b;
            l = set.getBBox().x;
            r = set.getBBox().x2;
            t = set.getBBox().y;
            b = set.getBBox().y2;

            return {x: (l + r) / 2, y: (t + b) / 2};
            
        },

        getYStart: function() {
            return Math.floor(Math.random() * document.documentElement.clientHeight);
        },

        getXStart: function() {
            return Math.floor(Math.random() * document.documentElement.clientWidth);
        },

        createS1: function() {
            var shapes = [];
            this.lastOptions = undefined;
            shapes.push(this.createSection(this.getSetPosition(2, this.incSmall, this.getXStart(), this.getYStart()), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(3, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(1, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(0, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(2, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(3, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(1, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(0, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(2, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(4, this.incLarge), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(5, this.incSmall), this.colour, this.width));
            shapes.push(this.createSection(this.getSetPosition(3, this.incSmall), this.colour, this.width));
            
            return shapes;
        },

        createS2: function() {
            var shapes = [];
            this.lastOptions = undefined;

            shapes.push(this.createSetSection(6, this.incLarge, this.getXStart(), this.getYStart()));
            shapes.push(this.createSetSection(0, this.incSmall));
            shapes.push(this.createSetSection(2, this.incSmall));
            shapes.push(this.createSetSection(3, this.incSmall));
            shapes.push(this.createSetSection(1, this.incSmall));
            
            return shapes;
        },

        createS3: function() {
            var shapes = [];
            this.lastOptions = undefined;
            
            shapes.push(this.createSetSection(1, this.incSmall, this.getXStart(), this.getYStart()));
            shapes.push(this.createSetSection(0, this.incSmall));
            shapes.push(this.createSetSection(2, this.incSmall));
            shapes.push(this.createSetSection(3, this.incSmall));
            shapes.push(this.createSetSection(1, this.incSmall));
            
            return shapes;
        },

        createSetSection: function(num, size, x, y) {
            return this.createSection(this.getSetPosition(num, size, x, y), this.colour, this.width);
        },

        getSetPosition: function(num, inc, x, y) {
            
            if (this.lastOptions) {
                x = this.lastOptions.x3;
                y = this.lastOptions.y3;
            }
                
            var options = [
                {x1: x, y1: y, x2: x,       y2: y + inc, x3: x + inc, y3: y + inc}, // SE (S) 0
                {x1: x, y1: y, x2: x + inc, y2: y,       x3: x + inc, y3: y + inc}, // SE (E) 1
                {x1: x, y1: y, x2: x + inc, y2: y      , x3: x + inc, y3: y - inc}, // NE (E) 2
                {x1: x, y1: y, x2: x      , y2: y - inc, x3: x + inc, y3: y - inc}, // NE (N) 3
                {x1: x, y1: y, x2: x,       y2: y - inc, x3: x - inc, y3: y - inc}, // NW (N) 4
                {x1: x, y1: y, x2: x - inc, y2: y      , x3: x - inc, y3: y - inc}, // NW (W) 5
                {x1: x, y1: y, x2: x - inc, y2: y,       x3: x - inc, y3: y + inc}, // SW (W) 6
                {x1: x, y1: y, x2: x,       y2: y + inc, x3: x - inc, y3: y + inc}, // SW (S) 7
            ];
            
            this.lastOptions = options[num];

            return options[num];
            
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
            circle2 = this.paper.circle(x3, y3, size)
                .attr("fill", colour)
                .attr("stroke-width", 0)
                .attr("fill-opacity", this.opacity)
                .toBack();
            line = this.paper.path("M" + x1 + "," + y1 + 
                                   "C" + x1 + "," + y1 + 
                                   "," + x2 + "," + y2 + 
                                   "," + x3 + "," + y3)
                .attr("stroke", colour)
                .attr("stroke-width", size * 2)
                .attr("stroke-opacity", this.opacity)
                .toBack();

            return this.paper.set(circle1, circle2, line); 
            
        },

        createSectionAnimated: function(positions, colour, size) {
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
/*    s.add();
    s.add();
    s.add();
*/
    

}());
