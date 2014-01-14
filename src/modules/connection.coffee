TaKo.Connection = do ->
    state       = navigator.onLine
    callbacks   = []

    stateChange = (online) ->
      alert "HOLA"
      if state isnt online
        state = online
        for cb in callbacks
          cb.call cb, online

    $(window).on "online", -> stateChange true
    $(window).on "offline", -> stateChange false

    isOnline    : -> navigator.onLine
    onChange    : (cb) -> callbacks.push cb