Tako.Aside = do (TK = Tako) ->
  aside = $ "aside"

  if aside.length > 0
    bck = null

    bck = $ '<div data-element="aside_background"></div>'
    $("body").append bck
    bck.addClass "full" if aside.hasClass "full"
    # bck.append aside

    show = ->
      bck.removeClass("hide").addClass "show"
      aside.addClass "show"

    hide = ->
      aside.removeClass "show"
      bck.addClass "hide"
      setTimeout ( ->
        bck.removeClass "show"
      ), 150

    toggle = ->
      if TK.viewType() is "PHONE"
        if aside.hasClass "show" then hide() else show()

    $("aside *").each (element) ->
      $(@).on Tako.tap, (ev)->
        do ev.preventDefault
        do ev.stopPropagation
        do hide

    bck.on Tako.tap, (ev)->
      do ev.preventDefault
      do ev.stopPropagation
      do hide

    show    : show
    hide    : hide
    toggle  : toggle