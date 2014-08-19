/* TaKo v1.2.1 - 19/08/2014
   http://takojs.com
   Copyright (c) 2014 Iñigo Gonzalez Vazquez <ingonza85@gmail.com> (@haas85) - Under MIT License */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n=[].slice,o=function(a,b){return function(){return a.apply(b,arguments)}};window.Tako=window.tk=e=function(){var a,b,c,d,f,g,h,j,l,m,n,o,p,q,r;document.body.addEventListener("touchmove",function(a){return a.preventDefault()});c={};Object.defineProperty(c,"LOG",{get:function(){return 4}});Object.defineProperty(c,"INFO",{get:function(){return 3}});Object.defineProperty(c,"WARN",{get:function(){return 2}});Object.defineProperty(c,"ERROR",{get:function(){return 1}});if($.os.wp){r="click";j="dblclick"}else{r="tap";j="doubletap"}f=0;a=[];g={};b=function(a){var b,c,d,h,i,j;if(a==null){a={}}try{g=a;e.logging.level=a.logging||false;if(a.hashNavigation==null){a.hashNavigation=false}if(a.articles!=null){f=a.articles.length;i=a.articles;j=[];for(d=0,h=i.length;d<h;d++){b=i[d];j.push($.ajax({url:b,crossDomain:true,dataType:"html",success:o,error:n}))}return j}else{return q()}}catch(k){c=k;return console.error(c)}};d=function(b){return a.push(b)};h=function(){var a,b;b=window.innerWidth>0?window.innerWidth:screen.width;a=window.innerHeight>0?window.innerHeight:screen.height;if(b>768&&b>a){return"TABLET/DESKTOP"}else{return"PHONE"}};q=function(){var a,b,c,d,f,h,j;b=document.location.hash||"";if(g.urlNavigation&&b!==""&&b!=="#"){b=b.replace("#","");b=b.split("/")}if(b.length===2){document.getElementById(b[0]).classList.add("active");document.getElementById(b[1]).classList.add("active")}else{if(document.querySelectorAll("article.active").length===0){$("article").first().addClass("active")}}Array.prototype.forEach.call(document.getElementsByTagName("section"),function(a){return a.appendChild($(document.createElement("div")).append($(a).children())[0])});$("article").each(function(){var a,b,c,d,e;if(this.getElementsByTagName("header").length!==0){this.setAttribute("data-header","")}if($(this).children("nav").length!==0){this.setAttribute("data-nav","")}if(this.getElementsByTagName("footer").length!==0){this.setAttribute("data-footer","")}if(this.querySelector("section.active")==null){d=this.children;e=[];for(b=0,c=d.length;b<c;b++){a=d[b];if(a.nodeName==="SECTION"){a.classList.add("active");break}else{e.push(void 0)}}return e}});d=document.querySelector("article.active section.active");c=d.parentElement.id;new IScroll(d,{probeType:2,mouseWheel:true,scrollbars:false,bounce:false,click:false,preventDefaultException:{tagName:/.*/}});d=d.id;Array.prototype.forEach.call(document.querySelectorAll("[data-visible="+d+"]"),function(a){return a.classList.add("show")});Array.prototype.forEach.call(document.querySelectorAll("[data-section="+d+"]"),function(a){return a.classList.add("current")});Array.prototype.forEach.call(document.querySelectorAll("[data-article="+c+"]"),function(a){return a.classList.add("current")});p("aside","data-article",e.Article,"tap");p("aside","data-section",e.Section,"tap");p("article","data-article",e.Article,"click");p("article","data-section",e.Section,"click");j=document.querySelectorAll("[data-action=aside]");for(f=0,h=j.length;f<h;f++){a=j[f];a.addEventListener("click",function(a){a.preventDefault();a.stopPropagation();return e.Aside.toggle()},false)}k();i();return l()};p=function(a,b,c,d){return $(""+a+" ["+b+"]").each(function(a){return $(this).on(d,function(a){a.preventDefault();a.stopPropagation();return m(c,a.target,b)})})};o=function(a){f--;$("body").append(a);if(f===0){return q()}};n=function(){f--;console.error("Article not downloaded");if(f===0){return q()}};l=function(){var b,c,d,e;e=[];for(c=0,d=a.length;c<d;c++){b=a[c];e.push(b.call(b))}return e};m=function(a,b,c){var d;if(b!=null){d=b.attributes.getNamedItem(c);if(d!=null){return a(d.value)}else{return m(a,b.parentElement,c)}}};return{init:b,onReady:d,viewType:h,tap:r,double_tap:j,logging:c,settings:g}}();j=function(a,b){var c;if(window.CustomEvent){c=new CustomEvent(a,b)}else{c=document.createEvent("CustomEvent");c.initCustomEvent(a,true,true,b)}return c};e.Article=function(a){var b,c,d;c=function(a,c){var d,f,g,h;if(c==null){c=false}d=b();f=c?"back-":"";if(d.length===0&&d[0].id!==a){g=d.offset().width;d.removeClass("active");d.attr("data-direction",""+f+"out");h=$("article#"+a).attr("data-direction",""+f+"in");if(e.viewType()==="TABLET/DESKTOP"&&document.getElementsByTagName("aside").length!==0){d.addClass("asided").css("width",""+g+"px");h.addClass("asided").css("width",""+g+"px")}$(".current[data-article]").removeClass("current");$("[data-article="+a+"]").addClass("current");return true}else{return false}};b=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("article.active")}};d=null;return function(a,d){if(a!=null){return c(a,d)}else{return b()}}}(e);e.Article.title=function(a,b){var c;if(b==null){c=e.Article().children("header").children("h1")}else{c=$("article#"+b).children("header").children("h1")}if(c.length===1){if(a!=null){return c.html(a)}else{return c.html()}}};i=function(){return $("article").on("animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd",function(a){var b;if(a.target.nodeName.toUpperCase()==="ARTICLE"){if(a.target.getAttribute("data-direction")==="in"||a.target.getAttribute("data-direction")==="back-in"){a.target.classList.add("active");$(a.target).trigger("load");b=false;document.location.hash="#"+document.querySelector("article.active").id+"/"+document.querySelector("article.active section.active").id;b=true}else{$(a.target).trigger("unload")}a.target.removeAttribute("data-direction");if(e.viewType()==="TABLET/DESKTOP"){a.target.classList.remove("asided");return a.target.style.width="auto"}}})};e.Aside=function(a){var b,c,d,e,f,g;b=$("aside");if(b.length>0){c=null;d=b.children("header");b.append($(document.createElement("div")).append(b.children()));new IScroll(b[0],{probeType:2,mouseWheel:true,scrollbars:false,bounce:false,click:false,preventDefaultException:{tagName:/.*/}});b.prepend(d);c=$('<div data-element="aside_background"></div>');$("body").append(c);if(b.hasClass("full")){c.addClass("full")}f=function(){c.removeClass("hide").addClass("show");return b.addClass("show")};e=function(){b.removeClass("show");c.addClass("hide");return setTimeout(function(){return c.removeClass("show")},150)};g=function(){if(a.viewType()==="PHONE"){if(b.hasClass("show")){return e()}else{return f()}}};$("aside *").each(function(a){return $(this).on("tap click",function(a){return e()})});c.on("tap click",function(a){a.preventDefault();a.stopPropagation();return e()});return{show:f,hide:e,toggle:g}}}(e);l=true;$(window).on("hashchange",function(){var a;if(l&&e.settings.urlNavigation){a=document.location.hash||"";if(a!==""&&a!=="#"){a=a.replace("#","");a=a.split("/");if(a.length=2){return e.Section(a[1])}}}else{return l=true}});e.Section=function(a){var b,c,d,f;d=j("load",null);f=j("unload",null);c=function(a,c){var g,h,i,j,k;if(c==null){c=false}k=b();j=k.parentElement;g=c?"back-":"";i=document.getElementById(a);if(i==null&&i.nodeName!=="SECTION"){return false}h=i.parentElement;if(k.id!==i.id){h.querySelector("section.active").classList.remove("active");i.classList.add("active")}if(j.id!==h.id){e.Article(h.id,c)}if(!i.iscroll){e.iScroll(i)}if(i.attributes.getNamedItem("data-scrolltop")!=null){i.scrolltop=0}l=false;document.location.hash="#"+h.id+"/"+a;k.dispatchEvent(f);i.dispatchEvent(d);Array.prototype.forEach.call(document.querySelectorAll(".current[data-section]"),function(a){return a.classList.remove("current")});Array.prototype.forEach.call(document.querySelectorAll("[data-section="+a+"]"),function(a){return a.classList.add("current")});Array.prototype.forEach.call(document.querySelectorAll("[data-visible]"),function(a){return a.classList.remove("show")});Array.prototype.forEach.call(document.querySelectorAll("[data-visible="+a+"]"),function(a){return a.classList.add("show")});return true};b=function(){return document.querySelector("article.active section.active")};return function(a,d){if(a!=null){return c(a,d)}else{return b()}}}(e);e.Connection=function(){var a,b,c;b=navigator.onLine;a=[];c=function(c){var d,e,f,g;if(b!==c){b=c;g=[];for(e=0,f=a.length;e<f;e++){d=a[e];g.push(d.call(d,c))}return g}};$(window).on("online",function(){return c(true)});$(window).on("offline",function(){return c(false)});return{isOnline:function(){return navigator.onLine},onChange:function(b){return a.push(b)}}}();e.DB=function(){return{manager:null,create:function(a,b,c,d,e){this.manager=new WebDB(a,b,c,d,e);return this.db=this.manager.db},select:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.select.apply(this.manager,arguments)},insert:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.insert.apply(this.manager,arguments)},update:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.update.apply(this.manager,arguments)},"delete":function(){if(this.manager==null){throw"Database not initializated"}return this.manager["delete"].apply(this.manager,arguments)},drop:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.drop.apply(this.manager,arguments)},execute:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.execute.apply(this.manager,arguments)}}}();k=function(){var a,b,c,e,f,g,h,i,j;a='input[type="text"], input[type="password"], input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], textarea';b='section input[type="text"], section input[type="password"], section input[type="date"], section input[type="datetime"], section input[type="email"], section input[type="number"], section input[type="search"], section input[type="tel"], section input[type="time"], section input[type="url"], section textarea';i=function(a,b){var c,d;if(b==null){b=0}d=a.getBoundingClientRect().top;c=$(a).parents(["section.active"]);return c.scrollTop(d-c[0].getBoundingClientRect().top-b)};c=function(){var a,c;$("body").attr("data-os","android");c=new RegExp("^4[.]");a=new RegExp("^2[.]3");if(c.test($.os.version)){$(b).on("focus",function(){return setTimeout(function(a){return function(){return i(a,20)}}(this),400)});$("select").on("focus",function(a){a.preventDefault();a.stopPropagation();return d($(a.target))})}if(a.test($.os.version)){$("body").attr("data-version","2.3");$("body").append($("<article data-selectbox><div></div></article>"));return $("select").on("focus",function(a){a.preventDefault();a.stopPropagation();return d($(a.target))})}};h=function(){return $("body").attr("data-os","ios")};j=function(){return $("body").attr("data-os","wp")};e=function(){return $("body").attr("data-os","blackberry")};g=function(){return $("body").attr("data-os","firefoxos")};f=function(){if($.browser.firefox){return $("body").attr("data-browser","firefox")}if($.browser.ie){return $("body").attr("data-browser","ie")}if($.browser.chrome){return $("body").attr("data-browser","chrome")}if($.browser.safari){return $("body").attr("data-browser","safari")}};if($.os.android){return c()}if($.os.ios){return h()}if($.os.wp){return j()}if($.os.blackberry||$.os.bb10||$.os.playbook){return e()}if($.browser.firefox&&($.os.phone||$.os.tablet)){return g()}if($.browser!=null){return f()}};e.iScroll=function(a){return new IScroll(a,{probeType:2,mouseWheel:true,scrollbars:false,bounce:false,click:false,preventDefaultException:{tagName:/.*/}})};e.log=function(){if(e.logging.level>=4){return console.log.apply(console,arguments)}};e.info=function(){if(e.logging.level>=3){return console.info.apply(console,arguments)}};e.warn=function(){if(e.logging.level>=2){return console.warn.apply(console,arguments)}};e.error=function(){if(e.logging.level>=1){return console.error.apply(console,arguments)}};e.Notification=function(a){var b,c,d,f,g,h,i,j,k,l,m,o,p,q,r,s,t;b=false;j=$('<div data-element="notification"><div></div</div>');k=$('<article class="window"></article>');j.find("div").append(k);$("body").append(j);o=null;c=null;m=function(a,b,c,d,e){var f;if(a==null){a="ok"}f=r(a,b,c);return t(f,"success center upwards",d,e)};g=function(a,b,c,d,e){var f;if(a==null){a="deny"}f=r(a,b,c);return t(f,"error center downwards",d,e)};i=function(){var a,b,c,d,e,f,g;g=arguments[0],f=arguments[1],a=3<=arguments.length?n.call(arguments,2):[];if(a[0]!=null&&typeof a[0]==="string"){e=a[0];b=a[1]}else{e="spin6";b=a[0]}d="";c="loading center not_clickable";if(g!=null){d="<header>\n    <span>"+g+"</span>\n</header>"}else{c+=" squared"}d+='<section>\n  <span class="icon '+e+' animated"></span>\n</section>';return t(d,c,f,b)};l=function(b,c,d,e,f){var g;g='<header class="'+(b!=null?"align-left":"center")+'">';if(b!=null){g+='<span class="icon '+b+'"></span>'}g+="<span>"+c+'</span>\n</header>\n<section>\n  <span class="content">'+d+'</span>\n  <div id="notification_progress"></div><div style="clear:both"></div>\n</section>';t(g,"center progress not_clickable",e,f);l=a.ProgressBar("notification_progress",0);return{percent:function(a){var b;b=l.percent(a);if(b===100){setTimeout(function(){return h()},150)}return b}}};d=function(a,b,c,d,f,g){var i,j;if(a==null){a="help-circled"}if(d==null){d="Accept"}if(f==null){f="Cancel"}j='<section>\n  <span class="icon '+a+'"></span>\n  <div>\n    <span class="title">'+b+'</span><br>\n    <span class="content padding bottom clear">'+c+'</span>\n  </div>\n</section>\n<footer>\n  <button class="button accept">'+d+'</button>\n  <button class="button cancel">'+f+"</button>\n</footer>";t(j,"center confirm not_clickable",null,null);i=k.find("button");window.but=i;return i.each(function(a,b){return $(this).on(e.tap,function(a){return function(b){$(a).off(e.tap);h();if($(a).hasClass("accept")){return g.call(g,true)}else{return g.call(g,false)}}}(this))})};f=function(a,b,c,d,f,g){var h,i;if(c==null){c=true}if(d==null){d=""}h="";if(a!=null&&c){h='<header>\n  <span class="close icon deny"></span>\n  <h1>\n    <span>'+a+"</span>\n  </h1>\n</header>"}else if(a!=null){h="<header><h1>\n  <span>"+a+"</span>\n</h1></header>"}i=""+h+"\n<section>";if(c&&a==null){i+='<span class="close black icon deny"></span>'}i+=""+b+"\n</section>";t(i,"center custom not_clickable "+d,f,g);return j.find(".close").on(e.tap,p)};h=function(){b=false;clearTimeout(o);o=null;k.removeClass("show");return setTimeout(q,500)};r=function(a,b,c){return'<header>\n  <span class="icon '+a+'"></span>\n</header>\n<section>\n  <span class="title">'+b+'</span>\n  <span class="content">'+c+"</span>\n</section>"};t=function(a,d,e,f){var g;if(!b){b=true;k.removeClass();k.addClass("window "+d);k.html(a);if(f!=null){c=f}if(e!=null){o=setTimeout(h,e*1e3)}return setTimeout(function(a){return function(){j.addClass("show");return setTimeout(function(){var a,b;a=k.children("header");b=a.length?a.offset().height:0;k.children("section").css("maxHeight",""+(screen.height*.9-b)+"px");return k.addClass("show")},100)}}(this),10)}else{g=c;c=function(){if(g!=null){g()}return t(a,d,o,f)};return h()}};s=function(a){a.preventDefault();a.stopPropagation();if(!k.hasClass("not_clickable")){b=false;clearTimeout(o);o=null;k.removeClass("show");return setTimeout(q,500)}};p=function(a){a.preventDefault();a.stopPropagation();b=false;clearTimeout(o);o=null;k.removeClass("show");return setTimeout(q,500)};q=function(){var a;j.removeClass("show");a=c;c=null;if(a!=null){return a.call(a)}};j.on(e.tap,s);return{active:function(){return b},success:m,error:g,confirm:d,loading:i,progress:l,custom:f,hide:h}}(e);e.ProgressBar=function(a,b){var c;c=function(){a.prototype.el=null;a.prototype.fill=null;function a(a,b){var c;this.value=b!=null?b:0;c='<span class="progress_bar">\n  <span class="percent" style="width:'+this.value+'%"></span>\n</span>';this.el=$(c);$("#"+a).append(this.el);this.fill=this.el.children(".percent")}a.prototype.percent=function(a){if(a!=null){if(a<0||a>100){throw"Invalid value"}this.value=a;this.fill.css("width",""+this.value+"%")}return this.value};a.prototype.remove=function(){return this.el.remove()};return a}();return new c(a,b)};(function(){var a,b,c;a=0;b=["ms","moz","webkit","o"];c=0;while(c<b.length&&!window.requestAnimationFrame){window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];++c}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(b,c){var d,e,f;d=(new Date).getTime();f=Math.max(0,16-(d-a));e=window.setTimeout(function(){return b(d+f)},f);a=d+f;return e}}if(!window.cancelAnimationFrame){return window.cancelAnimationFrame=function(a){return clearTimeout(a)}}})();e.Pull_Refresh=function(a,b){var c;if(b==null){b={}}b.pullLabel=b.pullLabel||"Pull to refresh";b.releaseLabel=b.releaseLabel||"Release to refresh";b.refreshLabel=b.refreshLabel||"Loading...";b.onRefresh=b.onRefresh||void 0;a=document.getElementById(a);c=function(){function a(a,b){var c,d;this.options=b;this.updateHeight=o(this.updateHeight,this);this.hide=o(this.hide,this);this.setHeight=o(this.setHeight,this);this.onPull=o(this.onPull,this);c='<div class="pulltorefresh">\n<span class="icon down-big"></span><span class="text">'+this.options.pullLabel+"</span>\n</div>";this.breakpoint=90;this.container=a;this.pullrefresh=$(c)[0];$(this.container).prepend(this.pullrefresh);this.icon=$(this.pullrefresh).find(".icon");this.text=$(this.pullrefresh).find(".text");this._slidedown_height=0;this._anim=null;this._dragged_down=false;this.showRelease=false;d=new Hammer.Manager($(this.container)[0]);d.add(new Hammer.Pan({threshold:0,pointers:0}));d.on("panmove",this.onPull);$(this.container).on("touchstart",function(a){return function(){$(a.container).addClass("pulling");if(!a.refreshing){return a.hide(false)}}}(this));$(this.container).on("touchend",function(a){return function(){if(a.refreshing){return}cancelAnimationFrame(a._anim);if(a._slidedown_height>=a.breakpoint){if(a.options.onRefresh){return a.onRefresh()}else{return a.hide()}}else{return a.hide()}}}(this))}a.prototype.onPull=function(a){this._dragged_down=true;if(this.container.scrollTop>5){return}if(!this._anim){this.updateHeight()}a.srcEvent.preventDefault();a.srcEvent.stopPropagation();a.preventDefault();if(this._slidedown_height>=this.breakpoint){this.onArrived()}else{if(this.showRelease){this.onUp()}}if(a.deltaY>0){return this._slidedown_height=a.deltaY*.5}};a.prototype.setHeight=function(a){a-=511;this.pullrefresh.style.transform="translate(0, "+a+"px)";this.pullrefresh.style.webkitTransform="translate(0, "+a+"px)";this.pullrefresh.style.mozTransform="translate(0, "+a+"px)";this.pullrefresh.style.msTransform="translate(0, "+a+"px)";this.pullrefresh.style.marginBottom=""+a+"px";return this.pullrefresh.style.oTransform="translate(0, "+a+"px)"};a.prototype.onRefresh=function(){this.icon[0].className="icon spin6 animated";this.text.html(this.options.refreshLabel);this.setHeight(this.breakpoint-10);this.refreshing=true;this.icon.removeClass("rotated");return this.options.onRefresh.call(this.options.onRefresh)};a.prototype.onArrived=function(){this.showRelease=true;this.icon.addClass("rotated");return this.text.html(this.options.releaseLabel)};a.prototype.onUp=function(){this.showRelease=false;this.icon.removeClass("rotated");return this.text.html(this.options.pullLabel)};a.prototype.hide=function(a){if(a==null){a=true}if(a){$(this.container).removeClass("pulling")}this.icon[0].className="icon down-big";this.text.html(this.options.pullLabel);this._slidedown_height=0;this.setHeight(0);this.icon.removeClass("rotated");cancelAnimationFrame(this._anim);this._anim=null;this._dragged_down=false;return this.refreshing=false};a.prototype.updateHeight=function(){var a;a=this._slidedown_height-511;this.pullrefresh.style.transform="translate(0, "+a+"px)";this.pullrefresh.style.webkitTransform="translate(0, "+a+"px)";this.pullrefresh.style.mozTransform="translate(0, "+a+"px)";this.pullrefresh.style.msTransform="translate(0, "+a+"px)";this.pullrefresh.style.marginBottom=""+a+"px";this.pullrefresh.style.oTransform="translate(0, "+a+"px)";return this._anim=requestAnimationFrame(this.updateHeight)};return a}();return new c(a,b)};d=function(a){var b,c,d,e,f,g,h,i,j;f=function(a){var b;b=$('<li data-value="'+a.value+'">'+a.text+"</li>");if(a.value===e[0].value){b.addClass("theme")}b.on("tap",function(a){return j(a.target)});return b};j=function(a){e[0].value=a.getAttribute("data-value");e.hide();setTimeout(function(){return e.show()},1);return $("article[data-selectbox]").removeClass("show").html("<div></div>")};e=a;c=$('<section data-selectbox="'+e.attr("id")+'"></section>');d=$("<ul></ul>");i=a.children();for(g=0,h=i.length;g<h;g++){b=i[g];d.append(f(b))}c.append(d);return $("article[data-selectbox]>div").append(c).parent().addClass("show")};b=50;c=50;a=65;m=document.createElement("style");document.body.appendChild(m);f=function(d){var e,f,g,h,i;f="";i=["portrait","landscape"];for(g=0,h=i.length;g<h;g++){e=i[g];f+="@media screen and (orientation: "+e+") {\n  article[data-header] > section > div:not(.pulltorefresh){\n    min-height: "+(d[e]-b)+"px;\n  }\n  article[data-nav] > section > div:not(.pulltorefresh){\n    min-height: "+(d[e]-c)+"px;\n  }\n  article[data-footer] > section > div:not(.pulltorefresh){\n    min-height: "+(d[e]-a)+"px;\n  }\n  article[data-header][data-nav] > section > div:not(.pulltorefresh){\n    min-height: "+(d[e]-b-c)+"px;\n  }\n  article[data-header][data-footer] > section > div:not(.pulltorefresh){\n    min-height: "+(d[e]-b-a)+"px;\n  }\n  article[data-nav][data-footer] > section > div:not(.pulltorefresh){\n    min-height: "+(d[e]-c-a)+"px;\n  }\n  article[data-header][data-nav][data-footer] > section > div:not(.pulltorefresh){\n    min-height: "+(d[e]-b-c-a)+"px;\n  }\n}"}return m.innerHTML=f};if(window.innerHeight>window.innerWidth){g=window.innerHeight;h=window.innerWidth}else{g=window.innerWidth;h=window.innerHeight}f({portrait:g,landscape:h});(function(){var a,b,c,d;b=function(a,b){return JSON.parse(window[a].getItem(b))};d=function(a,b,c){return window[a].setItem(b,JSON.stringify(c))};c=function(a,b){return window[a].removeItem(b)};a=function(a){return window[a].clear()};e.Session=function(){var e;e="sessionStorage";return{get:function(a){return b(e,a)},set:function(a,b){return d(e,a,b)},remove:function(a){return c(e,a)},clear:function(){return a(e)}}}();return e.Storage=function(){var e;e="localStorage";return{get:function(a){return b(e,a)},set:function(a,b){return d(e,a,b)},remove:function(a){return c(e,a)},clear:function(){return a(e)}}}()})()}).call(this);