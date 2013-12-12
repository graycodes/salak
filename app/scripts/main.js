console.log('Loaded main.js');
var app = app || {};

Salak = (function() {
    'use strict';

    return Class.extend({
	init: function() {
	    console.log('new salak');

	    this.paper = new Raphael(0,0,400,400);

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
            this.paper.circle(50,40,10);
            return this;
        }
    });

}());

(function() {
    'use strict';

    var s = new Salak();
    
    s.add();

}());
