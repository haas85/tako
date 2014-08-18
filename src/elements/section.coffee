Tako.Section = do (TK = Tako) ->
  _loadEvent = _createEvent "load", null
  _unloadEvent = _createEvent "unload", null

  goTo = (section_id, back=false)->
    _current_section = current()
    _current_article = _current_section.parentElement

    modifier = if back then "back-" else ""

    new_section = document.getElementById(section_id)
    if not new_section? and new_section.nodeName isnt "SECTION"
      return false

    new_article = new_section.parentElement

    if _current_section.id isnt new_section.id
      new_article.querySelector("section.active").classList.remove "active"
      new_section.classList.add "active"

    if _current_article.id isnt new_article.id
      Tako.Article new_article.id, back

    if not new_section.iscroll
      Tako.iScroll new_section

    if new_section.attributes.getNamedItem("data-scrolltop")?
      new_section.scrolltop = 0

    _navigate = false
    document.location.hash = "##{new_article.id}/#{section_id}"

    # TODO use custom events
    _current_section.dispatchEvent _unloadEvent
    new_section.dispatchEvent _loadEvent


    Array::forEach.call document.querySelectorAll(".current[data-section]"), (el) ->
      el.classList.remove "current"
    Array::forEach.call document.querySelectorAll("[data-section=#{section_id}]"), (el) ->
      el.classList.add "current"
    Array::forEach.call document.querySelectorAll("[data-visible]"), (el) ->
      el.classList.remove "show"
    Array::forEach.call document.querySelectorAll("[data-visible=#{section_id}]"), (el) ->
      el.classList.add "show"

    return true

  current = -> document.querySelector "article.active section.active"

  (id, back) ->
    if id? then goTo id, back else current()