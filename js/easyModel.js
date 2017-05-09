/**
 * Created by admin on 2017/5/2.
 */
var container;

var renderer;
var camera;
var scene;
// var light;
var cube;
var stats;
var sky, sunSphere;

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

function renderEasyModel() {

    if(LayoutNum !=0){


        $(document).ready( function() {
            initThree();
            animate();
        })

        function initThree() {
            container = document.getElementById('moduleArea');
            width =container.clientWidth;
            height = container.clientHeight;

            camera = new THREE.PerspectiveCamera(65,width/height,1,2000000);
            camera.position.set(0,150,500);

            scene = new THREE.Scene();

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width,height);
            container.appendChild(renderer.domElement);
            renderer.setClearColor(0xffffff,1);



            //cube
            var Cubegeometry;
            var Cubematerial;

            Cubegeometry = new THREE.BoxGeometry(200,200,200);
            Cubematerial = new THREE.MeshNormalMaterial( { overdraw: 0.5 } );

            Cubematerial.needsUpdate = true;
            Cubegeometry.needsUpdate = true;
            for(var i=0;i<Cubegeometry.faces.length;i+=2){
                var hex = Math.random()*0xffffff;
                Cubegeometry.faces[i].color.setHex(hex);
                Cubegeometry.faces[i+1].color.setHex(hex);
            }

            cube=new THREE.Mesh(Cubegeometry,Cubematerial);
            cube.position.set(0,150,0);
            scene.add(cube);

            //stats
            stats= new Stats();
            container.appendChild(stats.dom);

            document.addEventListener( 'mousedown',onDocuemntMouseDown,false);
            document.addEventListener( 'touchstart', onDocumentTouchStart, {passive: false} );
            document.addEventListener( 'touchmove', onDocumentTouchMove, {passive: false} );

            window.addEventListener('resize',onWindowResize,false);
        }

        function onWindowResize () {
            var windowHalfX = window.innerWidth/2;
            var windowHalfY = window.innerHeight/2;
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth,window.innerHeight);
        }

        function onDocuemntMouseDown(event) {
            event.preventDefault();
            if(event.target.tagName != "CANVAS"){
                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
            }else{
                document.addEventListener('mousemove',onDocumentMouseMove,false);
                document.addEventListener('mouseup',onDocumentMouseUp,false);
                document.addEventListener('mouseout',onDocumentMouseOut,false);

                mouseYOnMouseDown = event.clientY-windowHalfY;
                targetYRotationOnMouseDown=targetYRotation;

                mouseXOnMouseDown = event.clientX-windowHalfX;
                targetRotationOnMouseDown=targetRotation;
            }

        }

        function onDocumentMouseMove(event) {
            mouseX = event.clientX-windowHalfX;
            targetRotation = targetRotationOnMouseDown+(mouseX-mouseXOnMouseDown)*0.02;

            mouseY = event.clientX-windowHalfX;
            targetYRotation = targetYRotationOnMouseDown+(mouseY-mouseYOnMouseDown)*0.02;
        }

        function onDocumentMouseUp(event) {
            document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
            document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
            document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
        }

        function onDocumentMouseOut() {
            document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
            document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
            document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
        }

        function onDocumentTouchStart( event ) {

            if ( event.touches.length === 1 ) {

//            event.preventDefault();

                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;

                mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
                targetYRotationOnMouseDown = targetYRotation;

            }

        }

        function onDocumentTouchMove( event ) {

            if ( event.touches.length === 1 ) {

//            event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

                mouseY = event.touches[ 0 ].pageY - windowHalfY;
                targetYRotation = targetYRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;
            }

        }




//    animate
        function animate() {
            requestAnimationFrame(animate);
            stats.begin();
            render();
            stats.end();
        }

        function render() {

            cube.rotation.y += (targetRotation-cube.rotation.y)*0.005;
            cube.rotation.x += (targetYRotation-cube.rotation.x)*0.001;
            renderer.clear();
            renderer.render(scene,camera);

        }
        }else{
            alert("haven't choose template yet");
        }
}

function initSky() {
    //sky
    sky = new THREE.Sky();
    scene.add( sky.mesh );
    // Add Sun Helper
    sunSphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 20000, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    sunSphere.position.y =-70000;
    sunSphere.visible = false;
    scene.add( sunSphere );

    var effectController  = {
        turbidity: 10,
        rayleigh: 2,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        luminance: 1,
        inclination: 0.49, // elevation / inclination
        azimuth: 0.25, // Facing front,
        sun: ! true
    };

    var distance = 400000;

    function guiChanged() {

        var uniforms = sky.uniforms;
        uniforms.turbidity.value = effectController.turbidity;
        uniforms.rayleigh.value = effectController.rayleigh;
        uniforms.luminance.value = effectController.luminance;
        uniforms.mieCoefficient.value = effectController.mieCoefficient;
        uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

        var theta = Math.PI * ( effectController.inclination - 0.5 );
        var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

        sunSphere.position.x = distance * Math.cos( phi );
        sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
        sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

        sunSphere.visible = effectController.sun;

        sky.uniforms.sunPosition.value.copy( sunSphere.position );

        renderer.render( scene, camera );

    }

    var gui = new dat.GUI();

    gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
    gui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
    gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
    gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
    gui.add( effectController, "luminance", 0.0, 2 ).onChange( guiChanged );
    gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
    gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
    gui.add( effectController, "sun" ).onChange( guiChanged );

    guiChanged();

    $(".dg.ac").appendTo("#moduleArea");
    $(".dg.ac").css("position","absolute");
    $(".dg.ac").css("top","15px");
}
