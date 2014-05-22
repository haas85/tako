(function(w, undefined_) {
  var canBeFilledWithPoly, doc, docElem, enabledClassName, nativeOverflow;
  doc = w.document;
  docElem = doc.documentElement;
  enabledClassName = "overthrow-enabled";
  canBeFilledWithPoly = "ontouchmove" in doc;
  nativeOverflow = "WebkitOverflowScrolling" in docElem.style || "msOverflowStyle" in docElem.style || (!canBeFilledWithPoly && w.screen.width > 800) || (function() {
    var ua, webkit, wkLte534, wkversion;
    ua = w.navigator.userAgent;
    webkit = ua.match(/AppleWebKit\/([0-9]+)/);
    wkversion = webkit && webkit[1];
    wkLte534 = webkit && wkversion >= 534;
    return ua.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && wkLte534 || ua.match(RegExp(" Version\\/([0-9]+)")) && RegExp.$1 >= 0 && w.blackberry && wkLte534 || ua.indexOf("PlayBook") > -1 && wkLte534 && !ua.indexOf("Android 2") === -1 || ua.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 || ua.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && wkLte534 || ua.match(/NokiaBrowser\/([0-9\.]+)/) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533;
  })();
  w.overthrow = {};
  w.overthrow.enabledClassName = enabledClassName;
  w.overthrow.addClass = function() {
    if (docElem.className.indexOf(w.overthrow.enabledClassName) === -1) {
      docElem.className += " " + w.overthrow.enabledClassName;
    }
  };
  w.overthrow.removeClass = function() {
    docElem.className = docElem.className.replace(w.overthrow.enabledClassName, "");
  };
  w.overthrow.set = function() {
    if (nativeOverflow) {
      w.overthrow.addClass();
    }
  };
  w.overthrow.canBeFilledWithPoly = canBeFilledWithPoly;
  w.overthrow.forget = function() {
    w.overthrow.removeClass();
  };
  w.overthrow.support = (nativeOverflow ? "native" : "none");
})(this);

(function(w, o, undefined_) {
  var timeKeeper;
  if (o === undefined) {
    return;
  }
  o.easing = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  };
  o.tossing = false;
  timeKeeper = void 0;
  o.toss = function(elem, options) {
    var endLeft, endTop, finished, i, j, op, sLeft, sTop;
    o.intercept();
    i = 0;
    sLeft = elem.scrollLeft;
    sTop = elem.scrollTop;
    op = {
      top: "+0",
      left: "+0",
      duration: 50,
      easing: o.easing,
      finished: function() {}
    };
    endLeft = void 0;
    endTop = void 0;
    finished = false;
    if (options) {
      for (j in op) {
        if (options[j] !== undefined) {
          op[j] = options[j];
        }
      }
    }
    if (typeof op.left === "string") {
      op.left = parseFloat(op.left);
      endLeft = op.left + sLeft;
    } else {
      endLeft = op.left;
      op.left = op.left - sLeft;
    }
    if (typeof op.top === "string") {
      op.top = parseFloat(op.top);
      endTop = op.top + sTop;
    } else {
      endTop = op.top;
      op.top = op.top - sTop;
    }
    o.tossing = true;
    timeKeeper = setInterval(function() {
      if (i++ < op.duration) {
        elem.scrollLeft = op.easing(i, sLeft, op.left, op.duration);
        elem.scrollTop = op.easing(i, sTop, op.top, op.duration);
      } else {
        if (endLeft !== elem.scrollLeft) {
          elem.scrollLeft = endLeft;
        } else {
          if (finished) {
            op.finished();
          }
          finished = true;
        }
        if (endTop !== elem.scrollTop) {
          elem.scrollTop = endTop;
        } else {
          if (finished) {
            op.finished();
          }
          finished = true;
        }
        o.intercept();
      }
    }, 1);
    return {
      top: endTop,
      left: endLeft,
      duration: o.duration,
      easing: o.easing
    };
  };
  o.intercept = function() {
    clearInterval(timeKeeper);
    o.tossing = false;
  };
})(this, this.overthrow);

(function(w, o, undefined_) {
  var canBeFilledWithPoly, configure, doc, docElem, enabled, forget, nativeOverflow, scrollIndicatorClassName, set;
  if (o === undefined) {
    return;
  }
  o.scrollIndicatorClassName = "scroll";
  doc = w.document;
  docElem = doc.documentElement;
  nativeOverflow = o.support === "native";
  canBeFilledWithPoly = o.canBeFilledWithPoly;
  configure = o.configure;
  set = o.set;
  forget = o.forget;
  scrollIndicatorClassName = o.scrollIndicatorClassName;
  o.closest = function(target, ascend) {
    return !ascend && (target != null) && ((target.className && target.className.indexOf(scrollIndicatorClassName) > -1) || (target.nodeName === "SECTION") || (target.nodeName === "ASIDE")) && target || ((target != null) && o.closest(target.parentNode));
  };
  enabled = false;
  o.set = function() {
    var changeScrollTarget, elem, inputs, lastDown, lastLefts, lastRight, lastTops, resetHorTracking, resetVertTracking, setPointers, start;
    set();
    if (enabled || nativeOverflow || !canBeFilledWithPoly) {
      return;
    }
    w.overthrow.addClass();
    enabled = true;
    o.support = "polyfilled";
    o.forget = function() {
      forget();
      enabled = false;
      if (doc.removeEventListener) {
        doc.removeEventListener("touchstart", start, false);
      }
    };
    elem = void 0;
    lastTops = [];
    lastLefts = [];
    lastDown = void 0;
    lastRight = void 0;
    resetVertTracking = function() {
      lastTops = [];
      lastDown = null;
    };
    resetHorTracking = function() {
      lastLefts = [];
      lastRight = null;
    };
    inputs = void 0;
    setPointers = function(val) {
      var i, il;
      inputs = elem ? elem.querySelectorAll("textarea, input") : [];
      i = 0;
      il = inputs.length;
      while (i < il) {
        inputs[i].style.pointerEvents = val;
        i++;
      }
    };
    changeScrollTarget = function(startEvent, ascend) {
      var newTarget, tEnd;
      if (doc.createEvent) {
        newTarget = (!ascend || ascend === undefined) && elem.parentNode || elem.touchchild || elem;
        tEnd = void 0;
        if (newTarget !== elem) {
          tEnd = doc.createEvent("HTMLEvents");
          tEnd.initEvent("touchend", true, true);
          elem.dispatchEvent(tEnd);
          newTarget.touchchild = elem;
          elem = newTarget;
          newTarget.dispatchEvent(startEvent);
        }
      }
    };
    start = function(e) {
      var end, height, move, scrollHeight, scrollL, scrollT, scrollWidth, startX, startY, touchStartE, width;
      if (o.intercept) {
        o.intercept();
      }
      resetVertTracking();
      resetHorTracking();
      elem = o.closest(e.target);
      if (!elem || elem === docElem || e.touches.length > 1) {
        return;
      }
      setPointers("none");
      touchStartE = e;
      scrollT = elem.scrollTop;
      scrollL = elem.scrollLeft;
      height = elem.offsetHeight;
      width = elem.offsetWidth;
      startY = e.touches[0].pageY;
      startX = e.touches[0].pageX;
      scrollHeight = elem.scrollHeight;
      scrollWidth = elem.scrollWidth;
      move = function(e) {
        var down, right, tx, ty;
        ty = scrollT + startY - e.touches[0].pageY;
        tx = scrollL + startX - e.touches[0].pageX;
        down = ty >= (lastTops.length ? lastTops[0] : 0);
        right = tx >= (lastLefts.length ? lastLefts[0] : 0);
        if ((ty > 0 && ty < scrollHeight - height) || (tx > 0 && tx < scrollWidth - width)) {
          e.preventDefault();
        } else {
          changeScrollTarget(touchStartE);
        }
        if (lastDown && down !== lastDown) {
          resetVertTracking();
        }
        if (lastRight && right !== lastRight) {
          resetHorTracking();
        }
        lastDown = down;
        lastRight = right;
        elem.scrollTop = ty;
        elem.scrollLeft = tx;
        lastTops.unshift(ty);
        lastLefts.unshift(tx);
        if (lastTops.length > 3) {
          lastTops.pop();
        }
        if (lastLefts.length > 3) {
          lastLefts.pop();
        }
      };
      end = function(e) {
        setPointers("auto");
        setTimeout((function() {
          setPointers("none");
        }), 450);
        elem.removeEventListener("touchmove", move, false);
        elem.removeEventListener("touchend", end, false);
      };
      elem.addEventListener("touchmove", move, false);
      elem.addEventListener("touchend", end, false);
    };
    doc.addEventListener("touchstart", start, false);
  };
})(this, this.overthrow);

(function(w, undefined_) {
  w.overthrow.set();
})(this);
