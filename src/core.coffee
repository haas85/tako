window.TaKo = TaKo = {}

TaKo.init = ->
  if $("section.active").length is 0 then $("section").first().addClass "active"

  $("section").each ->
    if $(@).children("article.active").length is 0
      $(@).children("article").first().addClass "active"

