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
      @_phone = true
      Hammer(@container).on "touch dragdown release", @onPull

    onPull: (ev) =>
      switch ev.type
        when "touch"
          do @_setUp
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
          scrollY = @scroller[@scroll_string]
          return if scrollY > 5
          @updateHeight() unless @_anim
          ev.gesture.preventDefault()
          ev.gesture.stopPropagation()
          if @_slidedown_height >= @breakpoint
            @onArrived()
          else
            @onUp() if @showRelease
          @_slidedown_height = ev.gesture.deltaY * 0.4

    setHeight: (height) =>
      if @phone
        @container.style.transform = "translate(0, #{height}px) "
        @container.style.oTransform = "translate(0, #{height}px)"
        @container.style.msTransform = "translate(0, #{height}px)"
        @container.style.mozTransform = "translate(0, #{height}px)"
        @container.style.webkitTransform = "translate(0, #{height}px)"
      else
        height -= 511
        @pullrefresh.style.transform = "translate(0, #{height}px) "
        @pullrefresh.style.oTransform = "translate(0, #{height}px)"
        @pullrefresh.style.msTransform = "translate(0, #{height}px)"
        @pullrefresh.style.mozTransform = "translate(0, #{height}px)"
        @pullrefresh.style.webkitTransform = "translate(0, #{height}px)"
        @pullrefresh.style.marginBottom = "#{height}px"

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
      @setRotation 0
      @options.onRefresh.call @options.onRefresh

    onArrived: ->
      @showRelease = true
      @setRotation 180
      @text.html @options.releaseLabel

    onUp: ->
      @showRelease = false
      @setRotation 0
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
      @_anim = requestAnimationFrame(=>
        @updateHeight()
      )

    _setUp: =>
      width = if window.innerWidth > 0 then window.innerWidth else screen.width
      height = if window.innerHeight > 0 then window.innerHeight else screen.height
      if ((width > 768) and (width > height)) or (@container.nodeName isnt "ARTICLE")
          @phone = false
          @scroller = @container
          @scroll_string = "scrollTop"
        else
          @phone = true
          @scroller = window
          @scroll_string = "scrollY"


  new PullToRefresh(container, options)
