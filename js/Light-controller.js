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
        $("#directional-light").on("click", function () {
            initDirectionalLight();
            LightNum = 3;
        })
    }
}