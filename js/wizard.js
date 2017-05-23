/**
 * Created by admin on 2017/3/28.
 */

function wizardController() {
    if(LayoutNum==0){
        console.log("haven't choose template yet")
    }else {
        var gooeyMenu = $("#gooey-menu");
        $("#wizard1").on("click", function () {
            gooeyMenu.removeClass();
            gooeyMenu.addClass("gooey-round");
            gooeyMenu.css("display","block");
            reGooey();
        })
        $("#wizard2").on("click", function () {
            gooeyMenu.removeClass();
            gooeyMenu.addClass("gooey-h");
            gooeyMenu.css("display","block");
            reGooey();
        })
        $("#wizard3").on("click", function () {
            gooeyMenu.removeClass();
            gooeyMenu.addClass("gooey-h-s");
            gooeyMenu.css("display","block");
            reGooey();
        })
        $("#wizard4").on("click", function () {
            gooeyMenu.removeClass();
            gooeyMenu.addClass("gooey-v");
            gooeyMenu.css("display","block");
            reGooey();
        })
        $("#wizard5").on("click", function () {
            gooeyMenu.removeClass();
            gooeyMenu.addClass("gooey-v-s");
            gooeyMenu.css("display","block");
            reGooey();
        })

            gooeyMenu.draggable({
                containment: "#moduleArea",
                scroll: false
            });

            // gooeyMenu.mouseup(function () {
            //     var posy =  gooeyMenu.offset().top;
            //     if(posy >=500){
            //         if(gooeyMenu.hasClass("gooey-v")){
            //             gooeyMenu.removeClass("gooey-v");
            //             gooeyMenu.addClass("gooey-v-u");
            //         }
            //         if(gooeyMenu.hasClass("gooey-v-s")){
            //             gooeyMenu.removeClass("gooey-v-s");
            //             gooeyMenu.addClass("gooey-v-s-u");
            //         }
            //     }else{
            //         if(gooeyMenu.hasClass("gooey-v")){
            //             gooeyMenu.removeClass("gooey-v");
            //             gooeyMenu.addClass("gooey-v-u");
            //         }
            //         if(gooeyMenu.hasClass("gooey-v-s")){
            //             gooeyMenu.removeClass("gooey-v-s");
            //             gooeyMenu.addClass("gooey-v-s-u");
            //         }
            //     }
            //     reGooey();
            // })


        
        $("#fog-wizard").on("click",function () {
            if(!IsFogNewed){
                initFog();
            }else{
                clearFog();
            }
        })
        $("#grid-wizard").on("click",function () {
            if(!IsGridNewed){
                initGrid();
            }else{
                clearGrid();
            }
        })
        $("#ground-wizard").on("click",function () {
            if(!IsGridNewed){
                initGround();
            }else{
                clearGround();
            }
        })
        $("#delete-wizard").on("click",function () {
            gooeyMenu.css("display","none");
        })
    }
}