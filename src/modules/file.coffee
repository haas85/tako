do ->
  templates = {}

  Tako.File = (path, refresh) ->
    return templates[path] if templates[path]? and not refresh
    return templates[path] = $.ajax({
        type        : "GET"
        dataType    : 'text'
        crossDomain : true
        url         : path
        async       : false
    }).responseText
