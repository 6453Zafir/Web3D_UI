/**
 * Created by admin on 2017/5/15.
 */
$("#li").on("click", function () {
    clearBackroundController();
    clearEffectController();
})

function lightController() {
    if(LayoutNum==0){
        console.log("haven't choose template yet")
    }else {
        $("#point-light").on("click", function () {
            if(LightNum == 4){
                clearAreaLight();
            }
            initPointLight();
            LightNum = 1;
        })
        $("#directional-light").on("click", function () {
            // initDirectionalLight();
            LightNum = 3;
        })
        $("#area-light").on("click", function () {
            if(LightNum == 1){
                clearPointLight();
            }
            initAreaLight();
            LightNum = 4;
        })
    }
}