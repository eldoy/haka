window.q = function(selector, scope, fn) {
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

window.qa = function(selector, scope, fn) {
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

window.esc = function(str) {
  var el = document.createElement('p')
  el.textContent = str
  return el.innerHTML
}

window.raw = function(str) {
  var el = document.createElement('p')
  el.innerHTML = str
  return el.textContent
}

window.css = function(selector, atts) {
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

window.html = function(selector, h, x) {
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

window.text = function(selector, t) {
  var el = q(selector)
  if (!el) return null
  if (typeof t == 'undefined') {
    return el.textContent
  }
  el.textContent = t
  return el
}

window.attr = function(selector, atts, value) {
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

window.time = function(date, opt) {
  if (!opt) opt = {}
  var formatter = new Intl.DateTimeFormat(opt.lang || 'en', opt)
  var format = opt.format
  if (format) {
    var parts = {}
    formatter.formatToParts(date).forEach(function(part) {
      parts[part.type] = part.value
    })
    var matches = format.match(/%[A-z]+/gi) || []
    matches.forEach(function(match) {
      var key = match.slice(1).toLowerCase()
      var value = parts[key]
      if (value) {
        if (typeof value == 'string' && /[A-Z]/.test(match[1])) {
          value = value[0].toUpperCase() + value.slice(1)
        }
        format = format.replace(match, value)
      }
    })
    return format
  }
  return formatter.format(date)
}

window.params = function(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var matcher = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var result = matcher.exec(location.search)
  return result == null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '))
}

window.cookie = function(key, val, opt) {
  if (typeof val == 'undefined') {
    val = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    return val ? decodeURIComponent(val[2]) : null
  }
  if (!opt) opt = {}
  if (val === null) {
    val = ''
    opt.days = -1
  }
  var days = opt.days || 30,
    path = opt.path || '/',
    domain = opt.domain ? ';domain=' + opt.domain : '',
    sameSite = opt.sameSite || 'Lax',
    httpOnly = opt.httpOnly ? ';HttpOnly' : '',
    secure = opt.secure ? ';Secure' : ''

  var date = new Date
  date.setTime(date.getTime() + 864e5 * days)
  document.cookie = key + '=' + encodeURIComponent(val)
    + ';path=' + path + domain
    + ';expires=' + date.toUTCString()
    + ';SameSite=' + sameSite + httpOnly + secure
}

window.store = function(key, val) {
  function get() {
    var item = sessionStorage.getItem(key)
    if (item != null) {
      return JSON.parse(item)
    }
  }
  if (!key) return sessionStorage.clear()
  if (val === null) {
    var item = get()
    sessionStorage.removeItem(key)
    return item
  } else if (val != null) {
    sessionStorage.setItem(key, JSON.stringify(val))
    return val
  } else {
    return get()
  }
}

window.serialize = function(form) {
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
        if (values.length) {
          data[field.name] = values
        }
      } else if (field.type == 'checkbox') {
        if (field.checked) {
          data[(x = field.name)]
            ? data[x].push(field.value)
            : data[x] = [field.value]
        }
      } else if (field.value != '' && field.type != 'radio' || field.checked) {
        data[field.name] = field.type == 'number'
          ? parseFloat(field.value)
          : field.value
      }
    }
  }
  return data
}

window.flash = function(message, opt) {
  if (!opt) opt = {}
  var el = q(opt.el || '#flash'), time = opt.time || 5000, name = opt.name || 'flash'
  if (!el) return null
  if (typeof window.__$timeout != 'undefined') {
    clearTimeout(window.__$timeout)
  }
  message = (message || cookie(name) || '').trim()
  cookie(name, null)
  scroll(0, 0)
  el.textContent = message
  el.style.opacity = 1
  if (time) window.__$timeout = setTimeout(function() { el.style.opacity = 0 }, time)
  return el
}
