/**
 * Created by admin on 2017/5/5.
 */
function backgroundController() {
    if (LayoutNum == 0) {
        console.log("haven't choose template yet")
    } else {
        $("#skyShader-bg").on("click", function () {
            if (BackgroundNum != 2) {
                BackgroundNum = 2;
                initSky();
            } else {
                console.log("it's already Sky shader background")
            }
        })
        $("#color-bg").on("click", function () {
            if (BackgroundNum != 1) {
                BackgroundNum = 1;
                clearSky();
                console.log(" now it's colored background")
            } else {
                console.log("it's already colored background")
            }
        })
        $("#image-bg").on("click", function () {
            if (BackgroundNum != 3) {
                BackgroundNum = 3;
                console.log(" now it's image background")
            } else {
                console.log(" it's already image background")
            }
        })
        $("#skybox-bg").on("click", function () {
            if (BackgroundNum !=4) {
                BackgroundNum = 4;
                console.log(" now it's skybox background")
            } else {
                console.log("it's already skybox background")
            }
        })
    }
}