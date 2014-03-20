_fallback = ->
  style = """<style>"""

  height = $(window).height()

  style += """"""

  inputs = """input[type="text"], input[type="password"], input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], textarea"""
  section_inputs = """section input[type="text"], section input[type="password"], section input[type="date"], section input[type="datetime"], section input[type="email"], section input[type="number"], section input[type="search"], section input[type="tel"], section input[type="time"], section input[type="url"], section textarea"""

  _moveChilds = (elements) ->
    elements.each ->
      $(@).append $(document.createElement("div")).append($(@).children())

  _softKeyboard = (elem, offset=0) ->
    top = elem.getBoundingClientRect().top
    container = $(elem).parents(["section.active"])
    container.scrollTop(top - container[0].getBoundingClientRect().top - offset)

  _android = ->
    _moveChilds $("body > article > section.indented")
    android_4 = new RegExp("^4[\.]")
    android_23 = new RegExp("^2[\.]3[\.]")

    if android_4.test $.os.version
      $(section_inputs).on "focus", ->
        setTimeout (=> _softKeyboard(@, 20)), 400

      $("select").on "focus", (ev)->
        ev.preventDefault()
        ev.stopPropagation()
        Select $(ev.target)

    if android_23.test $.os.version
      $("body").append $("<article data-selectbox><div></div></article>")
      $("select").on "focus", (ev)->
        ev.preventDefault()
        ev.stopPropagation()
        Select $(ev.target)



  _ios = ->
    _moveChilds $("body > article > section.indented")
    # $(inputs).on "tap", ->
    #   $(@).focus()
    # $(inputs).on "focus", ->
    #   $("body").height $(window).height()
    #   setTimeout (=> _softKeyboard(@, 50)), 700
    # $(inputs).on "blur", ->
    #   $("body").height("100%")

  _firefox = ->
    _moveChilds($("body > article > section.indented")) if $.os? and $.os.phone

  _browser = ->
    if (not $.os.tablet) and (not $.os.phone)
      _moveChilds($("body > article > section.indented"))

  # Firefox
  _firefox() if navigator.userAgent.toLowerCase().indexOf("firefox") isnt -1

  # Android
  _android() if $.os? and $.os.android

  # IOS
  _ios() if $.os? and $.os.ios

  # Browser
  _browser() if $.browser?

  # style += """</style>"""
  # $("head").append style