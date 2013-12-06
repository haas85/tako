TaKo.Aside = do (TK = TaKo) ->
  aside = $ "aside"
  if aside.length > 0
    $("body").append '<div data-element="aside_background"></div>'
  bck = $ "[data-element=aside_background]"

  show = ->
    bck.addClass "show"
    aside.addClass "show"

  hide = ->
    aside.removeClass "show"
    bck.removeClass "show"

  toggle = ->
    if aside.hasClass "show" then hide() else show()

  $("[data-action=aside]").each (element) ->
    $(@).on "tap", (ev)->
      do ev.preventDefault
      do ev.stopPropagation
      do toggle

  $("aside *").each (element) ->
    $(@).on "tap", (ev)->
      do ev.preventDefault
      do ev.stopPropagation
      do hide

  bck.on "tap", (ev)->
    do ev.preventDefault
    do ev.stopPropagation
    do hide

  show: show
  hide: hide
  toggle: toggle