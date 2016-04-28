/**
 * Полифилл для element.closest(selector) (чтобы работало в IE).
 * Для этого полифила потребуется полифилл для element.matches().
 */

// Полифилл для element.matches()
if (Element && !Element.prototype.matches) {
 var proto = Element.prototype;
 proto.matches = proto.matchesSelector ||
   proto.mozMatchesSelector || proto.msMatchesSelector ||
   proto.oMatchesSelector || proto.webkitMatchesSelector;
}

// Полифилл для element.closest(selector)
if (!Element.prototype.closest) {
  Element.prototype.closest = function(css) {
    var node = this;

    while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
    }
    return null;
  };
}
