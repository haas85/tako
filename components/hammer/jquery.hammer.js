// (function(){
//     var EVENTS = "tap,doubletap,press,";
//     EVENTS += "pan,panstart,panmove,panend,pancancel,panleft,panright,panup,pandown,";
//     EVENTS += "swipe,swipeleft,swiperight,swipeup,swipedown,";
//     EVENTS += "pinch,pinchstart,pinchmove,pinchend,pinchcancel,pinchin,pinchout,";
//     EVENTS += "rotate,rotatestart,rotatemove,rotateend,rotatecancel";

//     $.fn.srcOn = $.fn.on;
//     $.fn.srcOff = $.fn.off;
//     $.fn.srcTrigger = $.fn.trigger;



//   $.fn.off = function(event, selector, callback){
//     var $this = this;
//     if (event && !(typeof(event) == 'string')) {
//       $.each(event, function(type, fn){
//         $this.off(event, selector, callback);
//       });
//       return $this;
//     }

//     if (!(typeof(selector) == 'string') && !(typeof(callback) == "function") && callback !== false)
//       callback = selector, selector = undefined

//     if (callback === false) callback = function(){return false;};

//     event.split(/\s/).forEach(function(ev){
//       if(EVENTS.indexOf(ev) != -1){
//         $this[0].hammer.off(ev, callback);
//       }else{
//           $this.srcOff(ev, selector, callback);
//       }
//     });
//     return $this;
//   };

//   $.fn.trigger = function(event, args){
//     if(args == null){args = {};};
//     if(EVENTS.indexOf(event) != -1){
//       this[0].hammer.emit(event, args);
//     }else{
//       this.srcTrigger(event, args);
//     }
//     return this;
//   };

//   $.fn.one = function(event, selector, data, callback, options){
//     return this.on(event, selector, data, callback, 1, options)
//   }

//   $.fn.bind = function(event, data, callback, options){
//     return this.on(event, data, callback, options)
//   }
// })();