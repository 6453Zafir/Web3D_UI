/**
 * Created by admin on 2017/5/2.
 */
// var container;
//
// var renderer;
// var camera;
// var scene;
//
// var cube;
//
// var mouseX=0;
// var mouseXOnMouseDown=0;
// var mouseY=0;
// var mouseYOnMouseDown=0;
//
// var targetRotationOnMouseDown=0;
// var targetRotation=0;
//
// var targetYRotationOnMouseDown=0;
// var targetYRotation=0;
//
// var windowHalfX = window.innerWidth/2;
// var windowHalfY = window.innerHeight/2;



function renderEasyModel() {
    if(LayoutNum !=0){
        $(document).ready( function() {
            initThree();
            animate();
        })
        function initThree() {
            document.getElementById("processing").style.display="none";
            // container = document.getElementById('moduleArea');
            camera = new THREE.PerspectiveCamera(65,width/height,1,2000000);
            camera.position.set(0,0,50);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width,height);
            container.appendChild(renderer.domElement);
            renderer.setClearColor(backgroundColor,backgroundOpacity);

            //cube
            var Cubegeometry;
            var Cubematerial;

            Cubegeometry = new THREE.BoxGeometry(20,20,20,1,1,1);
            // Cubematerial = new THREE.MeshNormalMaterial( { overdraw: 0.5 } );
            // Cubematerial =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );
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
            renderer.clear();
            renderer.render(scene,camera);
            //stats
            stats= new Stats();
            container.appendChild(stats.dom);

            // document.addEventListener( 'mousedown',onDocuemntMouseDown,false);
            // document.addEventListener( 'touchstart', onDocumentTouchStart, {passive: false} );
            // document.addEventListener( 'touchmove', onDocumentTouchMove, {passive: false} );

            window.addEventListener('resize',onWindowResize,false);
        }

        function onWindowResize () {
            var windowHalfX = window.innerWidth/2;
            var windowHalfY = window.innerHeight/2;
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth,window.innerHeight);
        }

//         function onDocuemntMouseDown(event) {
//             event.preventDefault();
//             if(event.target.tagName != "CANVAS"){
//                 document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
//                 document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
//                 document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
//             }else{
//                 document.addEventListener('mousemove',onDocumentMouseMove,false);
//                 document.addEventListener('mouseup',onDocumentMouseUp,false);
//                 document.addEventListener('mouseout',onDocumentMouseOut,false);
//
//                 mouseYOnMouseDown = event.clientY-windowHalfY;
//                 targetYRotationOnMouseDown=targetYRotation;
//
//                 mouseXOnMouseDown = event.clientX-windowHalfX;
//                 targetRotationOnMouseDown=targetRotation;
//             }
//
//         }
//
//         function onDocumentMouseMove(event) {
//             mouseX = event.clientX-windowHalfX;
//             targetRotation = targetRotationOnMouseDown+(mouseX-mouseXOnMouseDown)*0.02;
//
//             mouseY = event.clientX-windowHalfX;
//             targetYRotation = targetYRotationOnMouseDown+(mouseY-mouseYOnMouseDown)*0.02;
//         }
//
//         function onDocumentMouseUp(event) {
//             document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
//             document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
//             document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
//         }
//
//         function onDocumentMouseOut() {
//             document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
//             document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
//             document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
//         }
//
//         function onDocumentTouchStart( event ) {
//
//             if ( event.touches.length === 1 ) {
//
// //            event.preventDefault();
//
//                 mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
//                 targetRotationOnMouseDown = targetRotation;
//
//                 mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
//                 targetYRotationOnMouseDown = targetYRotation;
//
//             }
//
//         }
//
//         function onDocumentTouchMove( event ) {
//
//             if ( event.touches.length === 1 ) {
//
// //            event.preventDefault();
//
//                 mouseX = event.touches[ 0 ].pageX - windowHalfX;
//                 targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
//
//                 mouseY = event.touches[ 0 ].pageY - windowHalfY;
//                 targetYRotation = targetYRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;
//             }
//
//         }
//    animate
        }else{
            alert("haven't choose template yet");
        }
}

function animate() {
    requestAnimationFrame(animate);
    stats.begin();
    render();
    stats.end();
}

function render() {
    renderer.render(scene,camera);
}
