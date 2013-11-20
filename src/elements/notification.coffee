TaKo.Notification = do (TK = TaKo) ->

  active = false
  $("body").append """<div data-element="notification">
        <div class="window">
          <span class="icon">V</span>
          <div>
            <span class="title"></span>
            <div class="content">
          </div></div>
          </div>
      </div>"""

  notification = $ "div[data-element=notification]"
  notification_window = notification.children ".window"

  timeout = null
  callback = null


  _show = (type, title, content, time_out, cb) ->
    if not active
      active = true
      notification_window.addClass type
      notification_window.children("div").children(".title").html title
      notification_window.children("div").children(".content").html content
      notification.addClass "show"
      setTimeout (-> notification_window.addClass("show")), 1
      callback = cb if cb?
      if time_out?
        timeout = setTimeout hide, time_out*1000

  success = (title, content, time_out, cb) ->
    _show "success", title, content, time_out, cb



  hide = ->
    active = false
    clearTimeout timeout
    timeout = null
    notification_window.removeClass "show"
    setTimeout _hide, 500

  _hide = ->
    notification.removeClass "show"
    callback.call callback if callback?
    callback = null


  notification.bind "click", hide

  success: success
  # error: error
  # confirm: confirm
  # loading: loading
  # progress: progress
  # custom: custom
  hide: hide