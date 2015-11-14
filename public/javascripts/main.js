/**
 * @name    main.js
 * @desc    takes care of sliders
 */

(function(){
var
    params = {
        xAngle: 90,
        yAngle: 90,
        zAngle: 90,
        cAngle: 125
    },
    step,
    interval,
    intervalDuration = 50,

    init = function(){
        console.log("foo");
        $(".row").on("mousedown", ".btn[data-limit]", function(){
           var $this = $(this),
               foo = function(){
                   var
                   //$this =  $(this),
                       limit = $this.attr("data-limit"),
                       param = $this.attr("data-param"),

                       val,
                       $h4 = $this.parent().parent().siblings("h4")
                       ;

                   if($this.attr("data-min")){
                       // console.log(-1)
                       step = -5;
                   } else {
                       // console.log(1)
                       step = 5;
                   }

                   val = params[param] += step;

                   //console.log( params );
                   $h4.html( param + ", " + limit + ", " + val);

                   // console.log(param, limit);
               };
            foo();
           interval = setInterval(function(){
               foo();
           }, intervalDuration);

        });

        $(".row").on("mouseup", ".btn[data-limit]", function(){
            clearInterval(interval);
        });

        $(".row").on("mouseout", ".btn[data-limit]", function(){
            clearInterval(interval);
        });

        $(".row").on("touchend", ".btn[data-limit]", function(){
            clearInterval(interval);
        });

        $(".row").on("touchcancel", ".btn[data-limit]", function(){
            clearInterval(interval);
        });
    }// init
;

window.addEventListener("load", init);
//$(document).on("ready", init);
})();
