/**
 * Created by admin on 2017/5/4.
 */
function layoutController() {
    // $("#canvasArea").load("FullScreenLayout.html");
    $("#template1").on("click", function() {
        LayoutNum = 1;
        $('#myModal').modal('hide');
        basicLayout();
    })
    $("#template2").on("click", function() {
        LayoutNum=2;
        $('#myModal').modal('hide');
        FullLayout();
    })
    $("#template3").on("click", function() {
        LayoutNum=3;
        $('#myModal').modal('hide');
    })

}

function basicLayout() {
    if(!IsSettingTipShowed){
        $("#setting-tip").css("display","block");
        $("#setting-tip,#settingButton").on("click",function () {
            $("#setting-tip").css("display","none");
            IsSettingTipShowed = true;
        })
    }

    $("#add-button").on("click",function (e) {
        if(!IsDblclickTipShowed){
            var x = e.pageX  + 'px';
            var y = e.pageY  + 'px';
            $("#dblclick-tip .addingImg").css("top",y);
            $("#dblclick-tip .addingImg").css("left",x);
            $("#dblclick-tip").css("display","block");
            IsDblclickTipShowed = true;
        }

    $("#dblclick-tip").on("click",function () {
        $("#dblclick-tip").css("display","none");
    })
    })


    renderEasyModel()
    backgroundController();
    effectController();
    lightController();
    interactController();
}
function FullLayout() {
    $("#list-area").remove();
    $("#moduleArea").removeClass("HalfModuleArea");
    $("#moduleArea").addClass("moduleArea");
    renderEasyModel()
    backgroundController();
    effectController();
    lightController();
    interactController();
}
function mapLayout() {

}

$(document).ready(function () {
    var nav1s = [];
    $("#addItemButton").on("click",function () {

    })
})


