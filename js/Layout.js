/**
 * Created by admin on 2017/5/4.
 */

var container=document.getElementById('moduleArea');
var width =container.clientWidth;
var height = container.clientHeight;

var renderer;
var camera;
var scene=new THREE.Scene();

var cube;

var mouseX=0;
var mouseXOnMouseDown=0;
var mouseY=0;
var mouseYOnMouseDown=0;

var targetRotationOnMouseDown=0;
var targetRotation=0;

var targetYRotationOnMouseDown=0;
var targetYRotation=0;

var windowHalfX = window.innerWidth/2;
var windowHalfY = window.innerHeight/2;

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
     renderEasyModel();
    // LoadSTLModel();
    // loadOBJ();
    backgroundController();
    effectController();
    lightController();
    interactController();
    wizardController();
}
function FullLayout() {
    $("#list-area").remove();
    $("#moduleArea").removeClass("HalfModuleArea");
    $("#moduleArea").addClass("moduleArea");
    renderEasyModel()
    // LoadSTLModel();
    // loadOBJ();
    backgroundController();
    effectController();
    lightController();
    interactController();
    wizardController();
}


$(document).ready(function () {
    var nav1s = [];
    $("#addItemButton").on("click",function () {
    })
})

// ------------------------dat gui show-hide controller-----------------------
dat.GUI.prototype.toggleHide = function() {
    if(this.domElement.hasAttribute("hidden")) {
        this.domElement.removeAttribute("hidden");
    } else {
        this.domElement.setAttribute("hidden", true);
    }
};

dat.GUI.prototype.hide = function() {
    this.domElement.setAttribute("hidden", true);
};

dat.GUI.prototype.show = function() {
    this.domElement.removeAttribute("hidden");
};
// ------------------------dat gui show-hide controller-----------------------
