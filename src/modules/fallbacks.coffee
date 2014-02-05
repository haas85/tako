_fallback = ->
  style = """<style>"""

  height = $(window).height()

  style += """
    section > article{min-height:#{height-50}px}
    section.extended_header > article{min-height:#{height-100}px}
    section.footer > article{min-height:#{height-115}px}
    section.extended_header.footer > article{min-height:#{height-165}px}
    section.no_header > article{min-height:#{height}px}
    section.no_header.footer > article{min-height:#{height-65}px}
  """

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