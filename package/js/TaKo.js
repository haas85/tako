/* TaKo v0.1.0 - 12/19/2013
   http://
   Copyright (c) 2013  - Licensed  */
(function(){var a;window.TaKo=a={};a.init=function(){if($("section.active").length===0){$("section").first().addClass("active")}$("body").hammer();return $("section").each(function(){if($(this).children("article.active").length===0){return $(this).children("article").first().addClass("active")}})}}).call(this);(function(){TaKo.Article=function(a){var b,c,d;c=function(a){var c,d,e,f,g;f=b();g=f.parent();c=$("article#"+a);d=c.parent();if(f[0].id!==c[0].id){d.children().removeClass("active");e=c.addClass("active")}if(g[0].id!==d[0].id){return TaKo.Section.goTo(d[0].id)}else{f.trigger("unload");return e=c.trigger("load")}};b=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("section.active article.active")}};$("[data-article]").each(function(a){var b=this;return $(this).bind("tap",function(a){a.preventDefault();a.stopPropagation();return c($(b).attr("data-article"))})});d=null;return{goTo:c,current:b}}(TaKo)}).call(this);(function(){TaKo.Aside=function(a){var b,c,d,e,f;b=$("aside");if(b.length>0){$("body").append('<div data-element="aside_background"></div>')}c=$("[data-element=aside_background]");c.append(b);e=function(){c.removeClass("hide").addClass("show");return b.addClass("show")};d=function(){b.removeClass("show");c.addClass("hide");return setTimeout(function(){return c.removeClass("show")},150)};f=function(){if(b.hasClass("show")){return d()}else{return e()}};$("[data-action=aside]").each(function(a){return $(this).on("tap",function(a){a.preventDefault();a.stopPropagation();return f()})});$("aside *").each(function(a){return $(this).on("tap",function(a){a.preventDefault();a.stopPropagation();return d()})});c.on("tap",function(a){a.preventDefault();a.stopPropagation();return d()});return{show:e,hide:d,toggle:f}}(TaKo)}).call(this);(function(){TaKo.Section=function(a){var b,c,d,e;d=function(a,c){var d;if(c==null){d=b().children("header").children("h1")}else{d=$("section#"+c).children("header").children("h1")}if(d.length===1){if(a!=null){return d.html(a)}else{return d.html()}}};c=function(a){var c,d;c=b();if(c[0].id!==a){c.removeClass("active");c.children("article.active").trigger("unload");d=$("section#"+a).addClass("active");d.children("article.active").trigger("load");$(".current[data-section]").removeClass("current");return $("[data-section="+a+"]").addClass("current")}};b=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("section.active")}};$("[data-section]").each(function(a){var b=this;return $(this).bind("tap",function(a){a.preventDefault();a.stopPropagation();return c($(b).attr("data-section"))})});e=null;return{goTo:c,title:d,current:b}}(TaKo)}).call(this);(function(){TaKo.Notification=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;b=false;h=$('<div data-element="notification"></div>');i=$('<div class="window"></div>');h.append(i);$("body").append(h);l=null;c=null;k=function(a,b,c,d,e){var f;f=n(a,b,c);return p(f,"success top_position upwards margin",d,e)};e=function(a,b,c,d,e){var f;f=n(a,b,c);return p(f,"error top_position upwards margin",d,e)};g=function(a,b,c){var d;d='<div id="circular_container">\n<div id="circular3dG">\n  <div id="circular3d_1G" class="circular3dG"></div>\n  <div id="circular3d_2G" class="circular3dG"></div>\n  <div id="circular3d_3G" class="circular3dG"></div>\n  <div id="circular3d_4G" class="circular3dG"></div>\n  <div id="circular3d_5G" class="circular3dG"></div>\n  <div id="circular3d_6G" class="circular3dG"></div>\n  <div id="circular3d_7G" class="circular3dG"></div>\n  <div id="circular3d_8G" class="circular3dG"></div>\n</div>';if(a!=null){d+='<span class="title">'+a+"</span>"}d+="</div>";return p(d,"center not_clickable",b,c)};j=function(b,c,d,e,g){var h;h='<span class="icon '+b+'"></span>\n<span class="title">'+c+'</span>\n<div class="content padding bottom">'+d+'</div>\n<div id="notification_progress"></div>';p(h,"center progress padding top not_clickable",e,g);j=a.ProgressBar("notification_progress",0);return{percent:function(a){var b;b=j.percent(a);if(b===100){setTimeout(function(){return f()},150)}return b}}};d=function(a,b,c,d,e,f){var g;g='<span class="icon '+a+'">'+a+'</span>\n<span class="title">'+b+'</span>\n<div class="content padding bottom clear">'+c+'</div>\n<button class="button accept">'+d.text+'</button>\n<button class="button cancel">'+e.text+"</button>";return p(g,"confirm top_position downwards not_clickable",null,f)};f=function(){b=false;clearTimeout(l);l=null;i.removeClass("show");return setTimeout(m,500)};n=function(a,b,c){var d;return d='<span class="icon '+a+'">'+a+'</span>\n<div>\n  <span class="title">'+b+'</span>\n  <div class="content">'+c+"</div>\n</div>"};p=function(a,d,e,g){var j;if(!b){b=true;i.removeClass();i.addClass("window "+d);i.html(a);h.addClass("show");setTimeout(function(){return i.addClass("show")},100);if(g!=null){c=g}if(e!=null){return l=setTimeout(f,e*1e3)}}else{j=c;c=function(){if(j!=null){j()}return p(a,l,g)};return f()}};o=function(a){a.preventDefault();a.stopPropagation();if(!i.hasClass("not_clickable")){b=false;clearTimeout(l);l=null;i.removeClass("show");return setTimeout(m,500)}};m=function(){var a;h.removeClass("show");a=c;c=null;if(a!=null){return a.call(a)}};h.on("tap",o);return{success:k,error:e,confirm:d,loading:g,progress:j,hide:f}}(TaKo)}).call(this);(function(){TaKo.ProgressBar=function(a,b){var c;c=function(){var a,b;a=null;b=null;function c(c,d){var e;this.value=d!=null?d:0;e='<span class="progress_bar">\n  <span class="percent" style="width:'+this.value+'%"></span>\n</span>';a=$(e);$("#"+c).append(a);b=a.children(".percent")}c.prototype.percent=function(a){if(a!=null){if(a<0||a>100){throw"Invalid value"}this.value=a;b.css("width",""+this.value+"%")}return this.value};c.prototype.remove=function(){return a.remove()};return c}();return new c(a,b)}}).call(this);