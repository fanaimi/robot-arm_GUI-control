/**
 * @name    main.js
 * @desc    takes care of sliders
 */

(function(){
var
    socket = io(),
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


        socket.on("boardReady", function(){
           console.log("yeah ");
        });

        $(".row").on("mousedown", ".btn[data-limit]", function(){
           var $this = $(this),
               foo = function(){
                   var
                       limit = $this.attr("data-limit"),
                       param = $this.attr("data-param"),

                       val,
                       $h4 = $this.parent().parent().siblings("h4")

                       moveBot = function(){
                           val = params[param] += step;
                           $h4.html( param + ", " + limit + ", " + val);

                           var evtData = {
                               param : param,
                               limit: limit,
                               val : val
                           };
                           socket.emit("moveArm", evtData);
                       }// moveBot
                   ;

                   if($this.attr("data-min")){
                       step = -5;
                       val = params[param];
                        if(val > limit ){

                            moveBot();
                        }
                   } else {
                       step = 5;
                       val = params[param];
                       if(val < limit ){
                           moveBot();
                       }
                   }// if data-min

               };// foo
            foo();
           interval = setInterval(function(){
               foo();
           }, intervalDuration);

        }); // on mousedown

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
