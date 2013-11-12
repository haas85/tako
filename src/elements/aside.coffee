TaKo.Aside = do (TK = TaKo) ->
  aside = $ "aside"
  if aside.length > 0
    $("body").append '<div id="background"></div>'
  bck = $ "#background"

  show = ->
    bck.addClass "show"
    aside.addClass "show"

  hide = ->
    aside.removeClass "show"
    bck.removeClass "show"

  toggle = ->
    if aside.hasClass "show" then hide() else show()

   $("[data-action=aside]").each (element) ->
    $(@).bind "click", -> do toggle

  show: show
  hide: hide
  toggle: toggle