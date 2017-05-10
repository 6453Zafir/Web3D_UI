/**
 * Created by admin on 2017/5/5.
 */
function backgroundController() {
    if (LayoutNum == 0) {
        console.log("haven't choose template yet")
    } else {
        $("#skyShader-bg").on("click", function () {
            if (BackgroundNum != 2) {
                if(BackgroundNum == 1){
                    clearBgcolor();
                }
                BackgroundNum = 2;
                initSky();
            } else {
            }
        })
        $("#color-bg").on("click", function () {
            if (BackgroundNum != 1) {
                if(BackgroundNum == 2){
                    clearSky();
                }
                BackgroundNum = 1;
                initBgColor();
            } else {
            }
        })
        $("#image-bg").on("click", function () {
            if (BackgroundNum != 3) {
                if(BackgroundNum==1){
                    clearBgcolor();
                }else if(BackgroundNum==2){
                    clearSky()
                }
                BackgroundNum = 3;
                initImageBackground();
            } else {
            }
        })
        $("#skybox-bg").on("click", function () {
            if (BackgroundNum !=4) {
                BackgroundNum = 4;
            } else {
            }
        })
    }
}