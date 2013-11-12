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
    var goTo;
    goTo = function(article_id) {
      var current_article, current_section, new_article, new_section;
      current_article = $("section.active article.active");
      current_section = current_article.parent();
      new_article = $("article#" + article_id);
      new_section = new_article.parent();
      if (current_article[0].id !== new_article[0].id) {
        new_section.children().removeClass("active");
        new_article.addClass("active");
      }
      if (current_section[0].id !== new_section[0].id) {
        return TaKo.Section.goTo(new_section[0].id);
      }
    };
    $("[data-article]").each(function(element) {
      var _this = this;
      return $(this).bind("click", function() {
        return goTo($(_this).attr("data-article"));
      });
    });
    return {
      goTo: goTo
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
    return {
      show: show,
      hide: hide,
      toggle: toggle
    };
  })(TaKo);

}).call(this);

(function() {
  TaKo.Notification = (function(TK) {
    var active, callback, hide, notification, notification_window, show, timeout;
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
    var goTo;
    goTo = function(section_id) {
      $("section.active").removeClass("active");
      return $("section#" + section_id).addClass("active");
    };
    $("[data-section]").each(function(element) {
      var _this = this;
      return $(this).bind("click", function() {
        return goTo($(_this).attr("data-section"));
      });
    });
    return {
      goTo: goTo
    };
  })(TaKo);

}).call(this);
