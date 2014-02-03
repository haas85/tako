_fallback = ->

  _android = -> @
  _ios = -> @
  _firefox = ->
    style = """
      <style>
        @media screen and (min-width: 768px) and (orientation: landscape){
          section.active.extended_header > article {
            margin-top: 0;
          }
        }
      </style>
    """
    $("head").append style

  # Firefox
  _firefox() if navigator.userAgent.toLowerCase().indexOf("firefox") isnt -1

  # Android
  _android() if $.os? and $.os.android

  # IOS
  _ios() if $.os? and $.os.ios