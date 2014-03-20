/* TaKo v1.1 - 20/03/2014
   http://takojs.com
   Copyright (c) 2014 Iñigo Gonzalez Vazquez <ingonza85@gmail.com> (@haas85) - Under MIT License */
(function() {
  var Select, Tako, _fallback,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Tako = Tako = (function() {
    var callbacks, init, onReady, remaining, viewType, _loaded, _onError, _onReceive, _setNavigation, _setup;
    remaining = 0;
    callbacks = [];
    init = function(options) {
      var article, exception, _i, _len, _ref, _results;
      if (options == null) {
        options = {};
      }
      try {
        if (options.articles != null) {
          remaining = options.articles.length;
          _ref = options.articles;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            article = _ref[_i];
            _results.push($.ajax({
              url: article,
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
    viewType = function() {
      var height, width;
      width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      height = window.innerHeight > 0 ? window.innerHeight : screen.height;
      if ((width > 768) && (width > height)) {
        return "TABLET/DESKTOP";
      } else {
        return "PHONE";
      }
    };
    _setup = function() {
      var _current_art;
      if ($("article.active").length === 0) {
        $("article").first().addClass("active");
      }
      $("body").hammer();
      $("article").each(function() {
        if ($(this).children("section.active").length === 0) {
          return $(this).children("section").first().addClass("active");
        }
      });
      _current_art = $("article.active section.active")[0].id;
      $("[data-visible=" + _current_art + "]").addClass("show");
      $("[data-section=" + ($("article.active section.active").attr("id")) + "]").addClass("current");
      $("[data-article=" + ($("article.active").attr("id")) + "]").addClass("current");
      _setNavigation("data-article", Tako.Article);
      _setNavigation("data-section", Tako.Section);
      $("[data-action=aside]").each(function(element) {
        return $(this).on("tap", function(ev) {
          ev.preventDefault();
          ev.stopPropagation();
          return Tako.Aside.toggle();
        });
      });
      _fallback();
      return _loaded();
    };
    _setNavigation = function(query, action) {
      return $("[" + query + "]").each(function(element) {
        if (this.nodeName === "LI") {
          $(this).children().each(function() {
            return $(this).bind("tap", function(ev) {
              ev.preventDefault();
              ev.stopPropagation();
              return action($(this).parent().attr(query));
            });
          });
        }
        return $(this).bind("tap", function(ev) {
          ev.preventDefault();
          ev.stopPropagation();
          return action($(ev.target).attr(query));
        });
      });
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
      console.error("Article not downloaded");
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
      onReady: onReady,
      viewType: viewType
    };
  })();

  Tako.Article = (function(TK) {
    var current, goTo, _current;
    goTo = function(article_id) {
      var el, _current;
      el = current();
      if (el[0].id !== article_id) {
        el.removeClass("active");
        el.children("article.active").trigger("unload");
        window.scrollTo(0, 0);
        _current = $("article#" + article_id).addClass("active");
        _current.children("article.active").trigger("load");
        $(".current[data-article]").removeClass("current");
        return $("[data-article=" + article_id + "]").addClass("current");
      }
    };
    current = function() {
      var _current;
      if (typeof _current !== "undefined" && _current !== null) {
        return _current;
      } else {
        return _current = $("article.active");
      }
    };
    _current = null;
    return function(id) {
      if (id != null) {
        return goTo(id);
      } else {
        return current();
      }
    };
  })(Tako);

  Tako.Article.title = function(html, article_id) {
    var el;
    if (article_id == null) {
      el = Tako.Article().children("header").children("h1");
    } else {
      el = $("article#" + article_id).children("header").children("h1");
    }
    if (el.length === 1) {
      if (html != null) {
        return el.html(html);
      } else {
        return el.html();
      }
    }
  };

  Tako.Aside = (function(TK) {
    var aside, bck, hide, show, toggle;
    aside = $("aside");
    if (aside.length > 0) {
      bck = null;
      bck = $('<div data-element="aside_background"></div>');
      $("body").append(bck);
      if (aside.hasClass("full")) {
        bck.addClass("full");
      }
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
        if (TK.viewType() === "PHONE") {
          if (aside.hasClass("show")) {
            return hide();
          } else {
            return show();
          }
        }
      };
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
    }
  })(Tako);

  Tako.Section = (function(TK) {
    var current, goTo, _current;
    goTo = function(section_id) {
      var new_article, new_section, _current, _current_article, _current_section;
      _current_section = current();
      _current_article = _current_section.parent();
      new_section = $("section#" + section_id);
      new_article = new_section.parent();
      if (_current_section[0].id !== new_section[0].id) {
        new_article.children().removeClass("active");
        _current = new_section.addClass("active");
      }
      if (_current_article[0].id !== new_article[0].id) {
        Tako.Section(new_article[0].id);
      } else {
        _current_section.trigger("unload");
        _current = new_section.trigger("load");
      }
      $(".current[data-section]").removeClass("current");
      $("[data-section=" + section_id + "]").addClass("current");
      $("[data-visible]").removeClass("show");
      return $("[data-visible=" + section_id + "]").addClass("show");
    };
    current = function() {
      var _current;
      if (typeof _current !== "undefined" && _current !== null) {
        return _current;
      } else {
        return _current = $("article.active section.active");
      }
    };
    _current = null;
    return function(id) {
      if (id != null) {
        return goTo(id);
      } else {
        return current();
      }
    };
  })(Tako);

  Tako.ProgressBar = function(container, value) {
    var Progress;
    Progress = (function() {
      Progress.prototype.el = null;

      Progress.prototype.fill = null;

      function Progress(container, value) {
        var PROGRESS;
        this.value = value != null ? value : 0;
        PROGRESS = "<span class=\"progress_bar\">\n  <span class=\"percent\" style=\"width:" + this.value + "%\"></span>\n</span>";
        this.el = $(PROGRESS);
        $("#" + container).append(this.el);
        this.fill = this.el.children(".percent");
      }

      Progress.prototype.percent = function(value) {
        if (value != null) {
          if (value < 0 || value > 100) {
            throw "Invalid value";
          }
          this.value = value;
          this.fill.css("width", "" + this.value + "%");
        }
        return this.value;
      };

      Progress.prototype.remove = function() {
        return this.el.remove();
      };

      return Progress;

    })();
    return new Progress(container, value);
  };

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

  _fallback = function() {
    var height, inputs, section_inputs, style, _android, _browser, _firefox, _ios, _moveChilds, _softKeyboard;
    style = "<style>";
    height = $(window).height();
    style += "";
    inputs = "input[type=\"text\"], input[type=\"password\"], input[type=\"date\"], input[type=\"datetime\"], input[type=\"email\"], input[type=\"number\"], input[type=\"search\"], input[type=\"tel\"], input[type=\"time\"], input[type=\"url\"], textarea";
    section_inputs = "section input[type=\"text\"], section input[type=\"password\"], section input[type=\"date\"], section input[type=\"datetime\"], section input[type=\"email\"], section input[type=\"number\"], section input[type=\"search\"], section input[type=\"tel\"], section input[type=\"time\"], section input[type=\"url\"], section textarea";
    _moveChilds = function(elements) {
      return elements.each(function() {
        return $(this).append($(document.createElement("div")).append($(this).children()));
      });
    };
    _softKeyboard = function(elem, offset) {
      var container, top;
      if (offset == null) {
        offset = 0;
      }
      top = elem.getBoundingClientRect().top;
      container = $(elem).parents(["section.active"]);
      return container.scrollTop(top - container[0].getBoundingClientRect().top - offset);
    };
    _android = function() {
      var android_23, android_4;
      _moveChilds($("body > article > section.indented"));
      android_4 = new RegExp("^4[\.]");
      android_23 = new RegExp("^2[\.]3[\.]");
      if (android_4.test($.os.version)) {
        $(section_inputs).on("focus", function() {
          return setTimeout(((function(_this) {
            return function() {
              return _softKeyboard(_this, 20);
            };
          })(this)), 400);
        });
        $("select").on("focus", function(ev) {
          ev.preventDefault();
          ev.stopPropagation();
          return Select($(ev.target));
        });
      }
      if (android_23.test($.os.version)) {
        $("body").append($("<article data-selectbox><div></div></article>"));
        return $("select").on("focus", function(ev) {
          console.log("Hello");
          console.log(ev);
          ev.preventDefault();
          ev.stopPropagation();
          return Select($(ev.target));
        });
      }
    };
    _ios = function() {
      return _moveChilds($("body > article > section.indented"));
    };
    _firefox = function() {
      if (($.os != null) && $.os.phone) {
        return _moveChilds($("body > article > section.indented"));
      }
    };
    _browser = function() {
      if ((!$.os.tablet) && (!$.os.phone)) {
        return _moveChilds($("body > article > section.indented"));
      }
    };
    if (navigator.userAgent.toLowerCase().indexOf("firefox") !== -1) {
      _firefox();
    }
    if (($.os != null) && $.os.android) {
      _android();
    }
    if (($.os != null) && $.os.ios) {
      _ios();
    }
    if ($.browser != null) {
      return _browser();
    }
  };

  Tako.Notification = (function(TK) {
    var active, callback, confirm, custom, error, hide, loading, notification, notification_window, progress, success, timeout, _close, _hide, _iconHtml, _ontap, _show;
    active = false;
    notification = $("<div data-element=\"notification\"><div></div</div>");
    notification_window = $("<article class=\"window\"></article>");
    notification.find("div").append(notification_window);
    $("body").append(notification);
    timeout = null;
    callback = null;
    success = function(icon, title, content, time_out, cb) {
      var html;
      if (icon == null) {
        icon = "ok";
      }
      html = _iconHtml(icon, title, content);
      return _show(html, "success center upwards", time_out, cb);
    };
    error = function(icon, title, content, time_out, cb) {
      var html;
      if (icon == null) {
        icon = "deny";
      }
      html = _iconHtml(icon, title, content);
      return _show(html, "error center downwards", time_out, cb);
    };
    loading = function() {
      var args, cb, classes, html, icon, time_out, title;
      title = arguments[0], time_out = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if ((args[0] != null) && typeof args[0] === "string") {
        icon = args[0];
        cb = args[1];
      } else {
        icon = "spin6";
        cb = args[0];
      }
      html = "";
      classes = "loading center not_clickable";
      if (title != null) {
        html = "<header>\n    <span>" + title + "</span>\n</header>";
      } else {
        classes += " squared";
      }
      html += "<section>\n  <span class=\"icon " + icon + " animated\"></span>\n</section>";
      return _show(html, classes, time_out, cb);
    };
    progress = function(icon, title, content, time_out, cb) {
      var html;
      html = "<header class=\"" + (icon != null ? 'align-left' : 'center') + "\">";
      if (icon != null) {
        html += "<span class=\"icon " + icon + "\"></span>";
      }
      html += "<span>" + title + "</span>\n</header>\n<section>\n  <span class=\"content\">" + content + "</span>\n  <div id=\"notification_progress\"></div><div style=\"clear:both\"></div>\n</section>";
      _show(html, "center progress not_clickable", time_out, cb);
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
      if (icon == null) {
        icon = "help-circled";
      }
      if (accept == null) {
        accept = "Accept";
      }
      if (cancel == null) {
        cancel = "Cancel";
      }
      html = "<section>\n  <span class=\"icon " + icon + "\"></span>\n  <div>\n    <span class=\"title\">" + title + "</span><br>\n    <span class=\"content padding bottom clear\">" + content + "</span>\n  </div>\n</section>\n<footer>\n  <button class=\"button accept\">" + accept + "</button>\n  <button class=\"button cancel\">" + cancel + "</button>\n</footer>";
      _show(html, "center confirm not_clickable", null, null);
      buttons = notification_window.find("button");
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
    custom = function(title, content, closable, classes, timeout, cb) {
      var header, html;
      if (closable == null) {
        closable = true;
      }
      if (classes == null) {
        classes = "";
      }
      header = "";
      if ((title != null) && closable) {
        header = "<header>\n  <span class=\"close icon deny\"></span>\n  <h1>\n    <span>" + title + "</span>\n  </h1>\n</header>";
      } else if (title != null) {
        header = "<header><h1>\n  <span>" + title + "</span>\n</h1></header>";
      }
      html = "" + header + "\n<section>";
      if (closable && (title == null)) {
        html += "<span class=\"close black icon deny\"></span>";
      }
      html += "" + content + "\n</section>";
      _show(html, "center custom not_clickable " + classes, timeout, cb);
      return notification.find(".close").on("tap", _close);
    };
    hide = function() {
      active = false;
      clearTimeout(timeout);
      timeout = null;
      notification_window.removeClass("show");
      return setTimeout(_hide, 500);
    };
    _iconHtml = function(icon, title, content) {
      return "<header>\n  <span class=\"icon " + icon + "\"></span>\n</header>\n<section>\n  <span class=\"title\">" + title + "</span>\n  <span class=\"content\">" + content + "</span>\n</section>";
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
    _close = function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      active = false;
      clearTimeout(timeout);
      timeout = null;
      notification_window.removeClass("show");
      return setTimeout(_hide, 500);
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
      custom: custom,
      hide: hide
    };
  })(Tako);

  (function() {
    var lastTime, vendors, x;
    lastTime = 0;
    vendors = ["ms", "moz", "webkit", "o"];
    x = 0;
    while (x < vendors.length && !window.requestAnimationFrame) {
      window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
      ++x;
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime, id, timeToCall;
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = window.setTimeout(function() {
          return callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      return window.cancelAnimationFrame = function(id) {
        return clearTimeout(id);
      };
    }
  })();

  Tako.Pull_Refresh = function(container, options) {
    var PullToRefresh;
    if (options == null) {
      options = {};
    }
    options.pullLabel = options.pullLabel || "Pull to refresh";
    options.releaseLabel = options.releaseLabel || "Release to refresh";
    options.refreshLabel = options.refreshLabel || "Loading...";
    options.onRefresh = options.onRefresh || void 0;
    container = document.getElementById(container);
    PullToRefresh = (function() {
      function PullToRefresh(container, options) {
        var PULLREFRESH;
        this.options = options;
        this.updateHeight = __bind(this.updateHeight, this);
        this.hide = __bind(this.hide, this);
        this.setHeight = __bind(this.setHeight, this);
        this.onPull = __bind(this.onPull, this);
        PULLREFRESH = "<div class=\"pulltorefresh\">\n<span class=\"icon down-big\"></span><span class=\"text\">" + this.options.pullLabel + "</span>\n</div>";
        this.breakpoint = 90;
        this.container = container;
        this.pullrefresh = $(PULLREFRESH)[0];
        $(this.container).prepend(this.pullrefresh);
        this.icon = $(this.pullrefresh).find(".icon");
        this.text = $(this.pullrefresh).find(".text");
        this._slidedown_height = 0;
        this._anim = null;
        this._dragged_down = false;
        this.showRelease = false;
        Hammer(this.container).on("touch", (function(_this) {
          return function() {
            $(_this.container).addClass("pulling");
            if (!_this.refreshing) {
              return _this.hide(false);
            }
          };
        })(this));
        Hammer(this.container).on("dragdown", this.onPull);
        Hammer(this.container).on("release", (function(_this) {
          return function() {
            if (!_this._dragged_down) {
              return;
            }
            cancelAnimationFrame(_this._anim);
            if (_this._slidedown_height >= _this.breakpoint) {
              if (_this.options.onRefresh) {
                return _this.onRefresh();
              } else {
                return _this.hide();
              }
            } else {
              return _this.hide();
            }
          };
        })(this));
      }

      PullToRefresh.prototype.onPull = function(ev) {
        this._dragged_down = true;
        if (this.container.scrollTop > 5) {
          return;
        }
        if (!this._anim) {
          this.updateHeight();
        }
        ev.gesture.preventDefault();
        ev.gesture.stopPropagation();
        if (this._slidedown_height >= this.breakpoint) {
          this.onArrived();
        } else {
          if (this.showRelease) {
            this.onUp();
          }
        }
        return this._slidedown_height = ev.gesture.deltaY * 0.4;
      };

      PullToRefresh.prototype.setHeight = function(height) {
        height -= 511;
        this.pullrefresh.style.transform = "translate(0, " + height + "px)";
        this.pullrefresh.style.webkitTransform = "translate(0, " + height + "px)";
        this.pullrefresh.style.mozTransform = "translate(0, " + height + "px)";
        this.pullrefresh.style.msTransform = "translate(0, " + height + "px)";
        this.pullrefresh.style.marginBottom = "" + height + "px";
        return this.pullrefresh.style.oTransform = "translate(0, " + height + "px)";
      };

      PullToRefresh.prototype.onRefresh = function() {
        this.icon[0].className = "icon spin6 animated";
        this.text.html(this.options.refreshLabel);
        this.setHeight(this.breakpoint - 10);
        this.refreshing = true;
        this.icon.removeClass("rotated");
        return this.options.onRefresh.call(this.options.onRefresh);
      };

      PullToRefresh.prototype.onArrived = function() {
        this.showRelease = true;
        this.icon.addClass("rotated");
        return this.text.html(this.options.releaseLabel);
      };

      PullToRefresh.prototype.onUp = function() {
        this.showRelease = false;
        this.icon.removeClass("rotated");
        return this.text.html(this.options.pullLabel);
      };

      PullToRefresh.prototype.hide = function(remove_pulling) {
        if (remove_pulling == null) {
          remove_pulling = true;
        }
        if (remove_pulling) {
          $(this.container).removeClass("pulling");
        }
        this.icon[0].className = "icon down-big";
        this.text.html(this.options.pullLabel);
        this._slidedown_height = 0;
        this.setHeight(0);
        this.icon.removeClass("rotated");
        cancelAnimationFrame(this._anim);
        this._anim = null;
        this._dragged_down = false;
        return this.refreshing = false;
      };

      PullToRefresh.prototype.updateHeight = function() {
        var height;
        height = this._slidedown_height - 511;
        this.pullrefresh.style.transform = "translate(0, " + height + "px)";
        this.pullrefresh.style.webkitTransform = "translate(0, " + height + "px)";
        this.pullrefresh.style.mozTransform = "translate(0, " + height + "px)";
        this.pullrefresh.style.msTransform = "translate(0, " + height + "px)";
        this.pullrefresh.style.marginBottom = "" + height + "px";
        this.pullrefresh.style.oTransform = "translate(0, " + height + "px)";
        return this._anim = requestAnimationFrame(this.updateHeight);
      };

      return PullToRefresh;

    })();
    return new PullToRefresh(container, options);
  };

  Select = function(element) {
    var child, container, list, selectbox, _createElement, _i, _len, _ref, _selected;
    _createElement = function(child) {
      var elem;
      elem = $("<li data-value=\"" + child.value + "\">" + child.text + "</li>");
      if (child.value === selectbox[0].value) {
        elem.addClass("theme");
      }
      elem.on("tap", function(ev) {
        return _selected(ev.target);
      });
      return elem;
    };
    _selected = function(el) {
      selectbox[0].value = el.getAttribute("data-value");
      selectbox.hide();
      setTimeout((function() {
        return selectbox.show();
      }), 1);
      return $("article[data-selectbox]").removeClass("show").html("<div></div>");
    };
    selectbox = element;
    container = $("<section data-selectbox=\"" + (selectbox.attr("id")) + "\"></section>");
    list = $("<ul></ul>");
    _ref = element.children();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      list.append(_createElement(child));
    }
    container.append(list);
    return $("article[data-selectbox]>div").append(container).parent().addClass("show");
  };

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
