window.Tako = Tako = do ->

  remaining = 0
  callbacks = []

  init = (options={})->
    try
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
    catch exception
      console.error exception

  onReady = (callback) -> callbacks.push callback

  _setup = ->
    if $("section.active").length is 0 then $("section").first().addClass "active"
    $("body").hammer()
    $("section").each ->
      if $(@).children("article.active").length is 0
        $(@).children("article").first().addClass "active"
    _current_art = $("section.active article.active")[0].id
    $("[data-visible=#{_current_art}]").addClass "show"
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

