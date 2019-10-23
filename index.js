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
  return el.insertAdjacentHTML(
    x[0] == 'b' && 'beforebegin' ||
    x[0] == 'a' && 'afterend' ||
    x[0] == 't' && 'afterbegin' ||
    x[0] == 'e' && 'beforeend', html)
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

function serialize(form) {
	var data = {}, o, x
	for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i]
		if (field.name && !field.disabled && ['file', 'reset', 'submit', 'button'].indexOf(field.type) < 0)
      if (field.type == 'select-multiple') {
        for (var j = 0, values = []; j < field.options.length; j++)
          if ((o = field.options[j]).selected) values.push(o.value)
        data[field.name] = values
      } else if (field.type == 'checkbox') {
        if (field.checked) data[(x = field.name)] ? data[x].push(field.value) : data[x] = [field.value]
      } else {
        data[field.name] = field.value
      }
	}
	return data
}

function h(tags, ...data) {
  for (var html = '', i = 0; i < data.length; i++) {
    html += tags[i] + data[i]
  }
  return html += tags[i]
}

module.exports = { q, qa, html, text, attr, cookie, flash, serialize, h }
