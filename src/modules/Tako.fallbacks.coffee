_fallback = ->
  firefox_fix = """
    <style>
      @media screen and (min-width: 768px) and (orientation: landscape){
        section.active.extended_header > article {
          margin-top: 0;
        }
      }
    </style>
  """
  # Firefox
  if navigator.userAgent.toLowerCase().indexOf("firefox") isnt -1
    $("head").append firefox_fix