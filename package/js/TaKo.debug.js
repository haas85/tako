(function() {
  var TaKo;

  window.TaKo = TaKo = {};

}).call(this);

(function() {
  TaKo.Aside = (function(TK) {
    var aside, bck, hide, show, toggle;
    aside = $("aside");
    bck = $("#background");
    show = function() {
      bck.css("z-index", "109");
      return aside.addClass("show");
    };
    hide = function() {
      aside.removeClass("show");
      return bck.css("z-index", "0");
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
