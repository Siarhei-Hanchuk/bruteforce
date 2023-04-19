
/* global module, require */

function hasSimilarChars (s) {
  for (var i in s)
    if (s[i - 1] === s[i] && i > 0) return true;

  return false;
}

function bruteForce (params) {
  var prefix = params.prefix || '';
  var filterSimilarChars = params.filterSimilarChars || false;
  var len = params.len;
  var chars = params.chars;
  var step = params.step;
  var end = params.end;
  var limit = params.limit;

  if (limit <= 0) return;

  if (prefix.length <= len) {
    limit = limit - 1;
    if (step) step(prefix);
  }

  if (prefix.length >= len)
    return [prefix];

  var strings = [prefix];

  for (var i in chars) {
    var nextString = prefix + chars[i];

    if (filterSimilarChars && hasSimilarChars(nextString))
      continue;

    var nextParams = {
      prefix: nextString,
      filterSimilarChars: filterSimilarChars,
      len: len,
      chars: chars,
      step: step,
      limit: limit,
    };

    var newStrings = bruteForce(nextParams);
    limit = limit - (newStrings ? newStrings.length : 0);
    strings = strings.concat(newStrings);

    if (limit <= 0) {
      if (end) end(strings);
      return strings;
    }
  }

  if (end) end(strings);

  return strings;
}

module.exports = bruteForce;
