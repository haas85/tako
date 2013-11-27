(function() {
  var TaKo;

  window.TaKo = TaKo = {};

  TaKo.init = function() {
    if ($("section.active").length === 0) {
      $("section").first().addClass("active");
    }
    return $("section").each(function() {
      if ($(this).children("article.active").length === 0) {
        return $(this).children("article").first().addClass("active");
      }
    });
  };

}).call(this);

(function() {
  TaKo.Article = (function(TK) {
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
        return TaKo.Section.goTo(new_section[0].id);
      } else {
        _current_article.trigger("unload");
        return _current = new_article.trigger("load");
      }
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
      return $(this).bind("click", function() {
        return goTo($(_this).attr("data-article"));
      });
    });
    _current = null;
    return {
      goTo: goTo,
      current: current
    };
  })(TaKo);

}).call(this);

(function() {
  TaKo.Aside = (function(TK) {
    var aside, bck, hide, show, toggle;
    aside = $("aside");
    if (aside.length > 0) {
      $("body").append('<div data-element="aside_background"></div>');
    }
    bck = $("[data-element=aside_background]");
    show = function() {
      bck.addClass("show");
      return aside.addClass("show");
    };
    hide = function() {
      aside.removeClass("show");
      return bck.removeClass("show");
    };
    toggle = function() {
      if (aside.hasClass("show")) {
        return hide();
      } else {
        return show();
      }
    };
    $("[data-action=aside]").each(function(element) {
      return $(this).bind("click", function() {
        return toggle();
      });
    });
    $("aside > *").each(function(element) {
      return $(this).bind("click", function() {
        return hide();
      });
    });
    bck.bind("click", function() {
      return hide();
    });
    return {
      show: show,
      hide: hide,
      toggle: toggle
    };
  })(TaKo);

}).call(this);

(function() {
  TaKo.Section = (function(TK) {
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
      return $(this).bind("click", function() {
        return goTo($(_this).attr("data-section"));
      });
    });
    _current = null;
    return {
      goTo: goTo,
      title: title,
      current: current
    };
  })(TaKo);

}).call(this);

(function() {
  TaKo.Notification = (function(TK) {
    var active, callback, confirm, error, hide, loading, notification, progress, success, timeout, _hide, _iconHtml, _onclick, _show;
    active = false;
    $("body").append("<div data-element=\"notification\"></div>");
    notification = $("div[data-element=notification]");
    timeout = null;
    callback = null;
    success = function(icon, title, content, time_out, cb) {
      var html;
      html = _iconHtml(icon, "success", title, content);
      return _show(html, time_out, cb);
    };
    error = function(icon, title, content, time_out, cb) {
      var html;
      html = _iconHtml(icon, "error", title, content);
      return _show(html, time_out, cb);
    };
    loading = function(title, time_out, cb) {
      var html;
      html = "<div class=\"window center not_clickable\">\n<div id=\"circular_container\">\n  <div id=\"circular3dG\">\n    <div id=\"circular3d_1G\" class=\"circular3dG\"></div>\n    <div id=\"circular3d_2G\" class=\"circular3dG\"></div>\n    <div id=\"circular3d_3G\" class=\"circular3dG\"></div>\n    <div id=\"circular3d_4G\" class=\"circular3dG\"></div>\n    <div id=\"circular3d_5G\" class=\"circular3dG\"></div>\n    <div id=\"circular3d_6G\" class=\"circular3dG\"></div>\n    <div id=\"circular3d_7G\" class=\"circular3dG\"></div>\n    <div id=\"circular3d_8G\" class=\"circular3dG\"></div>\n  </div>\n</div>";
      if (title != null) {
        html += "<span class=\"title\">" + title + "</span>";
      }
      html += "</div>";
      return _show(html, time_out, cb);
    };
    progress = function(icon, title, content, time_out, cb) {
      var html;
      html = "<div class=\"window center progress padding top not_clickable\">\n  <span class=\"icon " + icon + "\"></span>\n  <span class=\"title\">" + title + "</span>\n  <div class=\"content padding bottom\">" + content + "</div>\n  <div id=\"notification_progress\"></div>\n</div>";
      _show(html, time_out, cb);
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
      var html;
      html = "<div class=\"window confirm top_position downwards not_clickable\">\n  <span class=\"icon " + icon + "\">" + icon + "</span>\n  <span class=\"title\">" + title + "</span>\n  <div class=\"content padding bottom clear\">" + content + "</div>\n  <button class=\"button accept\">" + accept.text + "</button>\n  <button class=\"button cancel\">" + cancel.text + "</button>\n</div>";
      return _show(html, null, cb);
    };
    hide = function() {
      active = false;
      clearTimeout(timeout);
      timeout = null;
      notification.children(".window").removeClass("show");
      return setTimeout(_hide, 500);
    };
    _iconHtml = function(icon, type, title, content) {
      var html;
      return html = "<div class=\"window " + type + " top_position upwards margin\">\n  <span class=\"icon " + icon + "\">" + icon + "</span>\n  <div>\n    <span class=\"title\">" + title + "</span>\n    <div class=\"content\">" + content + "</div>\n  </div>\n</div>";
    };
    _show = function(html, time_out, cb) {
      var original_cb;
      if (!active) {
        active = true;
        notification.html(html);
        notification.addClass("show");
        setTimeout((function() {
          return notification.children(".window").addClass("show");
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
    _onclick = function() {
      var element;
      element = notification.children(".window");
      if (!element.hasClass("not_clickable")) {
        active = false;
        clearTimeout(timeout);
        timeout = null;
        element.removeClass("show");
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
    notification.bind("click", _onclick);
    return {
      success: success,
      error: error,
      confirm: confirm,
      loading: loading,
      progress: progress,
      hide: hide
    };
  })(TaKo);

}).call(this);

(function() {
  TaKo.ProgressBar = function(container, value) {
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
