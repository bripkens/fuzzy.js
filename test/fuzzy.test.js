var assert = require("assert");
var fuzzy = require("../fuzzy.js");

describe('fuzzy', function(){
  before(function() {
    fuzzy.analyzeSubTerms = false;
    fuzzy.highlighting.before = '<';
    fuzzy.highlighting.after = '>';
  });

  describe('#match', function(){
    it('should return 0 when no character matches', function(){
      assert.equal(0, fuzzy('main.js', 'foo').score);
    });

    it('should return one when only one character matches', function() {
      assert.equal(1, fuzzy('main.js', 'j').score);
    });

    it('should return one for multiple occurrences of the same char', function() {
      assert.equal(1, fuzzy('structure', 'u').score);
      assert.equal(1, fuzzy('foo', 'o').score);
    });

    it('should add bonus points for subsequent matches', function() {
      assert.equal(16, fuzzy('structure', 'struct').score);
      assert.equal(20, fuzzy('structure', 'structre').score);
    });

    it('should add additional information to matches', function() {
      var term = 'structure',
        query = 'struct',
        match = fuzzy(term, query);

      assert.ok(match.score != null);
      assert.equal(query, match.query);
      assert.ok(term, match.term);
      assert.ok(match.highlightedTerm != null);
    });

    it('should highlight matched terms', function() {
      var match = fuzzy('software', 'wae');

      assert.equal(match.highlightedTerm,
        'soft<w><a>r<e>');
    });

    describe('subTermAnalysis', function() {
      before(function() {
        fuzzy.analyzeSubTerms = true;
      });

      it('should find best sub term match', function() {
        var term = 'Halleluja';
        var query = 'luja';
        var match = fuzzy(term, query);
        assert.equal(10, match.score);
        assert.equal('Halle<l><u><j><a>',
            match.highlightedTerm);
      });

      it('should stop at sub term depth', function() {
        fuzzy.analyzeSubTerms = true;
        var term = '-----------Hel--Hello';
        var query = 'Hello';
        var match = fuzzy(term, query);
        assert.equal(9, match.score);

        assert.equal('-----------<H><e><l>--He<l>l<o>', match.highlightedTerm);
      });
    });
  });

  describe('#matchComparator', function() {
    it('should sort fuzzy matches', function() {
      var match0 = { score: 1 };
      var match1 = { score: 0 };
      var match2 = { score: 5 };
      var match3 = { score: 2 };
      var matches = [match0, match1, match2, match3];

      matches.sort(fuzzy.matchComparator);

      assert.deepEqual([match2, match3, match0, match1], matches);
    });

    it('should sort matches with equal scores according to term length', function() {
      var match0 = { score: 1, term: 'cardealer' };
      var match1 = { score: 1, term: 'car' };
      var match2 = { score: 1, term: 'carpark' };
      var matches = [match0, match1, match2];

      matches.sort(fuzzy.matchComparator);

      assert.deepEqual([match1, match2, match0], matches);
    });
  });
});
