TaKo.ProgressBar = (container, value) ->
  class Progress

    el = null

    fill = null

    constructor: (container, @value=0) ->
      PROGRESS = """<span class="progress_bar">
                      <span class="percent" style="width:#{@value}%"></span>
                    </span>"""

      el = $(PROGRESS)
      $("##{container}").append el
      fill = el.children(".percent")

    percent: (value) ->
      if value?
        if value < 0 or value > 100
          throw "Invalid value"
        @value = value
        fill.css "width", "#{@value}%"
      @value

    remove: -> do el.remove

  new Progress(container, value)
