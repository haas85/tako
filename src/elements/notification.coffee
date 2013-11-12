TaKo.Notification = do (TK = TaKo) ->

  active = false
  $("body").append """<div data-element="notification">
        <div class="window">
          <span class="title"></span>
          <div class="content"></div>
          </div>
      </div>"""

  notification = $ "div[data-element=notification]"
  notification_window = notification.children ".window"

  timeout = null
  callback = null


  show = (title, content, time_out, cb) ->
    if not active
      active = true
      notification_window.children(".title").html title
      notification_window.children(".content").html content
      notification.addClass "show"
      setTimeout (-> notification_window.addClass("show")), 1
      callback = cb if cb?
      if time_out?
        timeout = setTimeout hide, time_out*1000


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

  show: show
  hide: hide