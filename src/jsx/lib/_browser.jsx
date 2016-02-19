class Browser {
  id(q,context=document) { return context.getElementById(q); }
  classes(q,context=document) {
    return this.to_array(context.getElementsByClassName(q)); }
  tags(q,context=document) {
    return this.to_array(context.getElementsByTagName(q)); }
  first(q,context=document) { return context.querySelector(q); }
  all(q,context=document) {
    return this.to_array(context.querySelectorAll(q)); }
  to_array(like_array) { return Array.prototype.slice.call(like_array); }
  attr(element,key,val) {
    if(val === undefined) {
      return element.getAttribute(key);
    } else {
      return element.setAttribute(key, val);
    }
  }
}
export default new Browser();
