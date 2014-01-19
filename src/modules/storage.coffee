do ->
  _get      = (type, key) ->
    JSON.parse window[type].getItem(key)
  _set      = (type, key, value) ->
    window[type].setItem key, JSON.stringify(value)
  _remove   = (type, key) ->
    window[type].removeItem key
  _clear    = (type) ->
    do window[type].clear

  Tako.Session = do ->
    _name   = "sessionStorage"

    get     : (key) -> _get _name, key
    set     : (key, value) -> _set _name, key, value
    remove  : (key) -> _remove _name, key
    clear   : -> _clear _name

  Tako.Storage = do ->
    _name = "localStorage"

    get     : (key) -> _get _name, key
    set     : (key, value) -> _set _name, key, value
    remove  : (key) -> _remove _name, key
    clear   : -> _clear _name