/**
 * Created by admin on 2017/5/16.
 */

var stats;

var orbitControl;
var FPSControl;
var FlyControl;

var currentControlNum = 0;
var IsDefaultControlNewed = false;
var IsOrbitControlNewed = false;
var IsFPSNewed = false;
var IsFlyControlNewed = false;
var clock = new THREE.Clock();

//-----------------------------default control----------------------------------------
function defaultControl() {
    currentControlNum = 1;
    IsDefaultControlNewed = true;
    stats= new Stats();
    container.appendChild(stats.dom);
    document.addEventListener( 'mousedown',onDocuemntMouseDown,false);
    document.addEventListener( 'touchstart', onDocumentTouchStart, {passive: false} );
    document.addEventListener( 'touchmove', onDocumentTouchMove, {passive: false} );

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
        renderer.render(scene,camera);
    }
    if(IsDefaultControlNewed){
        animate();
    }

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
            mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
            targetRotationOnMouseDown = targetRotation;

            mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
            targetYRotationOnMouseDown = targetYRotation;
        }
    }
    function onDocumentTouchMove( event ) {
        if ( event.touches.length === 1 ) {

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

            mouseY = event.touches[ 0 ].pageY - windowHalfY;
            targetYRotation = targetYRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;
        }
    }
function clearDefaultControl() {
    IsDefaultControlNewed=false;
    document.removeEventListener( 'mousedown',onDocuemntMouseDown,false);
    document.removeEventListener( 'touchstart', onDocumentTouchStart, {passive: false} );
    document.removeEventListener( 'touchmove', onDocumentTouchMove, {passive: false} );
}

//-----------------------------default control end----------------------------------------
//-----------------------------orbit control--------------------------------------------

function initOrbitControl() {
    currentControlNum = 2;
    orbitControl = new THREE.OrbitControls(camera,renderer.domElement);
    orbitControl.addEventListener('change',render);
    orbitControl.enableZoom = false;

    stats = new Stats();
    container.appendChild( stats.dom );


    function animate() {

        requestAnimationFrame( animate );

        orbitControls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

        stats.update();

        render();

    }

    function render() {

        renderer.render( scene, camera );

    }
}
function clearOrbitControl() {
    orbitControl.enabled = false;
}
//-----------------------------orbit control end----------------------------------------
//-----------------------------FPS control----------------------------------------
function initFPSControl() {
    var controlsEnabled = true;

    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

        var element = document.body;

        var pointerlockchange = function ( event ) {

            if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

                controlsEnabled = true;
                FPSControl.enabled = true;

            } else {
                FPSControl.enabled = false;
            }

        };

        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();

    } else {

        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var prevTime = Date.now();
    var velocity = new THREE.Vector3();

    FPSControl = new THREE.PointerLockControls( camera );
    scene.add( FPSControl.getObject() );


    animate();

    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );


    function animate() {

        requestAnimationFrame( animate );

        if ( controlsEnabled ) {

            var time = Date.now();
            var delta = ( time - prevTime ) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            if ( moveForward ) velocity.z -= 400.0 * delta;
            if ( moveBackward ) velocity.z += 400.0 * delta;

            if ( moveLeft ) velocity.x -= 400.0 * delta;
            if ( moveRight ) velocity.x += 400.0 * delta;


            FPSControl.getObject().translateX( velocity.x * delta );
            FPSControl.getObject().translateY( velocity.y * delta );
            FPSControl.getObject().translateZ( velocity.z * delta );

            canJump = true;
            prevTime = time;

        }

        renderer.render( scene, camera );

    }
    currentControlNum =3;
}
function clearFPSControl() {
    FPSControl.enabled = false;
    camera.position.set(0,0,50);
}
//-----------------------------FPS control end----------------------------------------
//-----------------------------fly control -----------------------------------------
function initFlyControl() {
    currentControlNum =4;
    if(!IsFlyControlNewed){
        clock.start();
        stats = new Stats();
        container.appendChild( stats.dom );

        FlyControl = new THREE.FlyControls( camera ,container);
        FlyControl.movementSpeed = 10;
        // FlyControl.domElement = container;
        FlyControl.rollSpeed = Math.PI / 24;
        FlyControl.autoForward = false;
        FlyControl.dragToLook = false;

        IsFlyControlNewed = true;
    }else{
        FlyControl.enabled = true;
    }

    animate();

    function animate() {
        if(currentControlNum ==4){
            requestAnimationFrame( animate );
            render();
            stats.update();
        }
    }
    function render() {
        var delta = clock.getDelta();
        FlyControl.update( delta );
        renderer.render(scene,camera);
    }
}


function clearFlyControl() {
    FlyControl.enabled = false;
    camera.position.set(0,0,50);
}
//-----------------------------fly control end----------------------------------------
