/* TaKo v0.1.0 - 2/6/2014
   http://
   Copyright (c) 2014 Iñigo Gonzalez Vazquez <ingonza85@gmail.com> (@haas85) - Under MIT License */
(function() {
  var Tako, _fallback,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Tako = Tako = (function() {
    var callbacks, init, onReady, remaining, viewType, _loaded, _onError, _onReceive, _setup;
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
      if ($("section.active").length === 0) {
        $("section").first().addClass("active");
      }
      $("body").hammer();
      $("section>header>nav:not(.left):not(.right)").parent().parent().addClass("extended_header");
      $("section>footer").parent().addClass("footer");
      $("section").each(function() {
        if ($(this).children("article.active").length === 0) {
          return $(this).children("article").first().addClass("active");
        }
      });
      _current_art = $("section.active article.active")[0].id;
      $("[data-visible=" + _current_art + "]").addClass("show");
      _fallback();
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
      onReady: onReady,
      viewType: viewType
    };
  })();

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
        Tako.Section(new_section[0].id);
      } else {
        _current_article.trigger("unload");
        _current = new_article.trigger("load");
      }
      $(".current[data-article]").removeClass("current");
      $("[data-article=" + article_id + "]").addClass("current");
      $("[data-visible]").removeClass("show");
      return $("[data-visible=" + article_id + "]").addClass("show");
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
      if (this.nodeName === "LI") {
        $(this).children().each(function() {
          var _this = this;
          return $(this).bind("tap", function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            return goTo($(_this).parent().attr("data-article"));
          });
        });
      }
      return $(this).bind("tap", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return goTo($(_this).attr("data-article"));
      });
    });
    _current = null;
    return function(id) {
      if (id != null) {
        return goTo(id);
      } else {
        return current();
      }
    };
  })(Tako);

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
        if (TK.viewType() === "PHONE") {
          if (aside.hasClass("show")) {
            return hide();
          } else {
            return show();
          }
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
    }
  })(Tako);

  Tako.Section = (function(TK) {
    var current, goTo, _current;
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
      if (this.nodeName === "LI") {
        $(this).children().each(function() {
          var _this = this;
          return $(this).bind("tap", function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            return goTo($(_this).parent().attr("data-section"));
          });
        });
      }
      return $(this).bind("tap", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return goTo($(_this).attr("data-section"));
      });
    });
    _current = null;
    return function(id) {
      if (id != null) {
        return goTo(id);
      } else {
        return current();
      }
    };
  })(Tako);

  Tako.Section.title = function(html, section_id) {
    var el;
    if (section_id == null) {
      el = Tako.Section().children("header").children("h1");
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
    var height, style, _SECTION, _android, _firefox, _ios;
    style = "<style>";
    height = $(window).height();
    _SECTION = "body>section";
    style += "body>section > article{min-height:" + (height - 50) + "px}\nbody>section.extended_header > article{min-height:" + (height - 100) + "px}\nbody>section.footer > article{min-height:" + (height - 115) + "px}\nbody>section.extended_header.footer > article{min-height:" + (height - 165) + "px}\nbody>section.no_header > article{min-height:" + height + "px}\nbody>section.no_header.footer > article{min-height:" + (height - 65) + "px}";
    _android = function() {
      return this;
    };
    _ios = function() {
      return this;
    };
    _firefox = function() {
      return style += "@media screen and (min-width: 768px) and (orientation: landscape){\n  section.active.extended_header > article {\n    margin-top: 0;\n  }\n}";
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
    style += "</style>";
    return $("head").append(style);
  };

  Tako.Notification = (function(TK) {
    var active, callback, confirm, custom, error, hide, loading, notification, notification_window, progress, success, timeout, _close, _hide, _iconHtml, _ontap, _show;
    active = false;
    notification = $("<div data-element=\"notification\"><div></div</div>");
    notification_window = $("<section class=\"window\"></section>");
    notification.find("div").append(notification_window);
    $("body").append(notification);
    timeout = null;
    callback = null;
    success = function(icon, title, content, time_out, cb) {
      var html;
      html = _iconHtml(icon, title, content);
      return _show(html, "success center upwards", time_out, cb);
    };
    error = function(icon, title, content, time_out, cb) {
      var html;
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
      html += "<article>\n  <span class=\"icon " + icon + " animated\"></span>\n</article>";
      return _show(html, classes, time_out, cb);
    };
    progress = function(icon, title, content, time_out, cb) {
      var html;
      html = "<header class=\"" + (icon != null ? 'align-left' : 'center') + "\">";
      if (icon != null) {
        html += "<span class=\"icon " + icon + "\"></span>";
      }
      html += "<span>" + title + "</span>\n</header>\n<article>\n  <span class=\"content\">" + content + "</span>\n  <div id=\"notification_progress\"></div><div style=\"clear:both\"></div>\n</article>";
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
      html = "<article>\n  <span class=\"icon " + icon + "\"></span>\n  <div>\n    <span class=\"title\">" + title + "</span><br>\n    <span class=\"content padding bottom clear\">" + content + "</span>\n  </div>\n</article>\n<footer>\n  <button class=\"button accept\">" + accept + "</button>\n  <button class=\"button cancel\">" + cancel + "</button>\n</footer>";
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
        header = "<header>\n  <span class=\"close black icon cancel\"></span>\n  <h1>\n    <span>" + title + "</span>\n  </h1>\n</header>";
      } else if (title != null) {
        header = "<header><h1>\n  <span>" + title + "</span>\n</h1></header>";
      }
      html = "" + header + "\n<article>";
      if (closable && (title == null)) {
        html += "<span class=\"close black icon cancel\"></span>";
      }
      html += "" + content + "\n</article>";
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
      return "<header>\n  <span class=\"icon " + icon + "\"></span>\n</header>\n<article>\n  <span class=\"title\">" + title + "</span>\n  <span class=\"content\">" + content + "</span>\n</article>";
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
        this.setRotation = __bind(this.setRotation, this);
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
        this._phone = true;
        Hammer(this.container).on("touch dragdown release", this.onPull);
      }

      PullToRefresh.prototype.onPull = function(ev) {
        var height, scrollY, width;
        switch (ev.type) {
          case "touch":
            width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            height = window.innerHeight > 0 ? window.innerHeight : screen.height;
            if (((width > 768) && (width > height)) || (this.container.nodeName !== "ARTICLE")) {
              this.phone = false;
            } else {
              this.phone = true;
            }
            if (!this.refreshing) {
              return this.hide();
            }
            break;
          case "release":
            if (!this._dragged_down) {
              return;
            }
            cancelAnimationFrame(this._anim);
            if (this._slidedown_height >= this.breakpoint) {
              if (this.options.onRefresh) {
                return this.onRefresh();
              } else {
                return this.hide();
              }
            } else {
              return this.hide();
            }
            break;
          case "dragdown":
            this._dragged_down = true;
            scrollY = this.phone ? window.scrollY : this.container.scrollTop;
            if (scrollY > 5) {
              return;
            } else {
              if (scrollY !== 0) {
                if (this.phone) {
                  window.scrollTo(0, 0);
                } else {
                  this.container.scrollTop = 0;
                }
              }
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
        }
      };

      PullToRefresh.prototype.setHeight = function(height) {
        if (this.phone) {
          this.container.style.transform = "translate(0, " + height + "px) ";
          this.container.style.oTransform = "translate(0, " + height + "px)";
          this.container.style.msTransform = "translate(0, " + height + "px)";
          this.container.style.mozTransform = "translate(0, " + height + "px)";
          return this.container.style.webkitTransform = "translate(0, " + height + "px)";
        } else {
          height -= 511;
          this.pullrefresh.style.transform = "translate(0, " + height + "px) ";
          this.pullrefresh.style.oTransform = "translate(0, " + height + "px)";
          this.pullrefresh.style.msTransform = "translate(0, " + height + "px)";
          this.pullrefresh.style.mozTransform = "translate(0, " + height + "px)";
          this.pullrefresh.style.webkitTransform = "translate(0, " + height + "px)";
          return this.pullrefresh.style.marginBottom = "" + height + "px";
        }
      };

      PullToRefresh.prototype.rotate = function() {
        var angle, slided;
        slided = this._slidedown_height >= this.breakpoint ? this.breakpoint : this._slidedown_height;
        angle = slided * 180 / this.breakpoint;
        return this.setRotation(angle);
      };

      PullToRefresh.prototype.setRotation = function(angle) {
        this.icon[0].style.transform = "rotate(" + angle + "deg)";
        this.icon[0].style.oTransform = "rotate(" + angle + "deg)";
        this.icon[0].style.msTransform = "rotate(" + angle + "deg)";
        this.icon[0].style.mozTransform = "rotate(" + angle + "deg)";
        return this.icon[0].style.webkitTransform = "rotate(" + angle + "deg)";
      };

      PullToRefresh.prototype.onRefresh = function() {
        this.icon[0].className = "icon spin6 animated";
        this.text.html(this.options.refreshLabel);
        this.setHeight(this.breakpoint - 10);
        this.refreshing = true;
        this.setRotation(0);
        return this.options.onRefresh.call(this.options.onRefresh);
      };

      PullToRefresh.prototype.onArrived = function() {
        this.showRelease = true;
        this.setRotation(180);
        return this.text.html(this.options.releaseLabel);
      };

      PullToRefresh.prototype.onUp = function() {
        this.showRelease = false;
        this.setRotation(0);
        return this.text.html(this.options.pullLabel);
      };

      PullToRefresh.prototype.hide = function() {
        this.icon[0].className = "icon down-big";
        this.text.html(this.options.pullLabel);
        this._slidedown_height = 0;
        this.setHeight(0);
        this.setRotation(0);
        cancelAnimationFrame(this._anim);
        this._anim = null;
        this._dragged_down = false;
        return this.refreshing = false;
      };

      PullToRefresh.prototype.updateHeight = function() {
        var _this = this;
        this.setHeight(this._slidedown_height);
        return this._anim = requestAnimationFrame(function() {
          return _this.updateHeight();
        });
      };

      return PullToRefresh;

    })();
    return new PullToRefresh(container, options);
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
