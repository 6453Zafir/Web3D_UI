/**
 * Created by admin on 2017/3/5.
 */
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container,stats;
var camera,cameraTarget,scene,renderer;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function loadOBJ() {
    init();
    animate();

    function init() {
        container = document.getElementById('moduleArea');
        //set camera
        camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 2000000);
        camera.position.x = 0;
        camera.position.z = 100;
        camera.position.y = 0;

        scene = new THREE.Scene();

        var ambient = new THREE.AmbientLight( 0x444444 );
        scene.add( ambient );

        var directionalLight = new THREE.DirectionalLight( 0xffeedd );
        directionalLight.position.set( 0, 0, 1 ).normalize();
        scene.add( directionalLight );

        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                if(Math.round(percentComplete, 2)<100){
                    document.getElementById("processing").style.display="inital";
                    document.getElementById("processingBar").style.width=Math.round(percentComplete, 2)+'%';
                    document.getElementById("processingText").innerHTML= Math.round(percentComplete, 2)+"%";
                }else{
                    document.getElementById("processingBar").style.width=Math.round(percentComplete, 2)+'%';
                    document.getElementById("processingText").innerHTML= Math.round(percentComplete, 2)+"%";
                    document.getElementById("processing").className = document.getElementById("processing").className + " loading-container-hidden";

                    setTimeout(function () {
                        document.getElementById("processing").style.display = "hidden";
                    }, 1500);
                }
            }
        };

        var onError = function ( xhr ) { };

        THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath( './obj/motorcycle/' );
        mtlLoader.load( 'Triumph.mtl', function( materials ) {

            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( './obj/motorcycle/' );
            objLoader.load( 'Triumph.obj', function ( object ) {

                object.position.y = -350;
                object.position.z = -800;
                object.position.x = -100;
                object.rotation.y = 4.5;
                object.rotateY(145);
                object.scale.set( 0.5, 0.5, 0.5 );
                scene.add( object );

            }, onProgress, onError );

        });


        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        // //
        // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //
        // //
        //
        // window.addEventListener( 'resize', onWindowResize, false );
    }
    // function onWindowResize() {
    //
    //     windowHalfX = window.innerWidth / 2;
    //     windowHalfY = window.innerHeight / 2;
    //
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    //
    // }
    //
    // function onDocumentMouseMove( event ) {
    //
    //     mouseX = ( event.clientX - windowHalfX ) / 2;
    //     mouseY = ( event.clientY - windowHalfY ) / 2;
    //
    // }



    function animate() {

        requestAnimationFrame( animate );
        render();

    }

    function render() {
        renderer.render( scene, camera );
    }

}
