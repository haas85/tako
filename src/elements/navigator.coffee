_navigate = true
$(window).on "hashchange", ->
  if _navigate
    hash = document.location.hash or ""
    if hash isnt "" and hash isnt "#"
      hash = hash.replace "#", ""
      hash = hash.split "/"
      if hash.length = 2
        Tako.Section hash[1]