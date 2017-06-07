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
        if(skyShaderNewed){
            scene.remove(sky.mesh);
            scene.remove(sunSphere);
        }
        if(skyBoxNewed){
            scene.remove(skyBox);
        }
        var output = scene.toJSON();

        try {
            output = JSON.stringify( output, parseNumber, '\t' );
            output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
        } catch ( e ) {

            output = JSON.stringify( output );

        }
        saveString( output, 'scene.json' );
        localStorage.setItem('scene', output );
        alert("scene saved");
    })

    $('#uploadButton').bind("click", function () {
        $('#upload').click();
    });

    // $('#upload').addEventListener( 'change', function ( event ) {
    //     loader.loadFile( this.files[ 0 ] );
    // } );

    $("#clearButton").click(function () {
        if (backgroundScene != null) {
            while (backgroundScene.children.length > 0) {
                backgroundScene.remove(backgroundScene.children[0]);
            }
        }
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
            render();
        }

        skyShaderNewed = false;
        colordBgNewed = false;
        skyBoxNewed = false;
        IsFogNewed = false;
        IsGridNewed = false;
        IsGroundNewed = false;
        IsShadowNewed = false;
        IsDefaultControlNewed = false;
        IsOrbitControlNewed = false;
        IsFPSNewed = false;
        IsFlyControlNewed = false;
        IsAreaLightNewed = false;
        IsPointLightNewed = false;
        IsDirectionalLightNewed = false;
        IsSpotLightNewed = false;

        var Cubegeometry;
        var Cubematerial;

        Cubegeometry = new THREE.BoxGeometry(20,20,20,1,1,1);
        Cubematerial =new THREE.MeshPhongMaterial( { specular: 0xFFFFFF,shininess: 10000} );

        Cubematerial.needsUpdate = true;
        Cubegeometry.needsUpdate = true;

        for(var i=0;i<Cubegeometry.faces.length;i+=2){
            var hex = Math.random()*0xffffff;
            Cubegeometry.faces[i].color.setHex(hex);
            Cubegeometry.faces[i+1].color.setHex(hex);
        }

        cube=new THREE.Mesh(Cubegeometry,Cubematerial);
        cube.position.set(0,0,0);
        scene.add(cube);
        randomColor( cube );

        function randomColor( target ) {

            if ( target !== undefined ) {

                if ( target.material !== undefined ) target = target.material;

                if ( target.color !== undefined ) {

                    target.color.setHex( 0xffffff * Math.random() );

                }
            }
        }
        // lights

        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        light = new THREE.DirectionalLight( 0x002288 );
        light.position.set( -1, -1, -1 );
        scene.add( light );

        light = new THREE.AmbientLight( 0x222222 );
        scene.add( light );
    })


    $("#importButton").click(function () {
        scene.remove(cube);
        // var json = (localStorage.getItem('scene'));


// // Alternatively, to parse a previously loaded JSON structure
//         var object = loader.parse( json );
//         scene.add( object );
// //

        //
        var loader = new THREE.ObjectLoader();

        loader.load(
            // resource URL
            "models/scene.json",

            function (obj) {
                //add the loaded object to the scene
                scene.add(obj);
            },
            // Function called when download progresses
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Function called when download errors
            function (xhr) {
                console.error('An error happened');
            }
        );


// // Alternatively, to parse a previously loaded JSON structure
//         var object = loader.parse(a_json_object);
//
//         scene.add(object);
        render();
    });


    var link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    function save(blob, filename) {

        link.href = URL.createObjectURL(blob);
        link.download = filename || 'data.json';
        link.click();

    }

    function saveString(text, filename) {

        save(new Blob([text], {type: 'text/plain'}), filename);

    }

});