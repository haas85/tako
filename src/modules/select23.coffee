Select = (element) ->
  _createElement = (child) ->
    elem = $ """<li data-value="#{child.value}">#{child.text}</li>"""
    elem.addClass("theme") if child.value is selectbox[0].value
    elem.on "tap", (ev) ->
      _selected ev.target
    elem

  _selected = (el) ->
    selectbox[0].value = el.getAttribute "data-value"
    selectbox.hide()
    setTimeout (->selectbox.show()), 1

    $("article[data-selectbox]").removeClass("show").html("<div></div>")

  selectbox = element
  container = $ """<section data-selectbox="#{selectbox.attr("id")}"></section>"""
  list = $("<ul></ul>")
  for child in element.children()
    list.append _createElement(child)
  container.append list
  $("article[data-selectbox]>div").append(container).parent().addClass "show"

