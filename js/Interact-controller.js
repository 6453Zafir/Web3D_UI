/**
 * Created by admin on 2017/5/16.
 */
$("#in").on("click", function () {
    if(CurrentTabNum == 1){
        clearBackroundController()
    }else if(CurrentTabNum ==2){
        clearLightController()
    }else if(CurrentTabNum ==3){
        clearEffectController();
    }
    CurrentTabNum = 4;
})
function interactController() {
    if(LayoutNum == 0){
        console.log("haven't choose template yet")
    }else{
        $("#default-control").on("click", function () {
            if(currentControlNum == 2){
                clearOrbitControl();
            }else if(currentControlNum == 3){
                clearFPSControl();
            }else if(currentControlNum == 4){
                clearFlyControl();
            }
            defaultControl();
        })
        $("#orbit-control").on("click", function () {
            if(currentControlNum == 1){
                clearDefaultControl();
            }else if(currentControlNum == 3){
                clearFPSControl();
            }else if(currentControlNum == 4){
                clearFlyControl();
            }
            initOrbitControl();
        })
        $("#fps-control").on("click", function () {
            if(currentControlNum == 1){
                clearDefaultControl();
            }else if(currentControlNum ==2){
                clearOrbitControl();
            }else if(currentControlNum == 3){
                clearFPSControl();
            }
            initFPSControl();
        })
        $("#fly-control").on("click", function () {
            if(currentControlNum == 1){
                clearDefaultControl();
            }else if(currentControlNum ==2){
                clearOrbitControl();
            }else if(currentControlNum == 3){
                clearFPSControl();
            }
            initFlyControl();
        })
    }
}