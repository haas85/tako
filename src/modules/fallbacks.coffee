_fallback = ->
  style = """<style>"""

  height = $(window).height()

  style += """"""

  inputs = """input[type="text"], input[type="password"], input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], textarea"""

  _moveChilds = (elements) ->
    elements.each ->
      $(@).append $(document.createElement("div")).append($(@).children())

  _softKeyboard = (elem, offset=0) ->
    top = elem.getBoundingClientRect().top
    container = $(elem).parents(["section.active"])
    container.scrollTop(top - container[0].getBoundingClientRect().top - offset)

  _android = ->
    _moveChilds $("body > article > section")
    $(inputs).on "focus", ->
      setTimeout (=> _softKeyboard(@)), 400

  _ios = ->
    _moveChilds $("body > article > section")
    $(inputs).on "tap", ->
      $(@).focus()
    $(inputs).on "focus", ->
      $("body").height $(window).height()
      setTimeout (=> _softKeyboard(@, 50)), 700
    $(inputs).on "blur", ->
      $("body").height("100%")

  _firefox = ->
    _moveChilds($("body > article > section.indented")) if $.os? and $.os.phone

  _browser = ->
    _moveChilds($("body > article > section.indented")) if not $.os?

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