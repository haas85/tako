Tako.Aside = do (TK = Tako) ->
  aside = $ "aside"

  if aside.length > 0
    bck = null
    header = aside.children("header")
    aside.append $(document.createElement("div")).append(aside.children())
    new IScroll(aside[0], {
      probeType:  2
      mouseWheel: true
      scrollbars: false
      bounce: true
      click: false
      preventDefaultException: { tagName:/.*/ }
    })
    aside.prepend header

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

    $("aside *").each (index) ->
      $(@).on "tap click", (ev)->
        do hide

    bck.on "tap click", (ev)->
      do ev.preventDefault
      do ev.stopPropagation
      do hide

    show    : show
    hide    : hide
    toggle  : toggle