_fallback = ->
  style = """<style>"""

  height = $(window).height()

  style += """"""

  _android = -> @
  _ios = -> @
  _firefox = ->
    $("section").each ->
      _temp = document.createElement "section"
      $(_temp).append $(@).children()
      $(@).append _temp

  # Firefox
  _firefox() if navigator.userAgent.toLowerCase().indexOf("firefox") isnt -1

  # Android
  _android() if $.os? and $.os.android

  # IOS
  _ios() if $.os? and $.os.ios

  style += """</style>"""
  $("head").append style