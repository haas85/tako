TaKo.Notification = do (TK = TaKo) ->
  active = false

  $("body").append """<div data-element="notification"></div>"""

  notification = $ "div[data-element=notification]"

  timeout = null
  callback = null


  success = (icon, title, content, time_out, cb) ->
    html = _iconHtml icon, "success", title, content
    _show html, time_out, cb

  error = (icon, title, content, time_out, cb) ->
    html = _iconHtml icon, "error", title, content
    _show html, time_out, cb

  loading = (title, time_out, cb) ->
    html = """<div class="window loader">
                <div>
                  <div id="circular3dG">
                    <div id="circular3d_1G" class="circular3dG"></div>
                    <div id="circular3d_2G" class="circular3dG"></div>
                    <div id="circular3d_3G" class="circular3dG"></div>
                    <div id="circular3d_4G" class="circular3dG"></div>
                    <div id="circular3d_5G" class="circular3dG"></div>
                    <div id="circular3d_6G" class="circular3dG"></div>
                    <div id="circular3d_7G" class="circular3dG"></div>
                    <div id="circular3d_8G" class="circular3dG"></div>
                  </div>
                </div>"""
    html += """<span class="title">#{title}</span>""" if title?
    html += "</div>"
    _show html, time_out, cb, "center"

  progress = (title, content, time_out, cb) ->
    html = """<div class="window">

              </div>"""
    _show html, time_out, cb

  hide = ->
    active = false
    clearTimeout timeout
    timeout = null
    notification.children(".window").removeClass "show"
    setTimeout _hide, 500

  _iconHtml = (icon, type, title, content) ->
    html = """<div class="window #{type}">
                <span class="icon #{icon}"></span>
                <div>
                  <span class="title">#{title}</span>
                  <div class="content">#{content}</div>
                </div>
              </div>"""

  _show = (html, time_out, cb, position="start") ->
    if not active
      active = true
      notification.html html
      notification.removeClass("center")
      .removeClass("start").addClass(position).addClass "show"
      setTimeout (-> notification.children(".window").addClass("show")), 1
      callback = cb if cb?
      if time_out?
        timeout = setTimeout hide, time_out*1000
    else
      original_cb = callback
      callback = ->
        do original_cb if original_cb?
        _show html, timeout, cb
      do hide

  _onclick = ->
    element = notification.children(".window")
    unless element.hasClass "loader"
      active = false
      clearTimeout timeout
      timeout = null
      element.removeClass "show"
      setTimeout _hide, 500

  _hide = ->
    notification.removeClass "show"
    cb = callback
    callback = null
    cb.call cb if cb?


  notification.bind "click", _onclick

  success: success
  error: error
  # confirm: confirm
  loading: loading
  progress: progress
  # custom: custom
  hide: hide