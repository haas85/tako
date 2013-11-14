TaKo.Section = do (TK = TaKo) ->


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
  current: current