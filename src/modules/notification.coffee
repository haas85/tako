Tako.Notification = do (TK = Tako) ->
  active = false

  notification = $ """<div data-element="notification"><div></div</div>"""
  notification_window = $ """<article class="window"></article>"""

  notification.find("div").append notification_window
  $("body").append notification

  timeout = null
  callback = null

  success = (icon="ok", title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "success center upwards", time_out, cb

  error = (icon="deny", title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "error center downwards", time_out, cb

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
    <section>
      <span class="icon #{icon} animated"></span>
    </section>
    """
    _show html, classes, time_out, cb

  progress = (icon, title, content, time_out, cb) ->
    html = """<header class="#{if icon? then 'align-left' else 'center'}">"""
    html += """<span class="icon #{icon}"></span>""" if icon?
    html +=  """
    <span>#{title}</span>
    </header>
    <section>
      <span class="content">#{content}</span>
      <div id="notification_progress"></div><div style="clear:both"></div>
    </section>
    """
    _show html, "center progress not_clickable", time_out, cb
    progress = TK.ProgressBar "notification_progress", 0
    percent: (value) ->
      val = progress.percent value
      setTimeout (-> do hide), 150 if val is 100
      val

  confirm = (icon="help-circled", title, content, accept="Accept", cancel="Cancel", cb) ->
    html = """<section>
                <span class="icon #{icon}"></span>
                <div>
                  <span class="title">#{title}</span><br>
                  <span class="content padding bottom clear">#{content}</span>
                </div>
              </section>
              <footer>
                <button class="button accept">#{accept}</button>
                <button class="button cancel">#{cancel}</button>
              </footer>
            """
    _show html, "center confirm not_clickable", null, null

    buttons = notification_window.find("button")
    buttons.one "click", (element) ->
      do hide
      if $(@).hasClass("accept")
        cb.call cb, true
      else
        cb.call cb, false

  custom = (title, content, closable=true, classes="", timeout, cb) ->
    header = ""
    if title? and closable
      header = """
        <header>
          <span class="close icon deny"></span>
          <h1>
            <span>#{title}</span>
          </h1>
        </header>"""
    else if title?
      header = """<header><h1>
        <span>#{title}</span>
      </h1></header>"""
    html = """
    #{header}
    <section>"""
    html += """<span class="close black icon deny"></span>""" if closable and not title?
    html += """#{content}
    </section>
    """

    _show html, "center custom not_clickable #{classes}", timeout, cb
    notification.find(".close").on "click", _close

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
    <section>
      <span class="title">#{title}</span>
      <span class="content">#{content}</span>
    </section>
    """



  _show = (html, classes, time_out, cb) ->
    if not active
      active = true
      do notification_window.removeClass
      notification_window.addClass "window " + classes
      notification_window.html html
      callback = cb if cb?
      if time_out?
        timeout = setTimeout hide, time_out*1000
      setTimeout (=>
        notification.addClass "show"
        setTimeout (->
          # height = notification_window.offset().height
          height = screen.height * 0.9
          header = notification_window.children("header")
          header_height = if header.length then header.offset().height else 0
          notification_window.children("section").css "maxHeight", "#{height-header_height}px"
          notification_window.addClass("show")), 100
      ), 10
    else
      original_cb = callback
      callback = ->
        do original_cb if original_cb?
        _show(html, classes, timeout, cb)
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

  _close = (ev) ->
    do ev.preventDefault
    do ev.stopPropagation
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


  notification.on "click", _ontap

  active      : -> active
  success     : success
  error       : error
  confirm     : confirm
  loading     : loading
  progress    : progress
  custom      : custom
  hide        : hide
