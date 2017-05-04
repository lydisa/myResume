HTMLElement.prototype.addClass = function (cls) {
  if (!this.hasClass(cls)) {
    this.className += ' ' + cls;
  }
};
HTMLElement.prototype.hasClass = function (cls) {
  if (this.className.split(' ').indexOf(cls) != -1) {
    return true;
  }
  return false;
};
HTMLElement.prototype.removeClass = function (cls) {
  if (this.hasClass(cls)) {
    var newClass = ' ' + this.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    this.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}
