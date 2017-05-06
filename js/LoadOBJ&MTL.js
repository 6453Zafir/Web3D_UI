/**
 * Created by admin on 2017/3/5.
 */
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container,stats;
var camera,cameraTarget,scene,renderer;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();
initGrid();

function init() {
    container = document.createElement('div');
    container.id='canvasWindow';
    // document.body.appendChild(container);
    document.getElementById("canvasArea").appendChild(container);
    container.style.zIndex = 0;
    container.style.position="absolute";
    container.style.overflow="hidden";

    //set camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.x = 150;
    camera.position.z = 850;
    camera.position.y = 300;

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );


    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            // console.log( Math.round(percentComplete, 2) + '% downloaded' );
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

            object.position.y = - 395;
            // object.position.x = - 95;
            object.position.z = - 95;
            object.rotation.y = 4.5;
            object.rotateY(145);
            object.scale.set( 0.7, 0.7, 0.7 );
            scene.add( object );

        }, onProgress, onError );

    });


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    //
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;

}



function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );

}
function initGrid(){
    var helper = new THREE.GridHelper( 5000,50 );
    helper.setColors( 0x0000ff, 0x808080 );
    helper.position.y = -450;
    scene.add( helper );
}
