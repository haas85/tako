window.Tako = Tako = do ->

  remaining = 0
  callbacks = []

  init = (options={})->
    try
      if options.articles?
        remaining = options.articles.length
        for article in options.articles
          $.ajax
            url           : article
            crossDomain   : true
            success       : _onReceive
            error         : _onError
      else
        do _setup
    catch exception
      console.error exception

  onReady = (callback) -> callbacks.push callback

  viewType = ->
    width = if window.innerWidth > 0 then window.innerWidth else screen.width
    height = if window.innerHeight > 0 then window.innerHeight else screen.height
    if (width > 768) and (width > height) then "TABLET/DESKTOP" else "PHONE"

  _setup = ->
    if $("article.active").length is 0 then $("article").first().addClass "active"
    $("body").hammer()
    $("body > article > section.indented").each ->
      $(@).append $(document.createElement("div")).append($(@).children())
    $("article").each ->
      if $(@).children("section.active").length is 0
        $(@).children("section").first().addClass "active"
    _current_art = $("article.active section.active")[0].id
    $("[data-visible=#{_current_art}]").addClass "show"
    $("[data-section=#{$("article.active section.active").attr("id")}]").addClass "current"
    $("[data-article=#{$("article.active").attr("id")}]").addClass "current"
    _setNavigation "data-article", Tako.Article
    _setNavigation "data-section", Tako.Section
    $("[data-action=aside]").each (element) ->
      $(@).on "tap", (ev)->
        do ev.preventDefault
        do ev.stopPropagation
        do Tako.Aside.toggle

    do _fallback
    do _loaded

  _setNavigation = (query, action) ->
    $("[#{query}]").each (element) ->
      if @.nodeName is "LI"
        $(@).children().each ->
          $(@).bind "tap", (ev) ->
            do ev.preventDefault
            do ev.stopPropagation
            action $(@).parent().attr(query)
      $(@).bind "tap", (ev) ->
        do ev.preventDefault
        do ev.stopPropagation
        action $(ev.target).attr(query)

  _onReceive = (data) ->
      remaining--
      $("body").append(data)
      if remaining is 0 then do _setup

  _onError = (data) ->
    remaining--
    console.error "Article not downloaded"
    if remaining is 0 then do _setup

  _loaded = ->
    cb.call cb for cb in callbacks

  init      : init
  onReady   : onReady
  viewType  : viewType

