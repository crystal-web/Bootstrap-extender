window.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
};
window.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

window.onEvent = function(event, func) {
    if (typeof document[event] == 'undefined') {
        document[event] = new Array(func);
    } else {
        document[event].push(func);
    }
};
window.listenEvent = function(event) {
    if (typeof document[event] != 'undefined') {
        for (var key in document[event]) {
            document[event][key].call(this);
        }
    }
};

/**
 * Prototype
 */
String.prototype.isMail = function() {
    var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
    return reg.test(this.toString());
};

/**
 * Ajout de la méthode timeConverter sur les type Number et String
 * @type {timeConverter}
 */
Number.prototype.timeConverter = String.prototype.timeConverter = function() {
    var a = new Date(this.toString()*1000);
    var months = ['janvier','f\351vrier','mars','april','mai','juin','juillet','ao\333t','septembre','octobre','novembre','d\351cembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date+' '+month+' '+year+' \340  '+hour+':'+min ;
    return time;
}

var bench = function (method, iterations, args, context) {
    var time = 0;
    var timer = function (action) {
        var d = Date.now();
        if (time < 1 || action === 'start') {
            time = d;
            return 0;
        } else if (action === 'stop') {
            var t = d - time;
            time = 0;
            return t;
        } else {
            return d - time;
        }
    };

    var result = [];
    var i = 0;
    timer('start');
    while (i < iterations) {
        result.push(method.apply(context, args));
        i++;
    }

    var execTime = timer('stop');
    if ( typeof console === "object") {
        console.log("Mean execution time was: ", execTime / iterations);
        console.log("Sum execution time was: ", execTime);
        console.log("Result of the method call was:", result[0]);
    }
    return execTime;
};

var CrystalWeb = function (c,r,y,s,t,a,l, w,e,b) {
    function handleBootstrap() {
        /*Bootstrap Carousel*/
        if (jQuery().carousel) {
            jQuery('.carousel').carousel({
                interval: 15000,
                pause: 'hover'
            });
        }

        /*Tooltips*/
        if (jQuery().tooltip) {
            jQuery('.tooltips').tooltip();
            jQuery('.tooltips-show').tooltip('show');
            jQuery('.tooltips-hide').tooltip('hide');
            jQuery('.tooltips-toggle').tooltip('toggle');
            jQuery('.tooltips-destroy').tooltip('destroy');
        }

        /*Popovers*/
        if (jQuery().popover) {
            jQuery('.popovers').popover();
            jQuery('.popovers-show').popover('show');
            jQuery('.popovers-hide').popover('hide');
            jQuery('.popovers-toggle').popover('toggle');
            jQuery('.popovers-destroy').popover('destroy');
        }
    }

    function imgError() {
        y('img').error(function(evt) {
            var src = y(this).attr('src');
            y(this)
                .attr('alt', 'Cette image manque')
                .attr('src', 'data:image/png;base64,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');
        });
    }

    return {
        init: function () {
            handleBootstrap();
            imgError();
        }
    }
}(window, document, jQuery);


jQuery(function(){
    CrystalWeb.init();
});