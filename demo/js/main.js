(function() {
  fuzzy.analyzeSubTerms = true;

  var options = [
      'Update payment method',
      'See payment statistics',
      'Shopping cart',
      'Recently bought',
      'Check out',
      'Check in'
    ],
    maxResults = 5,
    input = document.querySelector('.fuzzy-search-wrapper input'),
    output = document.querySelector('.fuzzy-search-wrapper ul'),
    demoItemOutput = document.getElementById('demoItems');

  function doFilterOptions() {
    var query = input.value,
      filterResult = [],
      i;

    // removing all child elements the easy way
    output.innerHTML = '';

    if (query === '') {
      return;
    }

    for (i = 0; i < options.length; i++) {
      filterResult[i] = fuzzy(options[i], query);
    }

    filterResult.sort(fuzzy.matchComparator);

    for (i = 0; i < filterResult.length && i < maxResults; i++) {
      var option = filterResult[i],
        el = document.createElement('li');

      el.dataset.score = option.score;
      el.dataset.term = option.term;
      el.innerHTML = option.highlightedTerm;

      if (i === 0) {
        el.classList.add('selected');
      }

      output.appendChild(el);
    }
  };

  function getSelectedNode() {
    return document.querySelector('.selected');
  };

  function useSelectedOption() {
    var selectedNode = getSelectedNode();
    if (selectedNode !== null) {
      input.value = selectedNode.dataset.term;
    }
  };

  function moveSelection(down) {
    var selectedNode = getSelectedNode(),
      newSelectedNode = null;

    if (down) {
      newSelectedNode = selectedNode.nextSibling;
    } else {
      newSelectedNode = selectedNode.previousSibling;
    }

    if (newSelectedNode !== null) {
      selectedNode.classList.remove('selected');
      newSelectedNode.classList.add('selected');
    }
  };

  input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) { // enter
      useSelectedOption();
      doFilterOptions();
    } else if (e.keyCode === 40) { // down
      moveSelection(true);
    } else if (e.keyCode === 38) { // up
      moveSelection(false);
    } else if (e.keyCode === 27) { // ESC
      output.innerHTML = '';
      input.value = '';
    } else {
      doFilterOptions();
    }
  }, false);

  for (var i = 0; i < options.length; i++) {
    var textNode = document.createTextNode(options[i]),
      liNode = document.createElement('li');
    liNode.appendChild(textNode);
    demoItemOutput.appendChild(liNode);
  }
})();
