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
      var new_section, _current, _current_article, _current_section;
      _current_article = $("section.active article.active");
      _current_section = _current_article.parent();
      _current = $("article#" + article_id);
      new_section = _current.parent();
      if (_current_article[0].id !== _current[0].id) {
        new_section.children().removeClass("active");
        _current.addClass("active");
      }
      if (_current_section[0].id !== new_section[0].id) {
        return TaKo.Section.goTo(new_section[0].id);
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
  TaKo.Notification = (function(TK) {
    var active, callback, hide, notification, notification_window, show, timeout, _hide;
    active = false;
    $("body").append("<div data-element=\"notification\">\n  <div class=\"window\">\n    <span class=\"title\"></span>\n    <div class=\"content\"></div>\n    </div>\n</div>");
    notification = $("div[data-element=notification]");
    notification_window = notification.children(".window");
    timeout = null;
    callback = null;
    show = function(title, content, time_out, cb) {
      if (!active) {
        active = true;
        notification_window.children(".title").html(title);
        notification_window.children(".content").html(content);
        notification.addClass("show");
        setTimeout((function() {
          return notification_window.addClass("show");
        }), 1);
        if (cb != null) {
          callback = cb;
        }
        if (time_out != null) {
          return timeout = setTimeout(hide, time_out * 1000);
        }
      }
    };
    hide = function() {
      active = false;
      clearTimeout(timeout);
      timeout = null;
      notification_window.removeClass("show");
      return setTimeout(_hide, 500);
    };
    _hide = function() {
      notification.removeClass("show");
      if (callback != null) {
        callback.call(callback);
      }
      return callback = null;
    };
    notification.bind("click", hide);
    return {
      show: show,
      hide: hide
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
      var _current;
      $("section.active").removeClass("active");
      _current = $("section#" + section_id).addClass("active");
      $(".current[data-section]").removeClass("current");
      return $("[data-section=" + section_id + "]").addClass("current");
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
