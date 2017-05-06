// /**
//  * Created by admin on 2017/3/15.
//  */
// var dragLiClick = function () {
//     var draghandlers =  $(".draghandler");
//     for(var i = 0 ; i<draghandlers.length;i++){
//         $(".draghandler")[0].style.display="block";
//     }
// };
// $(document).ready(function(){
//
//     $("#settingButton").click(function(){
//         $("#control-panel").slideToggle();
//     });
//
//     $( "#clonediv1").resizable({
//         animate: true,
//     });
//
//     //Counter
//     counter = 0;
//     //Make element draggable
//     $(".drag").draggable({
//         helper:'clone',
//         // handle: ".draghandler",
//         // cancel: "li",
//         containment: '.moduleArea',
//         scroll: false,
//         animate: true,
//         cursor:'move',
//
//         //show the grid hint
//         start:function(ev, ui) {
//             $(".grid")[0].style.display="block";
//             $(ui.helper).css({"z-index":6});
//         },
//
//         //When first dragged
//         stop:function(ev, ui) {
//              $("#control-panel").slideUp("fast");
//             var pos=$(ui.helper).offset();
//             $(ui.helper).css({"z-index":6});
//             objName = "#clonediv"+counter;
//             $(objName).css({"left":pos.left,"top":pos.top});
//             $(objName).removeClass("drag");
//
//             //When an existiung object is dragged
//             $(objName).draggable({
//                 containment: 'parent',
//                 // handle: ".draghandler",
//                 // cancel: "li",
//                 scroll: false,
//                 animate: true,
//                 cursor:'move',
//                 start:function(ev, ui) {
//                     $(".grid")[0].style.display="block";
//                 },
//                 stop:function(ev, ui) {
//                     $("#control-panel").slideUp("fast");
//                     var pos=$(ui.helper).offset();
//                 }
//             });
//         }
//     });
//     // $(".drag").droppable("destory");
//     //Make element droppable
//     $(".moduleArea").droppable({
//         drop: function(ev, ui) {
//             $(".grid")[0].style.display="none";
//             if (ui.helper.attr('id').search(/drag[0-9]/) != -1){
//                 counter++;
//                 var element=$(ui.draggable).clone();
//                 element.addClass("tempclass");
//                 $(this).append(element);
//                 $(".tempclass").attr("id","clonediv"+counter);
//                 $("#clonediv"+counter).removeClass("tempclass");
//                 $("#clonediv"+counter)[0].style.zIndex=3;
//
//                 //Get the dynamically item id
//                 draggedNumber = ui.helper.attr('id').search(/drag([0-9])/)
//                 itemDragged = "dragged" + RegExp.$1
//
//                 $("#clonediv"+counter).addClass(itemDragged);
//             }
//         }
//     });
//
//     // $(document).click(function() {
//     //     var draghandlers =  $(".draghandler");
//     //     for(var i = 0 ; i<draghandlers.length;i++){
//     //         $(".draghandler")[i].style.display="none";
//     //     }
//     // });
//
//     // $(".drag li").click(function () {
//     //     var draghandlers =  $(".draghandler");
//     //     for(var i = 0 ; i<draghandlers.length;i++){
//     //         $(".draghandler")[0].style.display="block";
//     //     }
//     //     // return false;
//     // });
//     // for(var i = 0 ; i<5;i++){
//     //     $(".clonediv"+i).click(function () {
//     //         var draghandlers =  $(".draghandler");
//     //         for(var i = 0 ; i<draghandlers.length;i++){
//     //             $(".draghandler")[0].style.display="block";
//     //         }
//     //         return false;
//     //     });
//     // }
//
// });

$(document).ready(function() {

    $("#settingButton").click(function () {
        $("#control-panel").slideToggle();
    })
})


