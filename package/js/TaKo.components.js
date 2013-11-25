/* TaKo v0.1.0 - 11/25/2013
   http://
   Copyright (c) 2013  - Licensed  */
(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function a(a){return a==null?String(a):U[V.call(a)]||"object"}function b(b){return a(b)=="function"}function c(a){return a!=null&&a==a.window}function d(a){return a!=null&&a.nodeType==a.DOCUMENT_NODE}function e(b){return a(b)=="object"}function f(a){return e(a)&&!c(a)&&a.__proto__==Object.prototype}function g(a){return a instanceof Array}function h(a){return typeof a.length=="number"}function i(a){return C.call(a,function(a){return a!=null})}function j(a){return a.length>0?y.fn.concat.apply([],a):a}function k(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(a){return a in F?F[a]:F[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function m(a,b){return typeof b=="number"&&!H[k(a)]?b+"px":b}function n(a){var b,c;return E[a]||(b=D.createElement(a),D.body.appendChild(b),c=G(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),E[a]=c),E[a]}function o(a){return"children"in a?B.call(a.children):y.map(a.childNodes,function(a){if(a.nodeType==1)return a})}function p(a,b,c){for(x in b)c&&(f(b[x])||g(b[x]))?(f(b[x])&&!f(a[x])&&(a[x]={}),g(b[x])&&!g(a[x])&&(a[x]=[]),p(a[x],b[x],c)):b[x]!==w&&(a[x]=b[x])}function q(a,b){return b===w?y(a):y(a).filter(b)}function r(a,c,d,e){return b(c)?c.call(a,d,e):c}function s(a,b,c){c==null?a.removeAttribute(b):a.setAttribute(b,c)}function t(a,b){var c=a.className,d=c&&c.baseVal!==w;if(b===w)return d?c.baseVal:c;d?c.baseVal=b:a.className=b}function u(a){var b;try{return a?a=="true"||(a=="false"?!1:a=="null"?null:isNaN(b=Number(a))?/^[\[\{]/.test(a)?y.parseJSON(a):a:b):a}catch(c){return a}}function v(a,b){b(a);for(var c in a.childNodes)v(a.childNodes[c],b)}var w,x,y,z,A=[],B=A.slice,C=A.filter,D=window.document,E={},F={},G=D.defaultView.getComputedStyle,H={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},I=/^\s*<(\w+|!)[^>]*>/,J=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,K=/^(?:body|html)$/i,L=["val","css","html","text","data","width","height","offset"],M=["after","prepend","before","append"],N=D.createElement("table"),O=D.createElement("tr"),P={tr:D.createElement("tbody"),tbody:N,thead:N,tfoot:N,td:O,th:O,"*":D.createElement("div")},Q=/complete|loaded|interactive/,R=/^\.([\w-]+)$/,S=/^#([\w-]*)$/,T=/^[\w-]+$/,U={},V=U.toString,W={},X,Y,Z=D.createElement("div");return W.matches=function(a,b){if(!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=Z).appendChild(a),d=~W.qsa(e,b).indexOf(a),f&&Z.removeChild(a),d},X=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},Y=function(a){return C.call(a,function(b,c){return a.indexOf(b)==c})},W.fragment=function(a,b,c){a.replace&&(a=a.replace(J,"<$1></$2>")),b===w&&(b=I.test(a)&&RegExp.$1),b in P||(b="*");var d,e,g=P[b];return g.innerHTML=""+a,e=y.each(B.call(g.childNodes),function(){g.removeChild(this)}),f(c)&&(d=y(e),y.each(c,function(a,b){L.indexOf(a)>-1?d[a](b):d.attr(a,b)})),e},W.Z=function(a,b){return a=a||[],a.__proto__=y.fn,a.selector=b||"",a},W.isZ=function(a){return a instanceof W.Z},W.init=function(a,c){if(!a)return W.Z();if(b(a))return y(D).ready(a);if(W.isZ(a))return a;var d;if(g(a))d=i(a);else if(e(a))d=[f(a)?y.extend({},a):a],a=null;else if(I.test(a))d=W.fragment(a.trim(),RegExp.$1,c),a=null;else{if(c!==w)return y(c).find(a);d=W.qsa(D,a)}return W.Z(d,a)},y=function(a,b){return W.init(a,b)},y.extend=function(a){var b,c=B.call(arguments,1);return typeof a=="boolean"&&(b=a,a=c.shift()),c.forEach(function(c){p(a,c,b)}),a},W.qsa=function(a,b){var c;return d(a)&&S.test(b)?(c=a.getElementById(RegExp.$1))?[c]:[]:a.nodeType!==1&&a.nodeType!==9?[]:B.call(R.test(b)?a.getElementsByClassName(RegExp.$1):T.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},y.contains=function(a,b){return a!==b&&a.contains(b)},y.type=a,y.isFunction=b,y.isWindow=c,y.isArray=g,y.isPlainObject=f,y.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},y.inArray=function(a,b,c){return A.indexOf.call(b,a,c)},y.camelCase=X,y.trim=function(a){return a.trim()},y.uuid=0,y.support={},y.expr={},y.map=function(a,b){var c,d=[],e,f;if(h(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return j(d)},y.each=function(a,b){var c,d;if(h(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},y.grep=function(a,b){return C.call(a,b)},window.JSON&&(y.parseJSON=JSON.parse),y.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){U["[object "+b+"]"]=b.toLowerCase()}),y.fn={forEach:A.forEach,reduce:A.reduce,push:A.push,sort:A.sort,indexOf:A.indexOf,concat:A.concat,map:function(a){return y(y.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return y(B.apply(this,arguments))},ready:function(a){return Q.test(D.readyState)?a(y):D.addEventListener("DOMContentLoaded",function(){a(y)},!1),this},get:function(a){return a===w?B.call(this):this[a>=0?a:a+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return A.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return b(a)?this.not(this.not(a)):y(C.call(this,function(b){return W.matches(b,a)}))},add:function(a,b){return y(Y(this.concat(y(a,b))))},is:function(a){return this.length>0&&W.matches(this[0],a)},not:function(a){var c=[];if(b(a)&&a.call!==w)this.each(function(b){a.call(this,b)||c.push(this)});else{var d=typeof a=="string"?this.filter(a):h(a)&&b(a.item)?B.call(a):y(a);this.forEach(function(a){d.indexOf(a)<0&&c.push(a)})}return y(c)},has:function(a){return this.filter(function(){return e(a)?y.contains(this,a):y(this).find(a).size()})},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!e(a)?a:y(a)},last:function(){var a=this[this.length-1];return a&&!e(a)?a:y(a)},find:function(a){var b,c=this;return typeof a=="object"?b=y(a).filter(function(){var a=this;return A.some.call(c,function(b){return y.contains(b,a)})}):this.length==1?b=y(W.qsa(this[0],a)):b=this.map(function(){return W.qsa(this,a)}),b},closest:function(a,b){var c=this[0],e=!1;typeof a=="object"&&(e=y(a));while(c&&!(e?e.indexOf(c)>=0:W.matches(c,a)))c=c!==b&&!d(c)&&c.parentNode;return y(c)},parents:function(a){var b=[],c=this;while(c.length>0)c=y.map(c,function(a){if((a=a.parentNode)&&!d(a)&&b.indexOf(a)<0)return b.push(a),a});return q(b,a)},parent:function(a){return q(Y(this.pluck("parentNode")),a)},children:function(a){return q(this.map(function(){return o(this)}),a)},contents:function(){return this.map(function(){return B.call(this.childNodes)})},siblings:function(a){return q(this.map(function(a,b){return C.call(o(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return y.map(this,function(b){return b[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),G(this,"").getPropertyValue("display")=="none"&&(this.style.display=n(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var c=b(a);if(this[0]&&!c)var d=y(a).get(0),e=d.parentNode||this.length>1;return this.each(function(b){y(this).wrapAll(c?a.call(this,b):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){y(this[0]).before(a=y(a));var b;while((b=a.children()).length)a=b.first();y(a).append(this)}return this},wrapInner:function(a){var c=b(a);return this.each(function(b){var d=y(this),e=d.contents(),f=c?a.call(this,b):a;e.length?e.wrapAll(f):d.append(f)})},unwrap:function(){return this.parent().each(function(){y(this).replaceWith(y(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(a){return this.each(function(){var b=y(this);(a===w?b.css("display")=="none":a)?b.show():b.hide()})},prev:function(a){return y(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return y(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return a===w?this.length>0?this[0].innerHTML:null:this.each(function(b){var c=this.innerHTML;y(this).empty().append(r(this,a,b,c))})},text:function(a){return a===w?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=a})},attr:function(a,b){var c;return typeof a=="string"&&b===w?this.length==0||this[0].nodeType!==1?w:a=="value"&&this[0].nodeName=="INPUT"?this.val():!(c=this[0].getAttribute(a))&&a in this[0]?this[0][a]:c:this.each(function(c){if(this.nodeType!==1)return;if(e(a))for(x in a)s(this,x,a[x]);else s(this,a,r(this,b,c,this.getAttribute(a)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&s(this,a)})},prop:function(a,b){return b===w?this[0]&&this[0][a]:this.each(function(c){this[a]=r(this,b,c,this[a])})},data:function(a,b){var c=this.attr("data-"+k(a),b);return c!==null?u(c):w},val:function(a){return a===w?this[0]&&(this[0].multiple?y(this[0]).find("option").filter(function(a){return this.selected}).pluck("value"):this[0].value):this.each(function(b){this.value=r(this,a,b,this.value)})},offset:function(a){if(a)return this.each(function(b){var c=y(this),d=r(this,a,b,c.offset()),e=c.offsetParent().offset(),f={top:d.top-e.top,left:d.left-e.left};c.css("position")=="static"&&(f.position="relative"),c.css(f)});if(this.length==0)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(b,c){if(arguments.length<2&&typeof b=="string")return this[0]&&(this[0].style[X(b)]||G(this[0],"").getPropertyValue(b));var d="";if(a(b)=="string")!c&&c!==0?this.each(function(){this.style.removeProperty(k(b))}):d=k(b)+":"+m(b,c);else for(x in b)!b[x]&&b[x]!==0?this.each(function(){this.style.removeProperty(k(x))}):d+=k(x)+":"+m(x,b[x])+";";return this.each(function(){this.style.cssText+=";"+d})},index:function(a){return a?this.indexOf(y(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return A.some.call(this,function(a){return this.test(t(a))},l(a))},addClass:function(a){return this.each(function(b){z=[];var c=t(this),d=r(this,a,b,c);d.split(/\s+/g).forEach(function(a){y(this).hasClass(a)||z.push(a)},this),z.length&&t(this,c+(c?" ":"")+z.join(" "))})},removeClass:function(a){return this.each(function(b){if(a===w)return t(this,"");z=t(this),r(this,a,b,z).split(/\s+/g).forEach(function(a){z=z.replace(l(a)," ")}),t(this,z.trim())})},toggleClass:function(a,b){return this.each(function(c){var d=y(this),e=r(this,a,c,t(this));e.split(/\s+/g).forEach(function(a){(b===w?!d.hasClass(a):b)?d.addClass(a):d.removeClass(a)})})},scrollTop:function(){if(!this.length)return;return"scrollTop"in this[0]?this[0].scrollTop:this[0].scrollY},position:function(){if(!this.length)return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=K.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(y(a).css("margin-top"))||0,c.left-=parseFloat(y(a).css("margin-left"))||0,d.top+=parseFloat(y(b[0]).css("border-top-width"))||0,d.left+=parseFloat(y(b[0]).css("border-left-width"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||D.body;while(a&&!K.test(a.nodeName)&&y(a).css("position")=="static")a=a.offsetParent;return a})}},y.fn.detach=y.fn.remove,["width","height"].forEach(function(a){y.fn[a]=function(b){var e,f=this[0],g=a.replace(/./,function(a){return a[0].toUpperCase()});return b===w?c(f)?f["inner"+g]:d(f)?f.documentElement["offset"+g]:(e=this.offset())&&e[a]:this.each(function(c){f=y(this),f.css(a,r(this,b,c,f[a]()))})}}),M.forEach(function(b,c){var d=c%2;y.fn[b]=function(){var b,e=y.map(arguments,function(c){return b=a(c),b=="object"||b=="array"||c==null?c:W.fragment(c)}),f,g=this.length>1;return e.length<1?this:this.each(function(a,b){f=d?b:b.parentNode,b=c==0?b.nextSibling:c==1?b.firstChild:c==2?b:null,e.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!f)return y(a).remove();v(f.insertBefore(a,b),function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&!a.src&&window.eval.call(window,a.innerHTML)})})})},y.fn[d?b+"To":"insert"+(c?"Before":"After")]=function(a){return y(a)[b](this),this}}),W.Z.prototype=y.fn,W.uniq=Y,W.deserializeValue=u,y.zepto=W,y}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/Kindle\/([\d.]+)/),k=a.match(/Silk\/([\d._]+)/),l=a.match(/(BlackBerry).*Version\/([\d.]+)/),m=a.match(/(BB10).*Version\/([\d.]+)/),n=a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),o=a.match(/PlayBook/),p=a.match(/Chrome\/([\d.]+)/)||a.match(/CriOS\/([\d.]+)/),q=a.match(/Firefox\/([\d.]+)/);if(c.webkit=!!d)c.version=d[1];e&&(b.android=!0,b.version=e[2]),g&&(b.ios=b.iphone=!0,b.version=g[2].replace(/_/g,".")),f&&(b.ios=b.ipad=!0,b.version=f[2].replace(/_/g,".")),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),l&&(b.blackberry=!0,b.version=l[2]),m&&(b.bb10=!0,b.version=m[2]),n&&(b.rimtabletos=!0,b.version=n[2]),o&&(c.playbook=!0),j&&(b.kindle=!0,b.version=j[1]),k&&(c.silk=!0,c.version=k[1]),!k&&b.android&&a.match(/Kindle Fire/)&&(c.silk=!0),p&&(c.chrome=!0,c.version=p[1]),q&&(c.firefox=!0,c.version=q[1]),b.tablet=!!(f||o||e&&!a.match(/Mobile/)||q&&a.match(/Tablet/)),b.phone=!b.tablet&&!!(e||g||h||l||m||p&&a.match(/Android/)||p&&a.match(/CriOS\/([\d.]+)/)||q&&a.match(/Mobile/))}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a){function b(a){return a._zid||(a._zid=o++)}function c(a,c,f,g){c=d(c);if(c.ns)var h=e(c.ns);return(n[b(a)]||[]).filter(function(a){return a&&(!c.e||a.e==c.e)&&(!c.ns||h.test(a.ns))&&(!f||b(a.fn)===b(f))&&(!g||a.sel==g)})}function d(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function e(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function f(b,c,d){a.type(b)!="string"?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function g(a,b){return a.del&&(a.e=="focus"||a.e=="blur")||!!b}function h(a){return q[a]||a}function i(c,e,i,j,k,l){var m=b(c),o=n[m]||(n[m]=[]);f(e,i,function(b,e){var f=d(b);f.fn=e,f.sel=j,f.e in q&&(e=function(b){var c=b.relatedTarget;if(!c||c!==this&&!a.contains(this,c))return f.fn.apply(this,arguments)}),f.del=k&&k(e,b);var i=f.del||e;f.proxy=function(a){var b=i.apply(c,[a].concat(a.data));return b===!1&&(a.preventDefault(),a.stopPropagation()),b},f.i=o.length,o.push(f),c.addEventListener(h(f.e),f.proxy,g(f,l))})}function j(a,d,e,i,j){var k=b(a);f(d||"",e,function(b,d){c(a,b,d,i).forEach(function(b){delete n[k][b.i],a.removeEventListener(h(b.e),b.proxy,g(b,j))})})}function k(b){var c,d={originalEvent:b};for(c in b)!t.test(c)&&b[c]!==undefined&&(d[c]=b[c]);return a.each(u,function(a,c){d[a]=function(){return this[c]=r,b[a].apply(b,arguments)},d[c]=s}),d}function l(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var m=a.zepto.qsa,n={},o=1,p={},q={mouseenter:"mouseover",mouseleave:"mouseout"};p.click=p.mousedown=p.mouseup=p.mousemove="MouseEvents",a.event={add:i,remove:j},a.proxy=function(c,d){if(a.isFunction(c)){var e=function(){return c.apply(d,arguments)};return e._zid=b(c),e}if(typeof d=="string")return a.proxy(c[d],c);throw new TypeError("expected function")},a.fn.bind=function(a,b){return this.each(function(){i(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){j(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){i(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return j(d,b,a),c}})})};var r=function(){return!0},s=function(){return!1},t=/^([A-Z]|layer[XY]$)/,u={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){return this.each(function(e,f){i(f,c,d,b,function(c){return function(d){var e,g=a(d.target).closest(b,f).get(0);if(g)return e=a.extend(k(d),{currentTarget:g,liveFired:f}),c.apply(g,[e].concat([].slice.call(arguments,1)))}})})},a.fn.undelegate=function(a,b,c){return this.each(function(){j(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return!c||a.isFunction(c)?this.bind(b,c||d):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return!c||a.isFunction(c)?this.unbind(b,c||d):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){if(typeof b=="string"||a.isPlainObject(b))b=a.Event(b);return l(b),b.data=c,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,d){var e,f;return this.each(function(g,h){e=k(typeof b=="string"?a.Event(b):b),e.data=d,e.target=h,a.each(c(h,b.type||b),function(a,b){f=b.proxy(e);if(e.isImmediatePropagationStopped())return!1})}),f},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){typeof a!="string"&&(b=a,a=b.type);var c=document.createEvent(p[a]||"Events"),d=!0;if(b)for(var e in b)e=="bubbles"?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c.isDefaultPrevented=function(){return this.defaultPrevented},c}}(Zepto),function(a){function b(b,c,d){var e=a.Event(c);return a(b).trigger(e,d),!e.defaultPrevented}function c(a,c,d,e){if(a.global)return b(c||q,d,e)}function d(b){b.global&&a.active++===0&&c(b,null,"ajaxStart")}function e(b){b.global&&!--a.active&&c(b,null,"ajaxStop")}function f(a,b){var d=b.context;if(b.beforeSend.call(d,a,b)===!1||c(b,d,"ajaxBeforeSend",[a,b])===!1)return!1;c(b,d,"ajaxSend",[a,b])}function g(a,b,d){var e=d.context,f="success";d.success.call(e,a,f,b),c(d,e,"ajaxSuccess",[b,d,a]),i(f,b,d)}function h(a,b,d,e){var f=e.context;e.error.call(f,d,b,a),c(e,f,"ajaxError",[d,e,a]),i(b,d,e)}function i(a,b,d){var f=d.context;d.complete.call(f,b,a),c(d,f,"ajaxComplete",[b,d]),e(d)}function j(){}function k(a){return a&&(a=a.split(";",2)[0]),a&&(a==x?"html":a==w?"json":u.test(a)?"script":v.test(a)&&"xml")||"text"}function l(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function m(b){b.processData&&b.data&&a.type(b.data)!="string"&&(b.data=a.param(b.data,b.traditional)),b.data&&(!b.type||b.type.toUpperCase()=="GET")&&(b.url=l(b.url,b.data))}function n(b,c,d,e){var f=!a.isFunction(c);return{url:b,data:f?c:undefined,success:f?a.isFunction(d)?d:undefined:c,dataType:f?e||d:d}}function o(b,c,d,e){var f,g=a.isArray(c);a.each(c,function(c,h){f=a.type(h),e&&(c=d?e:e+"["+(g?"":c)+"]"),!e&&g?b.add(h.name,h.value):f=="array"||!d&&f=="object"?o(b,h,d,c):b.add(c,h)})}var p=0,q=window.document,r,s,t=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,u=/^(?:text|application)\/javascript/i,v=/^(?:text|application)\/xml/i,w="application/json",x="text/html",y=/^\s*$/;a.active=0,a.ajaxJSONP=function(b){if("type"in b){var c="jsonp"+ ++p,d=q.createElement("script"),e=function(){clearTimeout(l),a(d).remove(),delete window[c]},i=function(a){e();if(!a||a=="timeout")window[c]=j;h(null,a||"abort",k,b)},k={abort:i},l;return f(k,b)===!1?(i("abort"),!1):(window[c]=function(a){e(),g(a,k,b)},d.onerror=function(){i("error")},d.src=b.url.replace(/=\?/,"="+c),a("head").append(d),b.timeout>0&&(l=setTimeout(function(){i("timeout")},b.timeout)),k)}return a.ajax(b)},a.ajaxSettings={type:"GET",beforeSend:j,success:j,error:j,complete:j,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:w,xml:"application/xml, text/xml",html:x,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},a.ajax=function(b){var c=a.extend({},b||{});for(r in a.ajaxSettings)c[r]===undefined&&(c[r]=a.ajaxSettings[r]);d(c),c.crossDomain||(c.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(c.url)&&RegExp.$2!=window.location.host),c.url||(c.url=window.location.toString()),m(c),c.cache===!1&&(c.url=l(c.url,"_="+Date.now()));var e=c.dataType,i=/=\?/.test(c.url);if(e=="jsonp"||i)return i||(c.url=l(c.url,"callback=?")),a.ajaxJSONP(c);var n=c.accepts[e],o={},p=/^([\w-]+:)\/\//.test(c.url)?RegExp.$1:window.location.protocol,q=c.xhr(),t;c.crossDomain||(o["X-Requested-With"]="XMLHttpRequest"),n&&(o.Accept=n,n.indexOf(",")>-1&&(n=n.split(",",2)[0]),q.overrideMimeType&&q.overrideMimeType(n));if(c.contentType||c.contentType!==!1&&c.data&&c.type.toUpperCase()!="GET")o["Content-Type"]=c.contentType||"application/x-www-form-urlencoded";c.headers=a.extend(o,c.headers||{}),q.onreadystatechange=function(){if(q.readyState==4){q.onreadystatechange=j,clearTimeout(t);var b,d=!1;if(q.status>=200&&q.status<300||q.status==304||q.status==0&&p=="file:"){e=e||k(q.getResponseHeader("content-type")),b=q.responseText;try{e=="script"?(1,eval)(b):e=="xml"?b=q.responseXML:e=="json"&&(b=y.test(b)?null:a.parseJSON(b))}catch(f){d=f}d?h(d,"parsererror",q,c):g(b,q,c)}else h(null,q.status?"error":"abort",q,c)}};var u="async"in c?c.async:!0;q.open(c.type,c.url,u);for(s in c.headers)q.setRequestHeader(s,c.headers[s]);return f(q,c)===!1?(q.abort(),!1):(c.timeout>0&&(t=setTimeout(function(){q.onreadystatechange=j,q.abort(),h(null,"timeout",q,c)},c.timeout)),q.send(c.data?c.data:null),q)},a.get=function(b,c,d,e){return a.ajax(n.apply(null,arguments))},a.post=function(b,c,d,e){var f=n.apply(null,arguments);return f.type="POST",a.ajax(f)},a.getJSON=function(b,c,d){var e=n.apply(null,arguments);return e.dataType="json",a.ajax(e)},a.fn.load=function(b,c,d){if(!this.length)return this;var e=this,f=b.split(/\s/),g,h=n(b,c,d),i=h.success;return f.length>1&&(h.url=f[0],g=f[1]),h.success=function(b){e.html(g?a("<div>").html(b.replace(t,"")).find(g):b),i&&i.apply(e,arguments)},a.ajax(h),this};var z=encodeURIComponent;a.param=function(a,b){var c=[];return c.add=function(a,b){this.push(z(a)+"="+z(b))},o(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a,b){function c(a){return d(a.replace(/([a-z])([A-Z])/,"$1-$2"))}function d(a){return a.toLowerCase()}function e(a){return g?g+a:d(a)}var f="",g,h,i,j={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},k=window.document,l=k.createElement("div"),m=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,n,o,p,q,r,s,t,u={};a.each(j,function(a,c){if(l.style[a+"TransitionProperty"]!==b)return f="-"+d(a)+"-",g=c,!1}),n=f+"transform",u[o=f+"transition-property"]=u[p=f+"transition-duration"]=u[q=f+"transition-timing-function"]=u[r=f+"animation-name"]=u[s=f+"animation-duration"]=u[t=f+"animation-timing-function"]="",a.fx={off:g===b&&l.style.transitionProperty===b,speeds:{_default:400,fast:200,slow:600},cssPrefix:f,transitionEnd:e("TransitionEnd"),animationEnd:e("AnimationEnd")},a.fn.animate=function(b,c,d,e){return a.isPlainObject(c)&&(d=c.easing,e=c.complete,c=c.duration),c&&(c=(typeof c=="number"?c:a.fx.speeds[c]||a.fx.speeds._default)/1e3),this.anim(b,c,d,e)},a.fn.anim=function(d,e,f,g){var h,i={},j,k="",l=this,v,w=a.fx.transitionEnd;e===b&&(e=.4),a.fx.off&&(e=0);if(typeof d=="string")i[r]=d,i[s]=e+"s",i[t]=f||"linear",w=a.fx.animationEnd;else{j=[];for(h in d)m.test(h)?k+=h+"("+d[h]+") ":(i[h]=d[h],j.push(c(h)));k&&(i[n]=k,j.push(n)),e>0&&typeof d=="object"&&(i[o]=j.join(", "),i[p]=e+"s",i[q]=f||"linear")}return v=function(b){if(typeof b!="undefined"){if(b.target!==b.currentTarget)return;a(b.target).unbind(w,v)}a(this).css(u),g&&g.call(this)},e>0&&this.bind(w,v),this.size()&&this.get(0).clientLeft,this.css(i),e<=0&&setTimeout(function(){l.each(function(){v.call(this)})},0),this},l=null}(Zepto);