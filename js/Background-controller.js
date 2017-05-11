/**
 * Created by admin on 2017/5/5.
 */
function backgroundController() {
    if (LayoutNum == 0) {
        console.log("haven't choose template yet")
    } else {
        $("#color-bg").on("click", function () {
            if (BackgroundNum != 1) {
                if(BackgroundNum == 2){
                    clearSky();
                }else if(BackgroundNum == 3){
                    clearImageBackground();
                }else if(BackgroundNum == 4){
                    clearSkybox();
                }
                BackgroundNum = 1;
                initBgColor();
            }
        })
        $("#skyShader-bg").on("click", function () {
            if (BackgroundNum != 2) {
                if(BackgroundNum == 1){
                    clearBgcolor();
                }else if(BackgroundNum == 3){
                    clearImageBackground();
                }else if(BackgroundNum == 4){
                    clearSkybox();
                }
                BackgroundNum = 2;
                initSky();
            }
        })
        $("#image-bg").on("click", function () {

            if (BackgroundNum != 3) {
                if(BackgroundNum == 1){
                    clearBgcolor();
                }else if(BackgroundNum == 2){
                    clearSky();
                }else if(BackgroundNum == 4){
                    clearSkybox();
                }
                BackgroundNum = 3;

                $("#default-image-bg").on("click",function () {
                    ImageBgNum = 1;
                    initImageBackground(ImageBgNum);
                })
                $("#gradient-image-bg").on("click",function () {
                    ImageBgNum = 2;
                    initImageBackground(ImageBgNum);
                })
                $("#black-image-bg").on("click",function () {
                    ImageBgNum = 3;
                    initImageBackground(ImageBgNum);
                })
                initImageBackground(1);
            }
        })
        $("#skybox-bg").on("click", function () {
            if (BackgroundNum !=4) {
                if (BackgroundNum == 1) {
                    clearBgcolor();
                } else if (BackgroundNum == 2) {
                    clearSky();
                } else if (BackgroundNum == 3) {
                    clearImageBackground();
                }
                BackgroundNum=4;
                $("#dawnmountain-skybox").on("click",function () {
                    clearslibingSkybox();
                    SkyboxName = "dawnmountain";
                    initSkybox(SkyboxName);
                })
                $("#mountainwater-skybox").on("click",function () {
                    clearslibingSkybox();
                    SkyboxName = "mountainwater";
                    initSkybox(SkyboxName);
                })
                initSkybox("dawnmountain");
            }
        })
    }
}