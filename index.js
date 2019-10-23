function q(selector, scope) {
  if (typeof selector === 'string') {
    return (scope ? q(scope) : document).querySelector(selector)
  }
  return selector
}

function qa(selector, scope) {
  return (scope ? q(scope) : document).querySelectorAll(selector)
}

function html(selector, html, x) {
  if (typeof html == 'undefined') {
    return q(selector).innerHTML
  } else if (!x) {
    return q(selector).innerHTML = html
  } else if (x[0] == 'r') {
    return q(selector).outerHTML = html
  }
  const mode =
    x[0] == 'b' && 'beforebegin' ||
    x[0] == 'a' && 'afterend' ||
    x[0] == 't' && 'afterbegin' ||
    x[0] == 'e' && 'beforeend'
  return q(selector).insertAdjacentHTML(mode, html)
}

function text(selector, text) {
  if (typeof text === 'undefined') {
    return q(selector).textContent
  }
  return q(selector).textContent = text
}

function h(tags, ...data) {
  for (var html = '', i = 0; i < data.length; i++) {
    html += tags[i] + data[i]
  }
  return html += tags[i]
}

module.exports = { q, qa, html, text, h }
