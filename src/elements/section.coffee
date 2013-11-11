TaKo.Section = do (TK = TaKo) ->
  active = $("section.active")
  if active.length is 0 then $("section").first().addClass "active"

  goTo = (section_id)->
    $("section.active").removeClass "active"
    $("section##{section_id}").addClass "active"

  goTo: goTo