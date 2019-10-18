function m (t, ...d) {
  for (var h = '', i = 0; i < d.length; i++) h += t[i] + d[i]
  return h += t[i]
}

function q (s) {
  return document.querySelector(s)
}

function qa (s) {
  return document.querySelectorAll(s)
}

function h (s, h, x, t) {
  return (
    !h && q(s).innerHTML ||
    !x && (q(s).innerHTML = h) ||
    x[0] == 'r' && (q(s).outerHTML = h) ||
    q(s).insertAdjacentHTML((
      x[0] == 'b' && 'beforebegin' ||
      x[0] == 'a' && 'afterend' ||
      x[0] == 't' && 'afterbegin' ||
      x[0] == 'e' && 'beforeend'
    ), h)
  )
}

// function t (s, h, x) {

//   // !x && (q(s).textContent = h) || x[0] == 'r' && (q(s).outerText = h) || q(s).insertAdjacentText((x[0] == 'b' && 'beforebegin' || x[0] == 'a' && 'afterend' || x[0] == 't' && 'afterbegin' || x[0] == 'e' && 'beforeend'), h)
// }

module.exports = { m, q, qa, h }
