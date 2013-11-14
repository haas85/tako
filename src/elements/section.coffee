TaKo.Section = do (TK = TaKo) ->

  title = (html, section_id) ->
    unless section_id?
      el = current().children("header").children("h1")
    else
      el = $("section##{section_id}").children("header").children("h1")
    if el.length is 1
      if html? then el.html html else el.html()

  goTo = (section_id)->
    $("section.active").removeClass "active"
    _current = $("section##{section_id}").addClass "active"
    $(".current[data-section]").removeClass "current"
    $("[data-section=#{section_id}]").addClass "current"

  current = ->
    if _current? then _current else _current = $ "section.active"

  $("[data-section]").each (element) ->
    $(@).bind "click", => goTo $(@).attr "data-section"

  _current = null

  goTo: goTo
  title: title
  current: current