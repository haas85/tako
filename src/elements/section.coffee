Tako.Section = do (TK = Tako) ->
  goTo = (section_id, back=false)->
    _current_section = current()
    _current_article = _current_section.parent()

    modifier = if back then "back-" else ""

    new_section = $("section##{section_id}")
    if new_section.length is 0
      return false

    new_article = new_section.parent()

    console.log new_section
    console.log _current_section

    if _current_section[0].id isnt new_section[0].id
      new_article.children(".active").removeClass("active")
      _current = new_section.addClass "active"

    if _current_article[0].id isnt new_article[0].id
      Tako.Article new_article[0].id, back

    if new_section.attr("data-scrolltop")?
      new_section.scrollTop(0)

    _navigate = false
    document.location.hash = "##{new_article[0].id}/#{section_id}"
    _navigate = true

    _current_section.trigger "unload"
    new_section.trigger "load"

    $(".current[data-section]").removeClass "current"
    $("[data-section=#{section_id}]").addClass "current"
    $("[data-visible]").removeClass "show"
    $("[data-visible=#{section_id}]").addClass "show"

    return true

  current = ->
    if _current? then _current else _current = $ "article.active section.active"

  _current = null

  (id, back) ->
    if id? then goTo id, back else current()

