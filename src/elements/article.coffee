Tako.Article = do (TK = Tako) ->

  goTo = (article_id)->
    el = current()
    if el[0].id isnt article_id
      width = el.offset().width
      el.removeClass("active")
      el.attr "data-direction","out"
      _current = $("article##{article_id}").attr "data-direction", "in"
      if Tako.viewType() is "TABLET/DESKTOP"
        el.addClass("asided").css "width", "#{width}px"
        _current.addClass("asided").css "width", "#{width}px"
      $(".current[data-article]").removeClass "current"
      $("[data-article=#{article_id}]").addClass "current"

  current = ->
    if _current? then _current else _current = $ "article.active"

  _current = null

  (id) -> if id? then goTo id else current()



Tako.Article.title = (html, article_id) ->
  unless article_id?
    el = Tako.Article().children("header").children("h1")
  else
    el = $("article##{article_id}").children("header").children("h1")
  if el.length is 1
    if html? then el.html html else el.html()

_articleListeners = ->
  $("article").on "animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd", (event) ->
    if event.target.getAttribute("data-direction") is "in"
      event.target.classList.add "active"
      $(event.target).trigger "load"
    else
      $(event.target).trigger "unload"
    event.target.removeAttribute "data-direction"
    event.target.classList.remove "asided"