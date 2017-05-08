/**
 * Created by admin on 2017/5/5.
 */
function backgroundController() {

    if(LayoutNum==0){
        console.log("haven't choose template yet")
    }else{
        $("#skyShader-bg").on("click", function() {
            initSky();
        })
    }

}