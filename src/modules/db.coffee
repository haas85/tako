Tako.DB = do ->
  manager  : null

  create   : (name, schema, version, size, callback) ->
     @manager = new WebDB(name, schema,version, size, callback)
     @db = @manager.db

  select   : ->
    throw "Database not initializated" if not @manager?
    @manager.select.apply @manager, arguments

  insert   : ->
    throw "Database not initializated" if not @manager?
    @manager.insert.apply @manager, arguments

  update   : ->
    throw "Database not initializated" if not @manager?
    @manager.update.apply @manager, arguments

  delete   : ->
    throw "Database not initializated" if not @manager?
    @manager.delete.apply @manager, arguments

  drop     : ->
    throw "Database not initializated" if not @manager?
    @manager.drop.apply @manager, arguments

  execute  : ->
    throw "Database not initializated" if not @manager?
    @manager.execute.apply @manager, arguments