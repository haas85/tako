_fallback = ->
  inputs = """input[type="text"], input[type="password"], input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], textarea"""
  section_inputs = """section input[type="text"], section input[type="password"], section input[type="date"], section input[type="datetime"], section input[type="email"], section input[type="number"], section input[type="search"], section input[type="tel"], section input[type="time"], section input[type="url"], section textarea"""

  _softKeyboard = (elem, offset=0) ->
    top = elem.getBoundingClientRect().top
    container = $(elem).parents(["section.active"])
    container.scrollTop(top - container[0].getBoundingClientRect().top - offset)

  _android = ->
    $("body").attr("data-os", "android")
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
    $("body").attr("data-os", "ios")
    # $(inputs).on "tap", ->
    #   $(@).focus()
    # $(inputs).on "focus", ->
    #   $("body").height $(window).height()
    #   setTimeout (=> _softKeyboard(@, 50)), 700
    # $(inputs).on "blur", ->
    #   $("body").height("100%")

  _firefoxOs = -> $("body").attr("data-os", "firefoxos")

  _firefox = -> $("body").attr("data-browser", "firefox")

  _browser = ->
    browser = if $.browser.webkit and $.browser.chrome then "chrome" else "safari"
    $("body").attr("data-browser", browser)

  # Android
  return _android() if $.os.android

  # IOS
  return _ios() if $.os.ios

  #Firefox
  return _firefoxOs() if $.browser.firefox and ($.os.phone or $.os.tablet)

  # Firefox
  return _firefox() if $.browser.firefox

  # Browser
  return _browser() if $.browser?