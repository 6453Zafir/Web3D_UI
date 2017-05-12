/**
 * Created by admin on 2017/5/12.
 */
function effectController(){
    if(LayoutNum==0){
        console.log("haven't choose template yet")
    }else{
        $("#fog-effect").on("click",function () {
            initFog()
        })
    }
}