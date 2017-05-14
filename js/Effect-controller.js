/**
 * Created by admin on 2017/5/12.
 */
function effectController(){
    if(LayoutNum==0){
        console.log("haven't choose template yet")
    }else {
        $("#fog-effect").on("click", function () {
            if (EffectNum == 2) {
                clearGrid();
            }else if(EffectNum == 3){
                clearGround();
            }
            initFog();
            EffectNum = 1
        })
        $("#grid-effect").on("click", function () {
            if (EffectNum == 1) {
                clearFog();
            }else if(EffectNum == 3){
                clearGround();
            }
            initGrid();
            EffectNum = 2

        })
        $("#ground-effect").on("click", function () {
            if (EffectNum == 1) {
                clearFog();
            }else if(EffectNum ==2){
                clearGrid();
            }
            initGround();
            EffectNum = 3

        })
    }
}