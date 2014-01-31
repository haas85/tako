Tako.Notification = do (TK = Tako) ->
  active = false


  notification = $ """<div data-element="notification"><div></div</div>"""
  # notification = $ """<div></div>"""
  # notification_bck.append notification

  notification_window = $ """<section class="window"></section>"""

  notification.find("div").append notification_window

  $("body").append notification

  timeout = null
  callback = null


  success = (icon, title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "success center upwards", true, time_out, cb

  error = (icon, title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "error center downwards", true, time_out, cb

  loading = (title, time_out, args...) ->
    if args[0]? and typeof(args[0]) is "string"
      icon = args[0]
      cb   = args[1]
    else
      icon = "spin6"
      cb = args[0]
    html = ""
    classes = "loading center not_clickable"
    if title?
      html = """
      <header>
          <span>#{title}</span>
      </header>"""
    else
      classes += " squared"
    html += """
    <article>
      <span class="icon #{icon} animated"></span>
    </article>
    """
    _show html, classes, true, time_out, cb

  progress = (icon, title, content, time_out, cb) ->
    html = """<header class="#{if icon? then 'align-left' else 'center'}">"""
    html += """<span class="icon #{icon}"></span>""" if icon?
    html +=  """
    <span>#{title}</span>
    </header>
    <article>
      <span class="content">#{content}</span>
      <div id="notification_progress"></div><div style="clear:both"></div>
    </article>
    """
    _show html, "center progress not_clickable", true, time_out, cb
    progress = TK.ProgressBar "notification_progress", 0
    percent: (value) ->
      val = progress.percent value
      setTimeout (-> do hide), 150 if val is 100
      val

  confirm = (icon, title, content, accept, cancel, cb) ->
    html = """<span class="icon #{icon}"></span>
              <span class="title">#{title}</span>
              <div class="content padding bottom clear">#{content}</div>
              <button class="button accept">#{accept}</button>
              <button class="button cancel">#{cancel}</button>
            """
    _show html, "confirm top_position downwards not_clickable", null, null

    buttons = notification_window.children("button")
    buttons.bind "tap", (element) ->
      buttons.unbind "tap"
      do hide
      if $(@).hasClass("accept")
        cb.call cb, true
      else
        cb.call cb, false

  hide = ->
    active = false
    clearTimeout timeout
    timeout = null
    notification_window.removeClass "show"
    setTimeout _hide, 500

  _iconHtml = (icon, title, content) ->
    """
    <header>
      <span class="icon #{icon}"></span>
    </header>
    <article>
      <span class="title">#{title}</span>
      <span class="content">#{content}</span>
    </article>
    """



  _show = (html, classes, flexed, time_out, cb) ->
    if not active
      active = true
      do notification_window.removeClass
      notification_window.addClass "window " + classes
      notification_window.html html
      notification.addClass "show"
      if flexed
        notification.addClass "flexed"
      else
        notification.removeClass "flexed"
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