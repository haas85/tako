do ->
  lastTime = 0
  vendors = ["ms", "moz", "webkit", "o"]
  x = 0

  while x < vendors.length and not window.requestAnimationFrame
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"]
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] or window[vendors[x] + "CancelRequestAnimationFrame"]
    ++x
  unless window.requestAnimationFrame
    window.requestAnimationFrame = (callback, element) ->
      currTime = new Date().getTime()
      timeToCall = Math.max(0, 16 - (currTime - lastTime))
      id = window.setTimeout(->
        callback currTime + timeToCall
      , timeToCall)
      lastTime = currTime + timeToCall
      id
  unless window.cancelAnimationFrame
    window.cancelAnimationFrame = (id) ->
      clearTimeout id


Tako.Pull_Refresh = (container, options={})->
  options.pullLabel      = options.pullLabel or "Pull to refresh"
  options.releaseLabel   = options.releaseLabel or "Release to refresh"
  options.refreshLabel   = options.refreshLabel or "Loading..."
  options.onRefresh      = options.onRefresh or undefined
  container              = document.getElementById container

  class PullToRefresh
    constructor: (container, @options) ->
      PULLREFRESH = """<div class="pulltorefresh">
        <span class="icon down-big"></span><span class="text">#{@options.pullLabel}</span>
        </div>"""

      @breakpoint = 90
      @container = container
      @pullrefresh = $(PULLREFRESH)[0]
      $(@container).prepend @pullrefresh
      @icon = $(@pullrefresh).find ".icon"
      @text = $(@pullrefresh).find ".text"
      @_slidedown_height = 0
      @_anim = null
      @_dragged_down = false
      @showRelease = false
      Hammer(@container).on "touch dragdown release", @onPull

    onPull: (ev) =>
      switch ev.type
        when "touch"
          @hide() if not @refreshing
        when "release"
          return unless @_dragged_down
          cancelAnimationFrame @_anim
          if @_slidedown_height >= @breakpoint
            if @options.onRefresh
              do @onRefresh
            else
              do @hide
          else
            do @hide
        when "dragdown"
          @_dragged_down = true
          scrollY = window.scrollY
          if scrollY > 5
            return
          else window.scrollTo 0, 0  if scrollY isnt 0
          @updateHeight() unless @_anim
          ev.gesture.preventDefault()
          ev.gesture.stopPropagation()
          if @_slidedown_height >= @breakpoint
            @onArrived()
          else
            @onUp() if @showRelease
          @_slidedown_height = ev.gesture.deltaY * 0.4

    setHeight: (height) =>
      @container.style.transform = "translate(0, #{height}px) "
      @container.style.oTransform = "translate(0, #{height}px)"
      @container.style.msTransform = "translate(0, #{height}px)"
      @container.style.mozTransform = "translate(0, #{height}px)"
      @container.style.webkitTransform = "translate(0, #{height}px)"

    rotate: ->
      slided = if @_slidedown_height >= @breakpoint then @breakpoint else @_slidedown_height
      angle = slided * 180/ @breakpoint
      @setRotation angle

    setRotation: (angle) =>
      @icon[0].style.transform = "rotate(#{angle}deg)"
      @icon[0].style.oTransform = "rotate(#{angle}deg)"
      @icon[0].style.msTransform = "rotate(#{angle}deg)"
      @icon[0].style.mozTransform = "rotate(#{angle}deg)"
      @icon[0].style.webkitTransform = "rotate(#{angle}deg)"

    onRefresh: ->
      @icon[0].className = "icon spin6 animated"
      @text.html @options.refreshLabel
      @setHeight @breakpoint - 10
      @refreshing = true
      @options.onRefresh.call @options.onRefresh

    onArrived: ->
      @showRelease = true
      @text.html @options.releaseLabel

    onUp: ->
      @showRelease = false
      @text.html @options.pullLabel

    hide: =>
      @icon[0].className = "icon down-big"
      @text.html @options.pullLabel
      @_slidedown_height = 0
      @setHeight 0
      @setRotation 0
      cancelAnimationFrame @_anim
      @_anim = null
      @_dragged_down = false
      @refreshing = false

    updateHeight: =>
      @setHeight @_slidedown_height
      do @rotate
      @_anim = requestAnimationFrame(=>
        @updateHeight()
      )

  new PullToRefresh(container, options)
