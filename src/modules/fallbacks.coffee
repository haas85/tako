_fallback = ->
  style = """<style>"""

  height = $(window).height()

  style += """"""

  _android = -> @
  _ios = -> @
  _firefox = ->
    style += """
      section > footer{bottom:6px;}
      body>section > article{height:#{height-50}px}
      body>section.extended_header > article{height:#{height-100}px}
      body>section.footer > article{height:#{height-115}px}
      body>section.extended_header.footer > article{height:#{height-165}px}
      body>section.no_header > article{height:#{height}px}
      body>section.no_header.footer > article{height:#{height-65}px}
      div[data-element="notification"] section.window.confirm > article .icon {margin-top:25px;}
      div[data-element="notification"] section.window.confirm > article div {margin-top:25px;}
    """

  # Firefox
  _firefox() if navigator.userAgent.toLowerCase().indexOf("firefox") isnt -1

  # Android
  _android() if $.os? and $.os.android

  # IOS
  _ios() if $.os? and $.os.ios

  style += """</style>"""
  $("head").append style