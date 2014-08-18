(function(){
    HTMLElement.prototype.srcAddEventListener = HTMLElement.prototype.addEventListener;
    HTMLElement.prototype.srcRemoveEventListener = HTMLElement.prototype.removeEventListener;
    HTMLElement.prototype.srcdispatchEvent = HTMLElement.prototype.dispatchEvent;

    $.fn.srcOn = $.fn.on;

    var ISCROLL_EVENTS = "beforescrollstart,scrollcancel,scrollstart,scroll,scrollend,flick,zoomstart,zoomend";
    var HAMMER_EVENTS = "tap,doubletap,press,";
    HAMMER_EVENTS += "pan,panstart,panmove,panend,pancancel,panleft,panright,panup,pandown,";
    HAMMER_EVENTS += "swipe,swipeleft,swiperight,swipeup,swipedown,";
    HAMMER_EVENTS += "pinch,pinchstart,pinchmove,pinchend,pinchcancel,pinchin,pinchout,";
    HAMMER_EVENTS += "rotate,rotatestart,rotatemove,rotateend,rotatecancel";


    HTMLElement.prototype.addEventListener = function(event, fn, useCapture, options){
        if( HAMMER_EVENTS.indexOf(event.toLowerCase()) != -1){
            if(options == null){options = {};}
            if(this.hammer == null){
                this.hammer = new Hammer(this);
            }
            this.hammer.set(options);
            this.hammer.on(event, fn);
        }else if( ISCROLL_EVENTS.indexOf(event.toLowerCase()) != -1 && this.iscroll ){
            this.iscroll.on(event, fn);
        }else{
            this.srcAddEventListener(event, fn, useCapture);
        }
    };

    HTMLElement.prototype.removeEventListener = function(event, fn, useCapture){
        if( HAMMER_EVENTS.indexOf(event.toLowerCase()) != -1 && this.hammer != null){
            this.hammer.off(event, fn);
        }else if( EVENTS.indexOf(event.toLowerCase()) != -1 && this.iscroll ){
            this.iscroll.off(event, fn);
        }else{
            this.srcRemoveEventListener(event, fn, useCapture);
        }
    };

    HTMLElement.prototype.dispatchEvent = function(event, args){
        // var event_type = typeof(event) === "string"? event: event.type;
        if( HAMMER_EVENTS.indexOf(event.type.toLowerCase()) != -1 && this.hammer != null){
            this.hammer.emit(event, args);
        }else{
            this.srcdispatchEvent(event);
        }
    };

    $.fn.scrollTop = function(value){
        if (!this.length) return;
        if ('scrolltop' in this[0]){
            if (value === undefined) return this[0].scrolltop;
            return this.each(function(){ this.scrolltop = value;});
        }else if ('scrollTop' in this[0]){
            if (value === undefined) return this[0].scrollTop;
            return this.each(function(){ this.scrollTop = value;});
        }else{
            if (value === undefined) return this[0].pageYOffset;
            return this.each(function(){ this.scrollTo(this.scrollX, value);});
        }
    };

    $.fn.scrollLeft = function(value){
        if (!this.length) return;
        if ('scrollleft' in this[0]){
            if (value === undefined) return this[0].scrollleft;
            return this.each(function(){ this.scrollleft = value;});
        }else if ('scrollLeft' in this[0]){
            if (value === undefined) return this[0].scrollLeft;
            return this.each(function(){ this.scrollLeft = value;});
        }else{
            if (value === undefined) return this[0].pageYOffset;
            return this.each(function(){ this.scrollTo(value, this.scrollY);});
        }
    };

    $.fn.on = function(event, selector, data, callback, one, options){
        var $this = this;
        if (event && !(typeof(event) == 'string')) {
            $.each(event, function(type, fn){
                $this.on(type, selector, data, fn, one);
            });
            return $this;
        }
        if (!(typeof(selector) == 'string') && !(typeof(callback) == "function") && callback !== false)
            options = callback, callback = data, data = selector, selector = undefined
        if ((typeof(data) == "function") || data === false)
            options = callback, callback = data, data = undefined;

        if (callback === false) callback = function(){return false;};
        if(!options){options = {};}

        event.split(/\s/).forEach(function(ev){
            if(HAMMER_EVENTS.indexOf(ev) != -1){
                if($this[0].hammer == null){
                    $this[0].hammer = new Hammer($this[0]);
                }
                $this[0].hammer.set(options);
                if(one){
                    _callback = callback;
                    callback = function(){
                        $this.off(ev);
                        _callback.apply(_callback, arguments);
                    };
                }
                $this[0].hammer.on(ev, callback);
            }else{
                $this.srcOn(ev, selector, data, callback, one);
            }
        });
        return $this;
    };

})();