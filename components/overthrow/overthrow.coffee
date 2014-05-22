#! overthrow - An overflow:auto polyfill for responsive design. - v0.7.0 - 2013-11-04
#* Copyright (c) 2013 Scott Jehl, Filament Group, Inc.; Licensed MIT

#! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt
((w, undefined_) ->
  doc = w.document
  docElem = doc.documentElement
  enabledClassName = "overthrow-enabled"

  # Touch events are used in the polyfill, and thus are a prerequisite
  canBeFilledWithPoly = "ontouchmove" of doc

  # The following attempts to determine whether the browser has native overflow support
  # so we can enable it but not polyfill

  # Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)

  # Test the windows scrolling property as well

  # Touch events aren't supported and screen width is greater than X
  # ...basically, this is a loose "desktop browser" check.
  # It may wrongly opt-in very large tablets with no touch support.

  # Hang on to your hats.
  # Whitelist some popular, overflow-supporting mobile browsers for now and the future
  # These browsers are known to get overlow support right, but give us no way of detecting it.
  nativeOverflow = "WebkitOverflowScrolling" of docElem.style or "msOverflowStyle" of docElem.style or (not canBeFilledWithPoly and w.screen.width > 800) or (->
    ua = w.navigator.userAgent

    # Webkit crosses platforms, and the browsers on our list run at least version 534
    webkit = ua.match(/AppleWebKit\/([0-9]+)/)
    wkversion = webkit and webkit[1]
    wkLte534 = webkit and wkversion >= 534

    # Android 3+ with webkit gte 534
    #                   ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13

    # Blackberry 7+ with webkit gte 534
    #                   ~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+

    # Blackberry Playbook with webkit gte 534
    #                   ~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+

    # Firefox Mobile (Fennec) 4 and up
    #                   ~: Mozilla/5.0 (Mobile; rv:15.0) Gecko/15.0 Firefox/15.0

    # WebOS 3 and up (TouchPad too)
    #                   ~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0

    # Nokia Browser N8
    #                   ~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba
    #                   ~: Note: the N9 doesn't have native overflow with one-finger touch. wtf
    ua.match(/Android ([0-9]+)/) and RegExp.$1 >= 3 and wkLte534 or ua.match(RegExp(" Version\\/([0-9]+)")) and RegExp.$1 >= 0 and w.blackberry and wkLte534 or ua.indexOf("PlayBook") > -1 and wkLte534 and not ua.indexOf("Android 2") is -1 or ua.match(/Firefox\/([0-9]+)/) and RegExp.$1 >= 4 or ua.match(/wOSBrowser\/([0-9]+)/) and RegExp.$1 >= 233 and wkLte534 or ua.match(/NokiaBrowser\/([0-9\.]+)/) and parseFloat(RegExp.$1) is 7.3 and webkit and wkversion >= 533
  )()

  # Expose overthrow API
  w.overthrow = {}
  w.overthrow.enabledClassName = enabledClassName
  w.overthrow.addClass = ->
    docElem.className += " " + w.overthrow.enabledClassName  if docElem.className.indexOf(w.overthrow.enabledClassName) is -1
    return

  w.overthrow.removeClass = ->
    docElem.className = docElem.className.replace(w.overthrow.enabledClassName, "")
    return


  # Enable and potentially polyfill overflow
  w.overthrow.set = ->

    # If nativeOverflow or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
    w.overthrow.addClass()  if nativeOverflow
    return


  # expose polyfillable
  w.overthrow.canBeFilledWithPoly = canBeFilledWithPoly

  # Destroy everything later. If you want to.
  w.overthrow.forget = ->
    w.overthrow.removeClass()
    return


  # Expose overthrow API
  w.overthrow.support = (if nativeOverflow then "native" else "none")
  return
) this

#! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt
((w, o, undefined_) ->

  # o is overthrow reference from overthrow-polyfill.js
  return  if o is `undefined`

  # Easing can use any of Robert Penner's equations (http://www.robertpenner.com/easing_terms_of_use.html). By default, overthrow includes ease-out-cubic
  # arguments: t = current iteration, b = initial value, c = end value, d = total iterations
  # use w.overthrow.easing to provide a custom function externally, or pass an easing function as a callback to the toss method
  o.easing = (t, b, c, d) ->
    c * ((t = t / d - 1) * t * t + 1) + b


  # tossing property is true during a programatic scroll
  o.tossing = false

  # Keeper of intervals
  timeKeeper = undefined

  # toss scrolls and element with easing
  #
  # // elem is the element to scroll
  # // options hash:
  #     * left is the desired horizontal scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
  #     * top is the desired vertical scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
  #     * duration is the number of milliseconds the throw will take. Default is 100.
  #     * easing is an optional custom easing function. Default is w.overthrow.easing. Must follow the easing function signature
  #
  #
  o.toss = (elem, options) ->
    o.intercept()
    i = 0
    sLeft = elem.scrollLeft
    sTop = elem.scrollTop
    op =

      # Toss defaults
      top: "+0"
      left: "+0"
      duration: 50
      easing: o.easing
      finished: ->

    endLeft = undefined
    endTop = undefined
    finished = false

    # Mixin based on predefined defaults
    if options
      for j of op
        op[j] = options[j]  if options[j] isnt `undefined`

    # Convert relative values to ints
    # First the left val
    if typeof op.left is "string"
      op.left = parseFloat(op.left)
      endLeft = op.left + sLeft
    else
      endLeft = op.left
      op.left = op.left - sLeft

    # Then the top val
    if typeof op.top is "string"
      op.top = parseFloat(op.top)
      endTop = op.top + sTop
    else
      endTop = op.top
      op.top = op.top - sTop
    o.tossing = true
    timeKeeper = setInterval(->
      if i++ < op.duration
        elem.scrollLeft = op.easing(i, sLeft, op.left, op.duration)
        elem.scrollTop = op.easing(i, sTop, op.top, op.duration)
      else
        if endLeft isnt elem.scrollLeft
          elem.scrollLeft = endLeft
        else

          # if the end of the vertical scrolling has taken place
          # we know that we're done here call the callback
          # otherwise signal that horizontal scrolling is complete
          op.finished()  if finished
          finished = true
        if endTop isnt elem.scrollTop
          elem.scrollTop = endTop
        else

          # if the end of the horizontal scrolling has taken place
          # we know that we're done here call the callback
          op.finished()  if finished
          finished = true
        o.intercept()
      return
    , 1)

    # Return the values, post-mixin, with end values specified
    top: endTop
    left: endLeft
    duration: o.duration
    easing: o.easing


  # Intercept any throw in progress
  o.intercept = ->
    clearInterval timeKeeper
    o.tossing = false
    return

  return
) this, @overthrow

#! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt
((w, o, undefined_) ->

  # o is overthrow reference from overthrow-polyfill.js
  return  if o is `undefined`
  o.scrollIndicatorClassName = "scroll"
  doc = w.document
  docElem = doc.documentElement

  # o api
  nativeOverflow = o.support is "native"
  canBeFilledWithPoly = o.canBeFilledWithPoly
  configure = o.configure
  set = o.set
  forget = o.forget
  scrollIndicatorClassName = o.scrollIndicatorClassName

  # find closest overthrow (elem or a parent)
  o.closest = (target, ascend) ->
    not ascend and target? and ((target.className and target.className.indexOf(scrollIndicatorClassName) > -1) or (target.nodeName is "SECTION") or (target.nodeName is "ASIDE")) and target or (target? and o.closest(target.parentNode))


  # polyfill overflow
  enabled = false
  o.set = ->
    set()

    # If nativeOverflow or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
    return  if enabled or nativeOverflow or not canBeFilledWithPoly
    w.overthrow.addClass()
    enabled = true
    o.support = "polyfilled"
    o.forget = ->
      forget()
      enabled = false

      # Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
      doc.removeEventListener "touchstart", start, false  if doc.removeEventListener
      return


    # Fill 'er up!
    # From here down, all logic is associated with touch scroll handling
    # elem references the overthrow element in use
    elem = undefined

    # The last several Y values are kept here
    lastTops = []

    # The last several X values are kept here
    lastLefts = []
    lastDown = undefined
    lastRight = undefined

    # lastDown will be true if the last scroll direction was down, false if it was up

    # lastRight will be true if the last scroll direction was right, false if it was left

    # For a new gesture, or change in direction, reset the values from last scroll
    resetVertTracking = ->
      lastTops = []
      lastDown = null
      return

    resetHorTracking = ->
      lastLefts = []
      lastRight = null
      return

    inputs = undefined

    # On webkit, touch events hardly trickle through textareas and inputs
    # Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
    # Toggling pointer events at the right moments seems to do the trick
    # Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
    setPointers = (val) ->
      inputs = if elem then elem.querySelectorAll("textarea, input") else []
      i = 0
      il = inputs.length

      while i < il
        inputs[i].style.pointerEvents = val
        i++
      return


    # For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
    changeScrollTarget = (startEvent, ascend) ->
      if doc.createEvent
        newTarget = (not ascend or ascend is `undefined`) and elem.parentNode or elem.touchchild or elem
        tEnd = undefined
        if newTarget isnt elem
          tEnd = doc.createEvent("HTMLEvents")
          tEnd.initEvent "touchend", true, true
          elem.dispatchEvent tEnd
          newTarget.touchchild = elem
          elem = newTarget
          newTarget.dispatchEvent startEvent
      return


    # Touchstart handler
    # On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
    # Touchend unbinds them again, until next time
    start = (e) ->

      # Stop any throw in progress
      o.intercept()  if o.intercept

      # Reset the distance and direction tracking
      resetVertTracking()
      resetHorTracking()
      elem = o.closest(e.target)
      return  if not elem or elem is docElem or e.touches.length > 1
      setPointers "none"
      touchStartE = e
      scrollT = elem.scrollTop
      scrollL = elem.scrollLeft
      height = elem.offsetHeight
      width = elem.offsetWidth
      startY = e.touches[0].pageY
      startX = e.touches[0].pageX
      scrollHeight = elem.scrollHeight
      scrollWidth = elem.scrollWidth

      # Touchmove handler
      move = (e) ->
        ty = scrollT + startY - e.touches[0].pageY
        tx = scrollL + startX - e.touches[0].pageX
        down = ty >= ((if lastTops.length then lastTops[0] else 0))
        right = tx >= ((if lastLefts.length then lastLefts[0] else 0))

        # If there's room to scroll the current container, prevent the default window scroll
        if (ty > 0 and ty < scrollHeight - height) or (tx > 0 and tx < scrollWidth - width)
          e.preventDefault()

        # This bubbling is dumb. Needs a rethink.
        else
          changeScrollTarget touchStartE

        # If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
        resetVertTracking()  if lastDown and down isnt lastDown

        # If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
        resetHorTracking()  if lastRight and right isnt lastRight

        # remember the last direction in which we were headed
        lastDown = down
        lastRight = right

        # set the container's scroll
        elem.scrollTop = ty
        elem.scrollLeft = tx
        lastTops.unshift ty
        lastLefts.unshift tx
        lastTops.pop()  if lastTops.length > 3
        lastLefts.pop()  if lastLefts.length > 3
        return


      # Touchend handler
      end = (e) ->

        # Bring the pointers back
        setPointers "auto"
        setTimeout (->
          setPointers "none"
          return
        ), 450
        elem.removeEventListener "touchmove", move, false
        elem.removeEventListener "touchend", end, false
        return

      elem.addEventListener "touchmove", move, false
      elem.addEventListener "touchend", end, false
      return


    # Bind to touch, handle move and end within
    doc.addEventListener "touchstart", start, false
    return

  return
) this, @overthrow

#! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt
((w, undefined_) ->

  # Auto-init
  w.overthrow.set()
  return
) this