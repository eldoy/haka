function q(selector, scope) {
  if (typeof selector === 'string') {
    return (scope ? q(scope) || document : document).querySelector(selector)
  }
  return selector
}

function qa(selector, scope) {
  return (scope ? q(scope) || document : document).querySelectorAll(selector)
}

function html(selector, html, x) {
  const el = q(selector)
  if (!el) return null
  if (typeof html == 'undefined') {
    return el.innerHTML
  } else if (!x) {
    return el.innerHTML = html
  } else if (x[0] == 'r') {
    return el.outerHTML = html
  }
  const mode =
    x[0] == 'b' && 'beforebegin' ||
    x[0] == 'a' && 'afterend' ||
    x[0] == 't' && 'afterbegin' ||
    x[0] == 'e' && 'beforeend'
  return el.insertAdjacentHTML(mode, html)
}

function text(selector, text) {
  const el = q(selector)
  if (!el) return null
  if (typeof text === 'undefined') {
    return el.textContent
  }
  return el.textContent = text
}

function attr(selector, atts) {
  const el = q(selector)
  if (!el) return null
  if (typeof atts === 'string') {
    return el.getAttribute(atts)
  } else {
    const el = q(selector)
    for (var key in atts) {
      el.setAttribute(key, atts[key])
    }
  }
}

function h(tags, ...data) {
  for (var html = '', i = 0; i < data.length; i++) {
    html += tags[i] + data[i]
  }
  return html += tags[i]
}

module.exports = { q, qa, html, text, attr, h }
