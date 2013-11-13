TaKo.Section = do (TK = TaKo) ->

  goTo = (section_id)->
    $("section.active").removeClass "active"
    $("section##{section_id}").addClass "active"
    $(".current[data-section]").removeClass "current"
    $("[data-section=#{section_id}]").addClass "current"

  $("[data-section]").each (element) ->
    $(@).bind "click", => goTo $(@).attr "data-section"

  goTo: goTo