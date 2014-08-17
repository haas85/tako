Tako.iScroll = (el) ->
  new IScroll(el, {
    probeType:  2
    mouseWheel: true
    scrollbars: false
    bounce: false
    click: false
    preventDefaultException: { tagName:/.*/ }
  })