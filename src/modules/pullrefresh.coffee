Tako.Pull_Refresh = (container, options={}) ->
  options.pullLabel      = options.pullLabel or "Pull to refresh"
  options.releaseLabel   = options.releaseLabel or "Release to refresh"
  options.refreshLabel   = options.refreshLabel or "Loading..."
  options.onRefresh      = options.onRefresh or undefined

  class PullRefresh

    constructor: (container, @options) ->
      PULLREFRESH = """<div class="pulltorefresh">
        <span class="icon down-big"></span><span class="text">#{@options.pullLabel}</span>
        </div>"""

      @el = $(PULLREFRESH)
      container = $("##{container}")
      container.prepend @el
      container.on "dragdown", @onDragDown
      container.on "release", @onRelease
      @scrolled = if container[0].nodeName is "ARTICLE" then $("body") else container
      @initial = parseInt(@el.css("margin-bottom").replace "px", "")
      @initial_delta = null

    onDragDown: (event) =>
      if @scrolled.scrollTop() is 0
        if @initial_delta is null
          @initial_delta = event.gesture.deltaY
          displacement = 0
        else
          displacement = event.gesture.deltaY  - @initial_delta
        @current = @initial + displacement
        @current = 0 if @current > 0
        _transform @el, @current

    onRelease: =>
      if @current is 0 and @options.onRefresh?
        @options.onRefresh.call @options.onRefresh
      else
        do @hide if @current isnt @initial


    hide: =>
      @initial_delta = null
      @current = @initial
      _transform @el, @initial

    _transform = (element, value) ->
      if $.os.ios or ($.os.android and parseFloat($.os.version)>2.3 )
        string = "translate3d(0px, #{value}px, 0px) scale3d(1, 1, 1)"
        element.css "-webkit-transform", string
        element.css "transform", string
      else
        string = "translate(0, #{value}px"
        element.css "-webkit-transform", "translate(0, #{value}px"
        element.css "-moz-transform", "translate(0, #{value}px"
        element.css "-ms-transform", "translate(0, #{value}px"
        element.css "-o-transform", "translate(0, #{value}px"
        element.css "transform", "translate(0, #{value}px"

      element.css "margin-bottom", "#{value}px"

  new PullRefresh(container, options)
