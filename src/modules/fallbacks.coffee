_fallback = ->
  style = """<style>"""

  height = $(window).height()

  style += """"""

  _android = -> @
  _ios = -> @
  _firefox = ->
    style += """
      section > footer{bottom:6px;}
    """

  # Firefox
  _firefox() if navigator.userAgent.toLowerCase().indexOf("firefox") isnt -1

  # Android
  _android() if $.os? and $.os.android

  # IOS
  _ios() if $.os? and $.os.ios

  style += """</style>"""
  $("head").append style