/**
 * Created by admin on 2017/5/15.
 */
$("#li").on("click", function () {
    if(CurrentTabNum==1){
        clearBackroundController();
    }else if(CurrentTabNum ==2){
        clearEffectController();
    }
    CurrentTabNum = 2;
})

function lightController() {
    if(LayoutNum==0){
        console.log("haven't choose template yet")
    }else {
        $("#point-light").on("click", function () {
            if(LightNum == 4){
                clearAreaLight();
            }else if(LightNum == 2){
                clearSpotLight();
            }
            initPointLight();
            LightNum = 1;
        })
        $("#spot-light").on("click", function () {
            if(LightNum == 1){
                clearPointLight();
            }else if(LightNum == 4){
                clearAreaLight();
            }
            initSpotLight();
            LightNum = 2;
        })
        $("#area-light").on("click", function () {
            if(LightNum == 1){
                clearPointLight();
            }else if(LightNum == 2){
                clearSpotLight();
            }
            initAreaLight();
            LightNum = 4;
        })
    }
}

function clearLightController() {
    if(LightNum ==1){
        clearPointLight();
    }else if(LightNum ==2){
        clearSpotLight();
    }else if(LightNum ==3){
        clearAreaLight()
    }else{

    }
}