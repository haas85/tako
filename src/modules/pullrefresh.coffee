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
      @refreshing = false
      @pullrefresh = $(PULLREFRESH)[0]
      $(@container).prepend @pullrefresh
      @icon = $(@pullrefresh).find ".icon"
      @text = $(@pullrefresh).find ".text"
      @_slidedown_height = 0
      @_anim = null
      @_dragged_down = false
      @showRelease = false
      mc = new Hammer.Manager $(@container)[0]
      mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }))
      mc.on "panmove", @onPull
      $(@container).on "touchstart",  =>
        $(@container).addClass "pulling"
        if not @refreshing
          @hide(false)

      $(@container).on "touchend", =>
        return if @refreshing
        cancelAnimationFrame @_anim
        if @_slidedown_height >= @breakpoint
          if @options.onRefresh
            do @onRefresh
          else
            do @hide
        else
          do @hide

    onPull: (ev) =>
      @_dragged_down = true
      return if @container.scrollTop > 5
      @updateHeight() unless @_anim
      do ev.preventDefault
      do ev.stopPropagation
      if @_slidedown_height >= @breakpoint
        @onArrived()
      else
        @onUp() if @showRelease
      if ev.deltaY  > 0
        @_slidedown_height = ev.deltaY * 0.5

    setHeight: (height) =>
      height -= 511
      @pullrefresh.style.transform = "translate(0, #{height}px)"
      @pullrefresh.style.webkitTransform = "translate(0, #{height}px)"
      @pullrefresh.style.mozTransform = "translate(0, #{height}px)"
      @pullrefresh.style.msTransform = "translate(0, #{height}px)"
      @pullrefresh.style.marginBottom = "#{height}px"
      @pullrefresh.style.oTransform = "translate(0, #{height}px)"

    onRefresh: ->
      @icon[0].className = "icon spin6 animated"
      @text.html @options.refreshLabel
      @setHeight @breakpoint - 10
      @refreshing = true
      @icon.removeClass("rotated")
      @options.onRefresh.call @options.onRefresh

    onArrived: ->
      @showRelease = true
      @icon.addClass("rotated")
      @text.html @options.releaseLabel

    onUp: ->
      @showRelease = false
      @icon.removeClass("rotated")
      @text.html @options.pullLabel

    hide: (remove_pulling=true)=>
      if @_dragged_down
        $(@container).removeClass "pulling" if remove_pulling
        @icon[0].className = "icon down-big"
        @text.html @options.pullLabel
        @_slidedown_height = 0
        @setHeight 0
        @icon.removeClass("rotated")
        cancelAnimationFrame @_anim
        @_anim = null
        @_dragged_down = false
        @refreshing = false

    updateHeight: =>
      height = @_slidedown_height - 511
      @pullrefresh.style.transform = "translate(0, #{height}px)"
      @pullrefresh.style.webkitTransform = "translate(0, #{height}px)"
      @pullrefresh.style.mozTransform = "translate(0, #{height}px)"
      @pullrefresh.style.msTransform = "translate(0, #{height}px)"
      @pullrefresh.style.marginBottom = "#{height}px"
      @pullrefresh.style.oTransform = "translate(0, #{height}px)"
      @_anim = requestAnimationFrame @updateHeight



  new PullToRefresh(container, options)
