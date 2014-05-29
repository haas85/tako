Tako.Section = do (TK = Tako) ->

  goTo = (section_id, back=false)->
    _current_section = current()
    _current_article = _current_section.parent()

    modifier = if back then "back-" else ""

    new_section = $("section##{section_id}")
    new_article = new_section.parent()
    offset = _current_section.offset()
    if _current_section[0].id isnt new_section[0].id
      new_article.children(".active").css("top", "#{offset.top}px").css("height", "#{offset.height}px").attr("data-direction","#{modifier}out").removeClass("active")
      _current = new_section.attr("data-direction", "#{modifier}in").css("top", "#{offset.top}px").css("height", "#{offset.height}px")
    $("footer").addClass "bottom"
    if _current_article[0].id isnt new_article[0].id
      Tako.Article new_article[0].id
    else
      _current = new_section


    $(".current[data-section]").removeClass "current"
    $("[data-section=#{section_id}]").addClass "current"
    $("[data-visible]").removeClass "show"
    $("[data-visible=#{section_id}]").addClass "show"

  current = ->
    if _current? then _current else _current = $ "article.active section.active"

  _current = null

  (id, back) ->
    if id? then goTo id, back else current()

_sectionListeners = ->
  $("section").on "animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd", (event) ->
    if event.target.nodeName.toUpperCase() is "SECTION"
      if (event.target.getAttribute("data-direction") is "in") or (event.target.getAttribute("data-direction") is "back-in")
        event.target.classList.add "active"
        $(event.target).trigger "load"
      else if (event.target.getAttribute("data-direction") is "out") or (event.target.getAttribute("data-direction") is "back-out")
        $(event.target).trigger "unload"
      event.target.style.top = "auto"
      event.target.style.height = "auto"
      event.target.removeAttribute "data-direction"
      $("footer").removeClass "bottom"