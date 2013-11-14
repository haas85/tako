TaKo.Article = do (TK = TaKo) ->

  goTo = (article_id)->
    _current_article = $("section.active article.active")
    _current_section = _current_article.parent()

    _current = $("article##{article_id}")
    new_section = _current.parent()

    if _current_article[0].id isnt _current[0].id
      new_section.children().removeClass "active"
      _current.addClass "active"

    if _current_section[0].id isnt new_section[0].id
      TaKo.Section.goTo new_section[0].id

  current = ->
    if _current? then _current else _current = $ "section.active article.active"

  $("[data-article]").each (element) ->
    $(@).bind "click", => goTo $(@).attr "data-article"

  _current = null

  goTo: goTo
  current: current