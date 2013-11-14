TaKo.Scroll = do (TK = TaKo) ->
  init = (options={})->
    $(".scroll").each (element) ->
      el = $ @
      config =
        hScroll: el.hasClass "horizontal"
        vScroll: el.hasClass "vertical"
        hScrollbar: if options.scrollbar? then options.scrollbar else false
        vScrollbar: if options.scrollbar? then options.scrollbar else false
        fadeScrollbar: if options.fade? then options.fade else false
        hideScrollbar: if options.hide_scrollbar? then options.hide_scrollbar else true
        bounce: if options.bounce? then options.bounce else true
        momentum: if options.momentum? then options.momentum else false
        lockDirection: if options.lock_direction? then options.lock_direction else false
      console.log config
      new iScroll(@id, config)

  init: init