Tako.Article = do (TK = Tako) ->

  goTo = (article_id)->
    el = current()
    if el[0].id isnt article_id
      el.removeClass("active")
      el.children("article.active").trigger "unload"
      window.scrollTo 0, 0
      _current = $("article##{article_id}").addClass "active"
      _current.children("article.active").trigger "load"
      $(".current[data-article]").removeClass "current"
      $("[data-article=#{article_id}]").addClass "current"

  current = ->
    if _current? then _current else _current = $ "article.active"

  _current = null

  (id) ->
    if id? then goTo id else current()

Tako.Article.title = (html, article_id) ->
  unless article_id?
    el = Tako.Article().children("header").children("h1")
  else
    el = $("article##{article_id}").children("header").children("h1")
  if el.length is 1
    if html? then el.html html else el.html()