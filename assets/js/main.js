
    var contributors = function(data){
        _contributors = $("#contributors");
        for(var i=0, len=data.length; i<len; i++){
            var elem = data[i];
            if(elem["id"] != 9946303){
                var code = '<div class="contributor"><img src="' + elem["avatar_url"] + '" alt="' + elem["login"] + '" />';
                code += '<a href="' + elem["html_url"] + '" target="_blank">' + elem["login"] + '</a>';
                code += '</div>';
                _contributors.append($(code));
            }
        }
    };

    $.get("https://api.github.com/repos/haas85/tako/contributors", contributors);

    var apps_modal = $('#apps_modal');
    var app_title = $("#app_title");
    var app_markets = $("#app_markets");
    var markets = ["Android", "iOS", "FirefoxOs", "BlackBerry", "Amazon"];

    $(".app").on("click", function(ev){
        var target = $(ev.currentTarget);
        app_title.html(target.attr("data-title"));
        app_markets.html("");
        for(var i=0, len=markets.length; i<len; i++){
            if(target.attr("data-"+ markets[i]) != null){
                var code = '<a href="' + target.attr("data-"+ markets[i]) + '" target="_blank" title="' + markets[i]+ '">';
                code += '<img src="assets/img/markets/' + markets[i] + '.png" alt="' + target.attr("data-"+ markets[i]) + '" /></a>';
                app_markets.append($(code));
            }
        }
        apps_modal.modal();
    });