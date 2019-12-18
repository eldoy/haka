const q = function(selector, scope, fn) {
  if (typeof scope == 'function') {
    fn = scope
    scope = undefined
  }
  if (typeof selector == 'string') {
    selector = (scope ? q(scope) || document : document).querySelector(selector)
  }
  if (typeof fn == 'function') {
    fn(selector, scope)
  }
  return selector
}

const qa = function(selector, scope, fn) {
  if (typeof scope == 'function') {
    fn = scope
    scope = undefined
  }
  var nodes = (scope ? q(scope) || document : document).querySelectorAll(selector)
  if (typeof fn == 'function') {
    for (var i = 0; i < nodes.length; i++) {
      fn(nodes[i], scope)
    }
  }
  return nodes
}

const css = function(selector, atts) {
  var el = q(selector)
  if (!el) return null
  if (typeof atts == 'string') {
    if (atts.indexOf(':') > -1) {
      el.style.cssText = atts
    } else {
      return el.style[atts]
    }
  } else {
    for (var key in atts) {
      el.style[key] = atts[key]
    }
  }
  return el
}

const html = function(selector, h, x) {
  var el = q(selector)
  if (!el) return null
  if (typeof h == 'undefined') {
    return el.innerHTML
  } else if (!x) {
    el.innerHTML = h
  } else if (x[0] == 'r') {
    el.outerHTML = h
  } else {
    el.insertAdjacentHTML(
      x[0] == 'b' && 'beforebegin' ||
      x[0] == 'a' && 'afterend' ||
      x[0] == 't' && 'afterbegin' ||
      x[0] == 'e' && 'beforeend', h)
  }
  return el
}

const text = function(selector, t) {
  var el = q(selector)
  if (!el) return null
  if (typeof t == 'undefined') {
    return el.textContent
  }
  el.textContent = t
  return el
}

const attr = function(selector, atts, value) {
  var el = q(selector)
  if (!el) return null
  if (typeof atts == 'string') {
    if (typeof value == 'undefined') {
      return el.getAttribute(atts)
    } else {
      el.setAttribute(atts, value)
    }
  } else {
    for (var key in atts) {
      atts[key] == null ? el.removeAttribute(key) : el.setAttribute(key, atts[key])
    }
  }
  return el
}

const cookie = function(key, val, time) {
  if (typeof val == 'undefined') {
    var val = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    return val ? decodeURIComponent(val[2]) : null
  } else {
    var date = new Date
    date.setTime(date.getTime() + 864e5 * (time || 30))
    document.cookie = key + '=' + encodeURIComponent(val) + ';path=/;expires=' + date.toUTCString()
  }
}

const flash = function(message, opt) {
  if (!opt) opt = {}
  var el = opt.el || q('.flash'), time = opt.time || 5000, name = opt.name || 'flash'
  if (typeof el == 'string') el = q(el)
  if (!el) return null
  if (typeof timeout != 'undefined') {
    clearTimeout(timeout)
  }
  message = (message || cookie(name) || '').trim()
  cookie(name, '', -1)
  scroll(0, 0)
  el.textContent = message
  el.style.opacity = 1
  timeout = setTimeout(function() { el.style.opacity = 0 }, time)
  return el
}

const serialize = function(form) {
  var data = {}, o, x
  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i]
    if (field.name && !field.disabled && ['file', 'reset', 'submit', 'button'].indexOf(field.type) < 0) {
      if (field.type == 'select-multiple') {
        for (var j = 0, values = []; j < field.options.length; j++) {
          if ((o = field.options[j]).selected) {
            values.push(o.value)
          }
        }
        data[field.name] = values
      } else if (field.type == 'checkbox') {
        if (field.checked) {
          data[(x = field.name)] ? data[x].push(field.value) : data[x] = [field.value]
        }
      } else {
        data[field.name] = field.value
      }
    }
  }
  return data
}

module.exports = { q, qa, css, html, text, attr, cookie, flash, serialize }
