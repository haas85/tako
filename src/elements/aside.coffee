Tako.Aside = do (TK = Tako) ->
  aside = $ "aside"

  if aside.length > 0
    bck = null
    full = false
    android = false

    if $.os? and $.os.android
      android = true

    bck = $ '<div data-element="aside_background"></div>'
    $("body").append bck
    if aside.hasClass "full"
      full = true
      bck.addClass "full"
      aside.after bck
    else
      bck.append aside

    show = ->
      $("section.active").addClass "non_animated" if full and android
      $("section.active").addClass "asided"
      bck.removeClass("hide").addClass "show"
      aside.addClass "show"

    hide = ->
      $("section.active").removeClass "asided"
      aside.removeClass "show"
      bck.addClass "hide"
      setTimeout ( ->
        bck.removeClass "show"
        $("section.active").removeClass "non_animated"
      ), 150

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