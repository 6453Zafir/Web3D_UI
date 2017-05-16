/**
 * Created by admin on 2017/5/16.
 */
function defaultControl() {
    //stats
    stats= new Stats();
    container.appendChild(stats.dom);

    document.addEventListener( 'mousedown',onDocuemntMouseDown,false);
    document.addEventListener( 'touchstart', onDocumentTouchStart, {passive: false} );
    document.addEventListener( 'touchmove', onDocumentTouchMove, {passive: false} );


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
    animate();
}

