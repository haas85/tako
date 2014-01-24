Tako.Aside = do (TK = Tako) ->
  aside = $ "aside"

  if aside.length > 0
    bck = null
    full = false
    android23 = false

    if $.os? and $.os.android and $.os.version.indexOf("2.3") isnt -1
      android23 = true

    bck = $ '<div data-element="aside_background"></div>'
    $("body").append bck
    if aside.hasClass "full"
      full = true
      bck.addClass "full"
      aside.after bck
    else
      bck.append aside

    show = ->
      $("section.active header").addClass "asided" if full and android23
      bck.removeClass("hide").addClass "show"
      aside.addClass "show"

    hide = ->
      $("section.active header").removeClass "asided" if full and android23
      aside.removeClass "show"
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

    bck.on "tap", (ev)->
      do ev.preventDefault
      do ev.stopPropagation
      do hide

    show    : show
    hide    : hide
    toggle  : toggle