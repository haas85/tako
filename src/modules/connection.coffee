Tako.Connection = do ->
    _state       = navigator.onLine
    _callbacks   = []

    _stateChange = (online) ->
      if _state isnt online
        _state = online
        for cb in _callbacks
          cb.call cb, online

    $(window).on "online", -> _stateChange true
    $(window).on "offline", -> _stateChange false

    isOnline    : -> navigator.onLine
    onChange    : (cb) -> _callbacks.push cb