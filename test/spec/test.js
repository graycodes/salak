/* global describe, it */

(function () {
    'use strict';

    var salak
      , newSalak;

    describe('Salak,', function () {
	beforeEach(function() {
	    salak = new Salak();
	});

        describe('When created', function () {
	    
	    before(function() {
		newSalak = function() {
		    var salak = new Salak();
		};
	    });

            it('should create without error or issue', function () {
		should.exist(salak);
		salak.should.be.an('object');
		newSalak.should.not.Throw;
	    });

	    it('should create a new drawing area', function() {
		salak.should.have.property('paper');
		salak.paper.should.be.an('object');
	    });

            it('should have zero salaks', function() {
                salak.should.have.property('salaks');
                salak.salaks.length.should.equal(0);
            });

        });

	describe('When adding a snake,', function() {
	    it('should create a snake', function() {
		var added = salak.add();
                //added.should.equal('Raphaël’s object');
                assert.instanceOf(added, Snake);
	    });
            
            it('should be added to the list of snakes', function() {
                var length = salak.salaks.length;
                salak.add();
                salak.salaks.length.should.equal(length + 1);
            });

	});
    });
})();
