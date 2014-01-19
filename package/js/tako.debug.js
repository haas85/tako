(function() {
  var Tako;

  window.Tako = Tako = (function() {
    var callbacks, init, onReady, remaining, _loaded, _onError, _onReceive, _setup;
    remaining = 0;
    callbacks = [];
    init = function(options) {
      var exception, section, _i, _len, _ref, _results;
      if (options == null) {
        options = {};
      }
      try {
        if (options.sections != null) {
          remaining = options.sections.length;
          _ref = options.sections;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            section = _ref[_i];
            _results.push($.ajax({
              url: section,
              crossDomain: true,
              success: _onReceive,
              error: _onError
            }));
          }
          return _results;
        } else {
          return _setup();
        }
      } catch (_error) {
        exception = _error;
        return console.error(exception);
      }
    };
    onReady = function(callback) {
      return callbacks.push(callback);
    };
    _setup = function() {
      if ($("section.active").length === 0) {
        $("section").first().addClass("active");
      }
      $("body").hammer();
      $("section").each(function() {
        if ($(this).children("article.active").length === 0) {
          return $(this).children("article").first().addClass("active");
        }
      });
      return _loaded();
    };
    _onReceive = function(data) {
      remaining--;
      $("body").append(data);
      if (remaining === 0) {
        return _setup();
      }
    };
    _onError = function(data) {
      remaining--;
      console.error("Section not downloaded");
      if (remaining === 0) {
        return _setup();
      }
    };
    _loaded = function() {
      var cb, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
        cb = callbacks[_i];
        _results.push(cb.call(cb));
      }
      return _results;
    };
    return {
      init: init,
      onReady: onReady
    };
  })();

}).call(this);

(function() {
  Tako.Article = (function(TK) {
    var current, goTo, _current;
    goTo = function(article_id) {
      var new_article, new_section, _current, _current_article, _current_section;
      _current_article = current();
      _current_section = _current_article.parent();
      new_article = $("article#" + article_id);
      new_section = new_article.parent();
      if (_current_article[0].id !== new_article[0].id) {
        new_section.children().removeClass("active");
        _current = new_article.addClass("active");
      }
      if (_current_section[0].id !== new_section[0].id) {
        Tako.Section.goTo(new_section[0].id);
      } else {
        _current_article.trigger("unload");
        _current = new_article.trigger("load");
      }
      $(".current[data-article]").removeClass("current");
      return $("[data-article=" + article_id + "]").addClass("current");
    };
    current = function() {
      var _current;
      if (typeof _current !== "undefined" && _current !== null) {
        return _current;
      } else {
        return _current = $("section.active article.active");
      }
    };
    $("[data-article]").each(function(element) {
      var _this = this;
      return $(this).bind("tap", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return goTo($(_this).attr("data-article"));
      });
    });
    _current = null;
    return {
      goTo: goTo,
      current: current
    };
  })(Tako);

}).call(this);

(function() {
  Tako.Aside = (function(TK) {
    var aside, bck, hide, show, toggle;
    aside = $("aside");
    if (aside.length > 0) {
      $("body").append('<div data-element="aside_background"></div>');
    }
    bck = $("[data-element=aside_background]");
    bck.append(aside);
    show = function() {
      bck.removeClass("hide").addClass("show");
      return aside.addClass("show");
    };
    hide = function() {
      aside.removeClass("show");
      bck.addClass("hide");
      return setTimeout((function() {
        return bck.removeClass("show");
      }), 150);
    };
    toggle = function() {
      if (aside.hasClass("show")) {
        return hide();
      } else {
        return show();
      }
    };
    $("[data-action=aside]").each(function(element) {
      return $(this).on("tap", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return toggle();
      });
    });
    $("aside *").each(function(element) {
      return $(this).on("tap", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return hide();
      });
    });
    bck.on("tap", function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      return hide();
    });
    return {
      show: show,
      hide: hide,
      toggle: toggle
    };
  })(Tako);

}).call(this);

(function() {
  Tako.Section = (function(TK) {
    var current, goTo, title, _current;
    title = function(html, section_id) {
      var el;
      if (section_id == null) {
        el = current().children("header").children("h1");
      } else {
        el = $("section#" + section_id).children("header").children("h1");
      }
      if (el.length === 1) {
        if (html != null) {
          return el.html(html);
        } else {
          return el.html();
        }
      }
    };
    goTo = function(section_id) {
      var el, _current;
      el = current();
      if (el[0].id !== section_id) {
        el.removeClass("active");
        el.children("article.active").trigger("unload");
        _current = $("section#" + section_id).addClass("active");
        _current.children("article.active").trigger("load");
        $(".current[data-section]").removeClass("current");
        return $("[data-section=" + section_id + "]").addClass("current");
      }
    };
    current = function() {
      var _current;
      if (typeof _current !== "undefined" && _current !== null) {
        return _current;
      } else {
        return _current = $("section.active");
      }
    };
    $("[data-section]").each(function(element) {
      var _this = this;
      return $(this).bind("tap", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return goTo($(_this).attr("data-section"));
      });
    });
    _current = null;
    return {
      goTo: goTo,
      title: title,
      current: current
    };
  })(Tako);

}).call(this);

(function() {
  Tako.Connection = (function() {
    var _callbacks, _state, _stateChange;
    _state = navigator.onLine;
    _callbacks = [];
    _stateChange = function(online) {
      var cb, _i, _len, _results;
      if (_state !== online) {
        _state = online;
        _results = [];
        for (_i = 0, _len = _callbacks.length; _i < _len; _i++) {
          cb = _callbacks[_i];
          _results.push(cb.call(cb, online));
        }
        return _results;
      }
    };
    $(window).on("online", function() {
      return _stateChange(true);
    });
    $(window).on("offline", function() {
      return _stateChange(false);
    });
    return {
      isOnline: function() {
        return navigator.onLine;
      },
      onChange: function(cb) {
        return _callbacks.push(cb);
      }
    };
  })();

}).call(this);

(function() {
  Tako.DB = (function() {
    return {
      manager: null,
      create: function(name, schema, version, size, callback) {
        this.manager = new WebDB(name, schema, version, size, callback);
        return this.db = this.manager.db;
      },
      select: function() {
        if (this.manager == null) {
          throw "Database not initializated";
        }
        return this.manager.select.apply(this.manager, arguments);
      },
      insert: function() {
        if (this.manager == null) {
          throw "Database not initializated";
        }
        return this.manager.insert.apply(this.manager, arguments);
      },
      update: function() {
        if (this.manager == null) {
          throw "Database not initializated";
        }
        return this.manager.update.apply(this.manager, arguments);
      },
      "delete": function() {
        if (this.manager == null) {
          throw "Database not initializated";
        }
        return this.manager["delete"].apply(this.manager, arguments);
      },
      drop: function() {
        if (this.manager == null) {
          throw "Database not initializated";
        }
        return this.manager.drop.apply(this.manager, arguments);
      },
      execute: function() {
        if (this.manager == null) {
          throw "Database not initializated";
        }
        return this.manager.execute.apply(this.manager, arguments);
      }
    };
  })();

}).call(this);

(function() {
  Tako.Notification = (function(TK) {
    var active, callback, confirm, error, hide, loading, notification, notification_window, progress, success, timeout, _hide, _iconHtml, _ontap, _show;
    active = false;
    notification = $("<div data-element=\"notification\"></div>");
    notification_window = $("<div class=\"window\"></div>");
    notification.append(notification_window);
    $("body").append(notification);
    timeout = null;
    callback = null;
    success = function(icon, title, content, time_out, cb) {
      var html;
      html = _iconHtml(icon, title, content);
      return _show(html, "success top_position upwards margin", time_out, cb);
    };
    error = function(icon, title, content, time_out, cb) {
      var html;
      html = _iconHtml(icon, title, content);
      return _show(html, "error top_position upwards margin", time_out, cb);
    };
    loading = function(title, time_out, cb) {
      var html;
      html = "<div id=\"circular_container\">\n<div id=\"circular3dG\">\n  <div id=\"circular3d_1G\" class=\"circular3dG\"></div>\n  <div id=\"circular3d_2G\" class=\"circular3dG\"></div>\n  <div id=\"circular3d_3G\" class=\"circular3dG\"></div>\n  <div id=\"circular3d_4G\" class=\"circular3dG\"></div>\n  <div id=\"circular3d_5G\" class=\"circular3dG\"></div>\n  <div id=\"circular3d_6G\" class=\"circular3dG\"></div>\n  <div id=\"circular3d_7G\" class=\"circular3dG\"></div>\n  <div id=\"circular3d_8G\" class=\"circular3dG\"></div>\n</div>";
      html += "</div>";
      if (title != null) {
        html += "<span class=\"title\">" + title + "</span>";
      }
      return _show(html, "loading center not_clickable", time_out, cb);
    };
    progress = function(icon, title, content, time_out, cb) {
      var html;
      html = "<span class=\"icon " + icon + "\"></span>\n<span class=\"title\">" + title + "</span>\n<div class=\"content padding bottom\">" + content + "</div>\n<div id=\"notification_progress\"></div>";
      _show(html, "center progress padding top not_clickable", time_out, cb);
      progress = TK.ProgressBar("notification_progress", 0);
      return {
        percent: function(value) {
          var val;
          val = progress.percent(value);
          if (val === 100) {
            setTimeout((function() {
              return hide();
            }), 150);
          }
          return val;
        }
      };
    };
    confirm = function(icon, title, content, accept, cancel, cb) {
      var buttons, html;
      html = "<span class=\"icon " + icon + "\"></span>\n<span class=\"title\">" + title + "</span>\n<div class=\"content padding bottom clear\">" + content + "</div>\n<button class=\"button accept\">" + accept + "</button>\n<button class=\"button cancel\">" + cancel + "</button>";
      _show(html, "confirm top_position downwards not_clickable", null, null);
      buttons = notification_window.children("button");
      return buttons.bind("tap", function(element) {
        buttons.unbind("tap");
        hide();
        if ($(this).hasClass("accept")) {
          return cb.call(cb, true);
        } else {
          return cb.call(cb, false);
        }
      });
    };
    hide = function() {
      active = false;
      clearTimeout(timeout);
      timeout = null;
      notification_window.removeClass("show");
      return setTimeout(_hide, 500);
    };
    _iconHtml = function(icon, title, content) {
      var html;
      return html = "<span class=\"icon " + icon + "\"></span>\n<div>\n  <span class=\"title\">" + title + "</span>\n  <div class=\"content\">" + content + "</div>\n</div>";
    };
    _show = function(html, classes, time_out, cb) {
      var original_cb;
      if (!active) {
        active = true;
        notification_window.removeClass();
        notification_window.addClass("window " + classes);
        notification_window.html(html);
        notification.addClass("show");
        setTimeout((function() {
          return notification_window.addClass("show");
        }), 100);
        if (cb != null) {
          callback = cb;
        }
        if (time_out != null) {
          return timeout = setTimeout(hide, time_out * 1000);
        }
      } else {
        original_cb = callback;
        callback = function() {
          if (original_cb != null) {
            original_cb();
          }
          return _show(html, timeout, cb);
        };
        return hide();
      }
    };
    _ontap = function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (!notification_window.hasClass("not_clickable")) {
        active = false;
        clearTimeout(timeout);
        timeout = null;
        notification_window.removeClass("show");
        return setTimeout(_hide, 500);
      }
    };
    _hide = function() {
      var cb;
      notification.removeClass("show");
      cb = callback;
      callback = null;
      if (cb != null) {
        return cb.call(cb);
      }
    };
    notification.on("tap", _ontap);
    return {
      success: success,
      error: error,
      confirm: confirm,
      loading: loading,
      progress: progress,
      hide: hide
    };
  })(Tako);

}).call(this);

(function() {
  Tako.ProgressBar = function(container, value) {
    var Progress;
    Progress = (function() {
      var el, fill;

      el = null;

      fill = null;

      function Progress(container, value) {
        var PROGRESS;
        this.value = value != null ? value : 0;
        PROGRESS = "<span class=\"progress_bar\">\n  <span class=\"percent\" style=\"width:" + this.value + "%\"></span>\n</span>";
        el = $(PROGRESS);
        $("#" + container).append(el);
        fill = el.children(".percent");
      }

      Progress.prototype.percent = function(value) {
        if (value != null) {
          if (value < 0 || value > 100) {
            throw "Invalid value";
          }
          this.value = value;
          fill.css("width", "" + this.value + "%");
        }
        return this.value;
      };

      Progress.prototype.remove = function() {
        return el.remove();
      };

      return Progress;

    })();
    return new Progress(container, value);
  };

}).call(this);

(function() {
  (function() {
    var _clear, _get, _remove, _set;
    _get = function(type, key) {
      return JSON.parse(window[type].getItem(key));
    };
    _set = function(type, key, value) {
      return window[type].setItem(key, JSON.stringify(value));
    };
    _remove = function(type, key) {
      return window[type].removeItem(key);
    };
    _clear = function(type) {
      return window[type].clear();
    };
    Tako.Session = (function() {
      var _name;
      _name = "sessionStorage";
      return {
        get: function(key) {
          return _get(_name, key);
        },
        set: function(key, value) {
          return _set(_name, key, value);
        },
        remove: function(key) {
          return _remove(_name, key);
        },
        clear: function() {
          return _clear(_name);
        }
      };
    })();
    return Tako.Storage = (function() {
      var _name;
      _name = "localStorage";
      return {
        get: function(key) {
          return _get(_name, key);
        },
        set: function(key, value) {
          return _set(_name, key, value);
        },
        remove: function(key) {
          return _remove(_name, key);
        },
        clear: function() {
          return _clear(_name);
        }
      };
    })();
  })();

}).call(this);
