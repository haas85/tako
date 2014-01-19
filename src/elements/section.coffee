Tako.Section = do (TK = Tako) ->

  title = (html, section_id) ->
    unless section_id?
      el = current().children("header").children("h1")
    else
      el = $("section##{section_id}").children("header").children("h1")
    if el.length is 1
      if html? then el.html html else el.html()

  goTo = (section_id)->
    el = current()
    if el[0].id isnt section_id
      el.removeClass("active")
      el.children("article.active").trigger "unload"
      _current = $("section##{section_id}").addClass "active"
      _current.children("article.active").trigger "load"
      $(".current[data-section]").removeClass "current"
      $("[data-section=#{section_id}]").addClass "current"

  current = ->
    if _current? then _current else _current = $ "section.active"

  $("[data-section]").each (element) ->
    $(@).bind "tap", (ev)=>
      do ev.preventDefault
      do ev.stopPropagation
      goTo $(@).attr "data-section"

  _current = null

  goTo: goTo
  title: title
  current: current