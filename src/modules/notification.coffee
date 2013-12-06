TaKo.Notification = do (TK = TaKo) ->
  active = false


  notification = $ """<div data-element="notification"></div>"""

  notification_window = $ """<div class="window"></div>"""

  notification.append notification_window

  $("body").append notification

  timeout = null
  callback = null


  success = (icon, title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "success top_position upwards margin", time_out, cb

  error = (icon, title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "error top_position upwards margin", time_out, cb

  loading = (title, time_out, cb) ->
    html = """<div id="circular_container">
                <div id="circular3dG">
                  <div id="circular3d_1G" class="circular3dG"></div>
                  <div id="circular3d_2G" class="circular3dG"></div>
                  <div id="circular3d_3G" class="circular3dG"></div>
                  <div id="circular3d_4G" class="circular3dG"></div>
                  <div id="circular3d_5G" class="circular3dG"></div>
                  <div id="circular3d_6G" class="circular3dG"></div>
                  <div id="circular3d_7G" class="circular3dG"></div>
                  <div id="circular3d_8G" class="circular3dG"></div>
                </div>"""
    html += """<span class="title">#{title}</span>""" if title?
    html += "</div>"
    _show html, "center not_clickable", time_out, cb

  progress = (icon, title, content, time_out, cb) ->
    html = """<span class="icon #{icon}"></span>
              <span class="title">#{title}</span>
              <div class="content padding bottom">#{content}</div>
              <div id="notification_progress"></div>
              """
    _show html, "center progress padding top not_clickable", time_out, cb
    progress = TK.ProgressBar "notification_progress", 0
    percent: (value) ->
      val = progress.percent value
      setTimeout (-> do hide), 150 if val is 100
      val

  confirm = (icon, title, content, accept, cancel, cb) ->
    html = """<span class="icon #{icon}">#{icon}</span>
              <span class="title">#{title}</span>
              <div class="content padding bottom clear">#{content}</div>
              <button class="button accept">#{accept.text}</button>
              <button class="button cancel">#{cancel.text}</button>
            """
    _show html, "confirm top_position downwards not_clickable", null, cb

  hide = ->
    active = false
    clearTimeout timeout
    timeout = null
    notification_window.removeClass "show"
    setTimeout _hide, 500

  _iconHtml = (icon, title, content) ->
    html = """<span class="icon #{icon}">#{icon}</span>
              <div>
                <span class="title">#{title}</span>
                <div class="content">#{content}</div>
              </div>"""

  _show = (html, classes, time_out, cb) ->
    if not active
      active = true
      do notification_window.removeClass
      notification_window.addClass "window " + classes
      notification_window.html html
      notification.addClass "show"
      setTimeout (-> notification_window.addClass("show")), 100
      callback = cb if cb?
      if time_out?
        timeout = setTimeout hide, time_out*1000
    else
      original_cb = callback
      callback = ->
        do original_cb if original_cb?
        _show html, timeout, cb
      do hide

  _ontap = (ev) ->
    do ev.preventDefault
    do ev.stopPropagation
    unless notification_window.hasClass "not_clickable"
      active = false
      clearTimeout timeout
      timeout = null
      notification_window.removeClass "show"
      setTimeout _hide, 500

  _hide = ->
    notification.removeClass "show"
    cb = callback
    callback = null
    cb.call cb if cb?


  notification.on "tap", _ontap

  success: success
  error: error
  confirm: confirm
  loading: loading
  progress: progress
  # custom: custom
  hide: hide