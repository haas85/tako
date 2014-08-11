Tako.log = ->
  console.log.apply(console, arguments) if Tako.logging.level >= 4

Tako.info = ->
  console.info.apply(console, arguments) if Tako.logging.level >= 3

Tako.warn = ->
  console.warn.apply(console, arguments) if Tako.logging.level >= 2

Tako.error = ->
  console.error.apply(console, arguments) if Tako.logging.level >= 1