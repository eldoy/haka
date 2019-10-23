function q(s, f) {
  return typeof s === 'string' ? (f ? q(f) : document).querySelector(s) : s
}

function qa(s, f) {
  return (f ? q(f) : document).querySelectorAll(s)
}

function h(s, h, x) {
  if (typeof h == 'undefined') {
    return q(s).innerHTML
  } else if (!x) {
    return q(s).innerHTML = h
  } else if (x[0] == 'r') {
    return q(s).outerHTML = h
  }
  return q(s).insertAdjacentHTML(
    x[0] == 'b' && 'beforebegin' ||
    x[0] == 'a' && 'afterend' ||
    x[0] == 't' && 'afterbegin' ||
    x[0] == 'e' && 'beforeend',
  h)
}

function t(s, t) {
  if (typeof t === 'undefined') {
    return q(s).textContent
  }
  return q(s).textContent = t
}

function m(t, ...d) {
  for (var h = '', i = 0; i < d.length; i++) {
    h += t[i] + d[i]
  }
  return h += t[i]
}

module.exports = { h, t, q, qa, m }
