
var container;

var renderer;
var camera;
var scene;
function LoadSTLModel() {

    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    var stats;

    init();
    animate();
    function init() {
        container = document.getElementById('moduleArea');

        camera = new THREE.PerspectiveCamera( 65, container.clientWidth / container.clientHeight, 1, 2000000 );
        camera.position.set( 0, 0, 50 );

        scene = new THREE.Scene();

        var ambient = new THREE.AmbientLight( 0x444444 );
        scene.add( ambient );

        loader = new THREE.STLLoader();
        loader.load('./models/138705.stl',function (geometry) {
            var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xe1d51d, shininess: 200 });
            var mesh = new THREE.Mesh(geometry,material);

            mesh.position.set( 0, 0, 0 );
            mesh.scale.set( 0.05, 0.05, 0.05 );
            mesh.rotateX(80.11);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add( mesh );
        })



        // Lights

        scene.add( new THREE.HemisphereLight( 0xffffff, 0x5baadc ) );

        // renderer

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( container.clientWidth, container.clientHeight );
        renderer.setClearColor(backgroundColor,backgroundOpacity);
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
        //
        // camera.position.x = Math.cos( timer ) ;
        // camera.position.z = Math.sin( timer ) ;
        //
        // camera.lookAt( cameraTarget );
        renderer.render( scene, camera );

    }

}
