_fallback = ->
  style = """<style>"""

  height = $(window).height()

  style += """"""

  _moveChilds = (elements) ->
    elements.each ->
      $(@).append $(document.createElement("div")).append($(@).children())

  _android = -> _moveChilds $("body > article > section")
  _ios = -> @
  _firefox = -> @
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