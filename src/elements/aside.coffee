TaKo.Aside = do (TK = TaKo) ->
  aside = $ "aside"
  bck = $ "#background"

  show = ->
    bck.css "z-index", "109"
    aside.addClass "show"

  hide = ->
    aside.removeClass "show"
    bck.css "z-index", "0"

  toggle = ->
    if aside.hasClass "show" then hide() else show()

   $("[data-action=aside]").each (element) ->
    $(@).bind "click", -> do toggle

  show: show
  hide: hide
  toggle: toggle