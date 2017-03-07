if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container,stats;
var camera,cameraTarget,scene,renderer;

init();
animate();
initGrid();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);

        camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 15 );
        camera.position.set( 3, 2.2, 3 );

         cameraTarget = new THREE.Vector3(0,0.5,0);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
        var ambient = new THREE.AmbientLight( 0x444444 );
        scene.add( ambient );


        loader = new THREE.STLLoader();
        loader.load('./models/138705.stl',function (geometry) {
            var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xe1d51d, shininess: 200 });
            var mesh = new THREE.Mesh(geometry,material);

            mesh.position.set( -1, 0.05, -0.4 );
            mesh.rotation.set( 0, - Math.PI / 2, 0 );
            mesh.scale.set( 0.005, 0.005, 0.005 );
            mesh.rotateX(80.11);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            scene.add( mesh );
        })


        // Ground

        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 60, 60 ),
            new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x6bd6d7 } )
        );
        plane.rotation.x = -Math.PI/2;
        plane.position.y = -0.5;
        scene.add( plane );

        plane.receiveShadow = true;



        // Lights

        scene.add( new THREE.HemisphereLight( 0xffffff, 0x5baadc ) );

        // renderer

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( scene.fog.color );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.renderReverseSided = false;

        container.appendChild( renderer.domElement );

        // stats

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild( stats.dom );

        //

    }
function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

}
function render() {

    var timer = Date.now() * 0.0005;

    camera.position.x = Math.cos( timer ) * 3;
    camera.position.z = Math.sin( timer ) * 3;

    camera.lookAt( cameraTarget );

    renderer.render( scene, camera );

}

function initGrid(){
    var helper = new THREE.GridHelper( 500,250 );
    helper.setColors( 0x0000ff, 0x808080 );
    scene.add( helper );
}