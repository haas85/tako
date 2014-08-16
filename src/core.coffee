window.Tako = window.tk = Tako = do ->

  logging = {}
  Object.defineProperty logging, "LOG",   {get: -> 4}
  Object.defineProperty logging, "INFO",  {get: -> 3}
  Object.defineProperty logging, "WARN",  {get: -> 2}
  Object.defineProperty logging, "ERROR", {get: -> 1}

  if $.os.wp
    _tap = "click"
    _doubletap = "dblclick"

  else
    _tap = "tap"
    _doubletap = "doubletap"

  remaining = 0
  callbacks = []

  init = (options={})->
    try
      Tako.logging.level = options.logging or false
      if options.articles?
        remaining = options.articles.length
        for article in options.articles
          $.ajax
            url           : article
            crossDomain   : true
            dataType      : 'html'
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
    hash = document.location.hash or ""
    if hash isnt "" and hash isnt "#"
      hash = hash.replace "#", ""
      hash = hash.split "/"
    if hash.length is 2
      document.getElementById(hash[0]).classList.add "active"
      document.getElementById(hash[1]).classList.add "active"
    else
      if document.querySelectorAll("article.active").length is 0 then $("article").first().addClass "active"
    Array::forEach.call document.getElementsByTagName("section"), (el, index) ->
      el.appendChild $(document.createElement("div")).append($(el).children())[0]
    $("article").each ->
      $this = $(@)
      if @getElementsByTagName("header").length isnt 0 then @.setAttribute "data-header", ""
      if $this.children("nav").length isnt 0 then @.setAttribute "data-nav", ""
      if @getElementsByTagName("footer").length isnt 0 then @.setAttribute "data-footer", ""
      if not @querySelector("section.active")?
        $this.children("section").first().addClass "active"
    _current_art = document.querySelector("article.active section.active").id
    $("[data-visible=#{_current_art}]").addClass "show"
    $("[data-section=#{$("article.active section.active").attr("id")}]").addClass "current"
    $("[data-article=#{$("article.active").attr("id")}]").addClass "current"
    _setNavigation "aside", "data-article", Tako.Article, "tap"
    _setNavigation "aside", "data-section", Tako.Section, "tap"
    _setNavigation "article", "data-article", Tako.Article, "click"
    _setNavigation "article", "data-section", Tako.Section, "click"

    for element in document.querySelectorAll("[data-action=aside]")
      element.addEventListener "click", ((ev) ->
        do ev.preventDefault
        do ev.stopPropagation
        do Tako.Aside.toggle
        ), false

    do _fallback
    do _articleListeners
    do _loaded

  _setNavigation = (container, query, action, event) ->
    $("#{container} [#{query}]").each (element) ->
      $(@).on event, (ev) ->
        do ev.preventDefault
        do ev.stopPropagation
        _navigate action, ev.target, query

  _onReceive = (data) ->
      remaining--
      $("body").append(data)
      if remaining is 0 then do _setup

  _onError = () ->
    remaining--
    console.error "Article not downloaded"
    if remaining is 0 then do _setup

  _loaded = ->
    cb.call cb for cb in callbacks

  _navigate = (action, target, query) ->
    if target?
      nav = target.attributes.getNamedItem query
      if nav?
        action nav.value
      else
        _navigate action, target.parentElement, query

  init        : init
  onReady     : onReady
  viewType    : viewType
  tap         : _tap
  double_tap  : _doubletap
  logging     : logging

