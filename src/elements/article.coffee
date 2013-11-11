TaKo.Article = do (TK = TaKo) ->

  goTo = (article_id)->
    current_article = $("section.active article.active")
    current_section = current_article.parent()

    new_article = $("article##{article_id}")
    new_section = new_article.parent()
    if current_section[0].id isnt new_section[0].id
      TaKo.Section.goTo new_section[0].id

    if current_article[0].id isnt new_article[0].id
      new_section.children().removeClass "active"
      new_article.addClass "active"

  $("[data-article]").each (element) ->
    $(@).bind "click", => goTo $(@).attr "data-article"

  goTo: goTo