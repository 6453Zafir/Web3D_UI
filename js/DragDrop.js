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
var IsPanelOpen = false;

$(document).ready(function() {

    var loader = THREE.OBJLoader();
    $("#settingButton").click(function () {
        $("#control-panel").slideToggle();
        IsPanelOpen = !IsPanelOpen;
    })

    $("#saveButton").click(function () {
        var myscene = scene;
        var exporter = new THREE.OBJExporter();
        var sceneJson = JSON.stringify(exporter.parse(myscene));
        localStorage.setItem('scene', sceneJson);
        saveString( sceneJson, 'scene.json' );
        alert("scene saved");
    })

    $('#uploadButton').bind("click" , function () {
        $('#upload').click();
    });

    // $('#upload').addEventListener( 'change', function ( event ) {
    //     loader.loadFile( this.files[ 0 ] );
    // } );
    $("#clearButton").click(function () {
        while (scene.children.length>0){
            if(backgroundScene!=null){
                while (backgroundScene.children.length>0){
                    backgroundScene.remove(backgroundScene.children[0]);
                }
            }
            scene.remove(scene.children[0]);
            render();
        }

    })


    $("#importButton").click(function () {
        var json = (localStorage.getItem('scene'));
        var loader = new THREE.ObjectLoader();

        loader.load(
            // resource URL
            "models/test.json",

            // pass the loaded data to the onLoad function.
//Here it is assumed to be an object
            function ( obj ) {
                //add the loaded object to the scene
                scene.add( obj );
            },

            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // Function called when download errors
            function ( xhr ) {
                console.error( 'An error happened' );
            }
        );


// // Alternatively, to parse a previously loaded JSON structure
//         var object = loader.parse( json );
//         scene.add( object );
//     })
// //
})

var link = document.createElement( 'a' );
link.style.display = 'none';
document.body.appendChild( link );

function save( blob, filename ) {

    link.href = URL.createObjectURL( blob );
    link.download = filename || 'data.json';
    link.click();

}

function saveString( text, filename ) {

    save( new Blob( [ text ], { type: 'text/plain' } ), filename );

}