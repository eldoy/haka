function q(selector, scope) {
  if (typeof selector == 'string') {
    return (scope ? q(scope) || document : document).querySelector(selector)
  }
  return selector
}

function qa(selector, scope) {
  return (scope ? q(scope) || document : document).querySelectorAll(selector)
}

function html(selector, html, x) {
  var el = q(selector)
  if (!el) return null
  if (typeof html == 'undefined') {
    return el.innerHTML
  } else if (!x) {
    return el.innerHTML = html
  } else if (x[0] == 'r') {
    return el.outerHTML = html
  }
  var mode =
    x[0] == 'b' && 'beforebegin' ||
    x[0] == 'a' && 'afterend' ||
    x[0] == 't' && 'afterbegin' ||
    x[0] == 'e' && 'beforeend'
  return el.insertAdjacentHTML(mode, html)
}

function text(selector, text) {
  var el = q(selector)
  if (!el) return null
  if (typeof text == 'undefined') {
    return el.textContent
  }
  return el.textContent = text
}

function attr(selector, atts) {
  var el = q(selector)
  if (!el) return null
  if (typeof atts == 'string') {
    return el.getAttribute(atts)
  } else {
    var el = q(selector)
    for (var key in atts) {
      el.setAttribute(key, atts[key])
    }
  }
}

function cookie(key, val, time) {
  if (typeof val == 'undefined') {
    var val = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    return val ? decodeURIComponent(val[2]) : null
  } else {
    var date = new Date
    date.setTime(date.getTime() + 864e5 * (time || 30))
    document.cookie = key + '=' + encodeURIComponent(val) + ';path=/;expires=' + date.toUTCString()
  }
}

function flash(selector, message, now) {
  var el = q(selector)
  if (!el) return
  if (typeof timeout != 'undefined') clearTimeout(timeout)
  message = (message || cookie('flash') || '').trim()
  if (!now) {
    cookie('flash', message)
  } else {
    cookie('flash', '', -1)
    if (message.length) {
      text(el, message)
      el.style.opacity = 1
      scroll(0, 0)
      timeout = setTimeout(function() { el.style.opacity = 0 }, 5000)
    }
  }
}

function serialize(e) {
	var d = {}, o, x
	for (var i = 0; i < e.elements.length; i++) {
    var f = e.elements[i]
		if (f.name && !f.disabled && ['file', 'reset', 'submit', 'button'].indexOf(f.type) < 0)
      if (f.type == 'select-multiple') {
        for (var n = 0, v = []; n < f.options.length; n++)
          if ((o = f.options[n]).selected) v.push(o.value)
        d[f.name] = v
      } else if (f.type == 'checkbox') {
        if (f.checked) d[(x = f.name)] ? d[x].push(f.value) : d[x] = [f.value]
      } else {
        d[f.name] = f.value
      }
	}
	return d
}

function h(tags, ...data) {
  for (var html = '', i = 0; i < data.length; i++) {
    html += tags[i] + data[i]
  }
  return html += tags[i]
}

module.exports = { q, qa, html, text, attr, cookie, flash, serialize, h }
