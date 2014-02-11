_fallback = ->
  style = """<style>"""

  height = $(window).height()

  _SECTION = "body>section"

  style += """"""

  _android = -> @
  _ios = -> @
  _firefox = ->
    style += """
        @media screen and (min-width: 768px) and (orientation: landscape){
          section.active.extended_header > article {
            margin-top: 0;
          }
        }
    """

  # Firefox
  _firefox() if navigator.userAgent.toLowerCase().indexOf("firefox") isnt -1

  # Android
  _android() if $.os? and $.os.android

  # IOS
  _ios() if $.os? and $.os.ios

  style += """</style>"""
  $("head").append style