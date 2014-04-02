Tako.Section = do (TK = Tako) ->

  goTo = (section_id)->
    _current_section = current()
    _current_article = _current_section.parent()

    new_section = $("section##{section_id}")
    new_article = new_section.parent()

    if _current_section[0].id isnt new_section[0].id
      new_article.children().removeClass "active"
      _current = new_section.addClass "active"

    if _current_article[0].id isnt new_article[0].id
      Tako.Article new_article[0].id
    else
      _current_section.trigger "unload"
      _current = new_section.trigger "load"

    $(".current[data-section]").removeClass "current"
    $("[data-section=#{section_id}]").addClass "current"
    $("[data-visible]").removeClass "show"
    $("[data-visible=#{section_id}]").addClass "show"

  current = ->
    if _current? then _current else _current = $ "article.active section.active"

  _current = null

  (id) ->
    if id? then goTo id else current()