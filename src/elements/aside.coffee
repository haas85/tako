Tako.Aside = do (TK = Tako) ->
  aside = $ "aside"
  bck = null
  full = false
  if aside.length > 0
    if aside.hasClass "full"
      full = true
    else
      $("body").append '<div data-element="aside_background"></div>'
      bck = $ "[data-element=aside_background]"
      bck.append aside

  show = ->
    bck.removeClass("hide").addClass "show" if not full
    aside.addClass "show"

  hide = ->
    aside.removeClass "show"
    if not full
      bck.addClass "hide"
      setTimeout ( -> bck.removeClass "show"), 150

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

  if aside.length > 0 and not full
    bck.on "tap", (ev)->
      do ev.preventDefault
      do ev.stopPropagation
      do hide

  show: show
  hide: hide
  toggle: toggle