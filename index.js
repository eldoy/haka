function h(s, h, x) {
  return !h && q(s).innerHTML ||
    !x && (q(s).innerHTML = h) ||
    x[0] == 'r' && (q(s).outerHTML = h) ||
    q(s).insertAdjacentHTML(
      x[0] == 'b' && 'beforebegin' ||
      x[0] == 'a' && 'afterend' ||
      x[0] == 't' && 'afterbegin' ||
      x[0] == 'e' && 'beforeend', h)
}

function t(s, t) {
  return t ? (q(s).textContent = t) : q(s).textContent
}

function q(s, f) {
  return typeof s == 'string' ? (f ? q(f) : document).querySelector(s) : s
}

function qa(s, f) {
  return (f ? q(f) : document).querySelectorAll(s)
}

function m(t, ...d) {
  for (var h = '', i = 0; i < d.length; i++) h += t[i] + d[i]
  return h += t[i]
}

module.exports = { h, t, q, qa, m }
