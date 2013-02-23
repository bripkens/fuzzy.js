(function (context) {
  "use strict";

  var fuzzy = function fuzzy(term, query) {
    var score = 0,
      termLength = term.length,
      queryLength = query.length,
      highlighting = '',
      ti = 0,
      // -1 would not work as this would break the calculations of bonus
      // points for subsequent character matches. Something like
      // Number.MIN_VALUE would be more appropriate, but unfortunately
      // Number.MIN_VALUE + 1 equals 1...
      previousMatchingCharacter = -2;

    for (var qi = 0; qi < queryLength && ti < termLength; qi++) {
      var qc = query.charAt(qi),
        lowerQc = qc.toLowerCase();

      for (; ti < termLength; ti++) {
        var tc = term.charAt(ti);

        if (lowerQc === tc.toLowerCase()) {
          score++;

          if ((previousMatchingCharacter + 1) === ti) {
            score += 2;
          }

          highlighting += '<em>' + tc + '</em>';
          previousMatchingCharacter = ti;
          ti++;
          break;
        } else {
          highlighting += tc;
        }
      }
    }

    highlighting += term.substring(ti, term.length);

    return {
      score: score,
      term: term,
      query: query,
      highlightedTerm: highlighting
    };
  };

  fuzzy.matchComparator = function matchComparator(m1, m2) {
    return m2.score - m1.score;
  };

  /*
   * Exporting the public API
   * ------------------------
   * In a browser, the library will be available through this.fuzzy. Should
   * requireJS be used, we register fuzzy.js through requireJS.
   * For other environments, CommonJS is supported.
   */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = fuzzy;
  } else if (typeof define !== 'undefined') {
    define(function() {
      return fuzzy;
    });
  } else {
    /*
     * In case the global variable fuzzy needs to be reset to its previous
     * value, the fuzzy library is returned by this method.
     */
    var previousFuzzy = context.fuzzy;
    fuzzy.noConflict = function() {
      context.fuzzy = previousFuzzy;
      return fuzzy;
    };

    context.fuzzy = fuzzy;
  }
})(this);