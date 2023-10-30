
function rgbaToHex(r, g, b, a) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + a.toString(16).toUpperCase().padStart(2, '0');
}

module.exports = {
  rgbaToHex:rgbaToHex
}

