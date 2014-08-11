Tako.Article = do (TK = Tako) ->

  goTo = (article_id, back=false)->
    el = current()
    modifier = if back then "back-" else ""
    if el[0].id isnt article_id
      width = el.offset().width
      el.removeClass("active")
      el.attr "data-direction","#{modifier}out"
      _current = $("article##{article_id}").attr "data-direction", "#{modifier}in"
      if Tako.viewType() is "TABLET/DESKTOP" and document.getElementsByTagName("aside").length isnt 0
        el.addClass("asided").css "width", "#{width}px"
        _current.addClass("asided").css "width", "#{width}px"
      $(".current[data-article]").removeClass "current"
      $("[data-article=#{article_id}]").addClass "current"

  current = ->
    if _current? then _current else _current = $ "article.active"

  _current = null

  (id, back) -> if id? then goTo id, back else current()



Tako.Article.title = (html, article_id) ->
  unless article_id?
    el = Tako.Article().children("header").children("h1")
  else
    el = $("article##{article_id}").children("header").children("h1")
  if el.length is 1
    if html? then el.html html else el.html()

_articleListeners = ->
  $("article").on "animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd", (event) ->
    if event.target.nodeName.toUpperCase() is "ARTICLE"
      if (event.target.getAttribute("data-direction") is "in") or (event.target.getAttribute("data-direction") is "back-in")
        event.target.classList.add "active"
        $(event.target).trigger "load"
        document.location.hash = "##{document.querySelector("article.active").id}/#{document.querySelector("article.active section.active").id}"
      else
        $(event.target).trigger "unload"
      event.target.removeAttribute "data-direction"
      if Tako.viewType() is "TABLET/DESKTOP"
        event.target.classList.remove "asided"
        event.target.style.width = "auto"