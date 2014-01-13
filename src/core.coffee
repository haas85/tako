window.TaKo = TaKo = do ->

  remaining = 0
  callbacks = []

  init = (options={})->
    if options.sections?
      remaining = options.sections.length
      for section in options.sections
        $.ajax
          url           : section
          crossDomain   : true
          success       : _onReceive
          error         : _onError
    else
      do _setup

  onReady = (callback) -> callbacks.push callback

  _setup = ->
    if $("section.active").length is 0 then $("section").first().addClass "active"
    $("body").hammer()
    $("section").each ->
      if $(@).children("article.active").length is 0
        $(@).children("article").first().addClass "active"
    do _loaded

  _onReceive = (data) ->
      remaining--
      $("body").append(data)
      if remaining is 0 then do _setup

  _onError = (data) ->
    remaining--
    console.error "Section not downloaded"
    if remaining is 0 then do _setup

  _loaded = ->
    cb.call cb for cb in callbacks

  init      : init
  onReady   : onReady

