/**
 * Created by admin on 2017/5/15.
 */
var LightNum=0;

var pointLightControl,spotLightControl,directionalLightControl,areaLightControl;

var AreaLightGui,PointLightGui,DirectionalLightGui,SpotLightGui;

var lightControls = new Array(pointLightControl,spotLightControl,directionalLightControl,areaLightControl);
var lightGuis = new Array(PointLightGui,SpotLightGui,DirectionalLightGui,AreaLightGui);



function initDirectionalLight() {
    var matParams = {
        specular: 0xFFFFFF,
        shininess: 10000
    };

    var amb = new THREE.AmbientLight( 0x080808 );

    // TODO (abelnation): temp point light for debugging
    var dir = new THREE.DirectionalLight( 0xFFFFFF );
    var dirHelper = new THREE.DirectionalLightHelper( dir );

    var shapes, shapeNames;
    var rectLight;
    var rectLightHelper;

    var AreaLightGui;
    var param = {};

    var moveAreaLight = true;

    function init() {

        var gl = renderer.context;

        // Check for float-RT support
        // TODO (abelnation): figure out fall-back for float textures
        if (!gl.getExtension("OES_texture_float")) {
            alert("OES_texture_float not supported");
            throw "missing webgl extension";
        }

        if (!gl.getExtension("OES_texture_float_linear")) {
            alert("OES_texture_float_linear not supported");
            throw "missing webgl extension";
        }

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.antialias = true;


        rectLight = new THREE.RectAreaLight( 0xFFFFFF, undefined, 10, 10 );
        rectLight.matrixAutoUpdate = true;
        rectLight.intensity = 100.0;
        rectLight.position.set( 15, 15, 0 );
        rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
        rectLight.add( rectLightHelper );

        // TODO (abelnation): rect light shadow


        // matFloor.color.set( 0x808080 );
        randomColor( cube );

        // mshFloor.receiveShadow = true;
        // mshFloor.position.set( 0, 0, 0 );

        cube.castShadow = true;
        cube.receiveShadow = true;

        // scene.add( mshFloor );

        scene.add( rectLight );

    }

    function tick() {
        if(moveAreaLight){
            update();
        }
        render();
        requestAnimationFrame( tick );
    }

    function update() {

        var dt = 6000;
        var qdt = dt / 4.0;
        var dirSigns = [
            [ 1,  1 ],
            [ - 1,  1 ],
            [ - 1,  1 ],
            [ 1,  1 ]
        ];
        var t = ( Date.now() / 1000 );

        // move light in circle around center
        // change light height with sine curve

        var r = 15.0;

        var lx = r * Math.cos( t );
        var lz = r * Math.sin( t );

        var ly = 5.0 + 5.0 * Math.sin( t / 3.0 );
        // var ly = 7.0;

        rectLight.position.set( lx, ly, lz );
        rectLight.lookAt( cube.position );
        rectLight.updateMatrixWorld();
    }

    function render() {

        rectLightHelper.update(); // required
        renderer.render( scene, camera );

    }

    function clearGui() {

        if ( lightGuis.AreaLightGui ) lightGuis.AreaLightGui.destroy();

        lightGuis.AreaLightGui = new dat.GUI();

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        lightGuis. AreaLightGui.open();

    }

    function buildGui() {

        clearGui();


        //--------control the position/rotation/range by mouse drag---------

        lightControls.areaLightControl= new THREE.TransformControls(camera,renderer.domElement);
        lightControls.areaLightControl.attach( rectLight );
        lightControls.areaLightControl.addEventListener( 'change', function () {
            renderer.render( scene, camera );
        } );
        scene.add( lightControls.areaLightControl );
        //--------control the position/rotation/range by mouse gui end---------

        var areaLight = function(){
            this.color=rectLight.color.getHex();
            this.intensity=rectLight.intensity;
            this.width = rectLight.width;
            this.height = rectLight.height;
            this.visible = true;
            this.move = true;
            this.position = function () {lightControls.areaLightControl.setMode("translate")};
            this.rotation = function () {lightControls.areaLightControl.setMode("rotate")};
            this.scale = function () {lightControls.areaLightControl.setMode("scale")};
            this.delete = function () {
                scene.remove(rectLight);
                lightGuis.AreaLightGui.hide();
                scene.remove(lightControls.areaLightControl);
            };
        }

        var param = new areaLight();

        lightGuis.AreaLightGui.add( param, 'width', 0.1, 200).onChange( function ( val ) {rectLight.width = val;} );
        lightGuis.AreaLightGui.add( param, 'height', 0.1, 200).onChange( function ( val ) {rectLight.height = val;} );
        lightGuis.AreaLightGui.addColor( param, 'color' ).onChange( function ( val ) {rectLight.color.setHex( val );} );
        lightGuis.AreaLightGui.add( param, 'intensity', 0, 300 ).onChange( function ( val ) {rectLight.intensity = val;} );
        lightGuis.AreaLightGui.add( param, 'visible' ).onChange( function ( val ) {
            if(val == false){
                rectLightHelper.visible = false;
            }else{
                rectLightHelper.visible = true;
            }
        } );
        lightGuis.AreaLightGui.add( param, 'move').onChange( function ( val ) {
            moveAreaLight = val;
        } );

        var transform = lightGuis.AreaLightGui.addFolder('Transform');
        transform.add(param, 'position');
        transform.add(param, 'rotation');
        transform.add(param, 'scale');

        lightGuis.AreaLightGui.add(param,'delete');

    }
    function randomColor( target ) {

        if ( target !== undefined ) {

            if ( target.material !== undefined ) target = target.material;

            if ( target.color !== undefined ) {

                target.color.setHex( 0xffffff * Math.random() );

            }
        }

    }

    init();
    buildGui();
    tick();
}


function initPointLight(){
    var clock = new THREE.Clock();
    var light1, light2, light3, light4;
    var sphere = new THREE.SphereGeometry( 0.5, 16, 8 );

    light1 = new THREE.PointLight( 0xff0040, 2, 50 );
    light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
    light1.position.set(-20,15,10);
    scene.add( light1 );

    light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
    light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
    light2.position.set(20,15,10);
    scene.add( light2 );

    light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
    light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
    light3.position.set(-20,-15,10);
    scene.add( light3 );

    light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
    light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
    light4.position.set(20,-15,10);
    scene.add( light4 );

    renderer.render(scene,camera);
    animate();
    function animate() {

        requestAnimationFrame( animate );

        // render();
        renderer.render( scene, camera );
    }

    function render() {

        // var time = Date.now() * 0.0005;
        // var delta = clock.getDelta();
        //
        //
        // light1.position.x = Math.sin( time * 0.7 ) * 30;
        // light1.position.y = Math.cos( time * 0.5 ) * 40;
        // light1.position.z = Math.cos( time * 0.3 ) * 30;
        //
        // light2.position.x = Math.cos( time * 0.3 ) * 30;
        // light2.position.y = Math.sin( time * 0.5 ) * 40;
        // light2.position.z = Math.sin( time * 0.7 ) * 30;
        //
        // light3.position.x = Math.sin( time * 0.7 ) * 30;
        // light3.position.y = Math.cos( time * 0.3 ) * 40;
        // light3.position.z = Math.sin( time * 0.5 ) * 30;
        //
        // light4.position.x = Math.sin( time * 0.3 ) * 30;
        // light4.position.y = Math.cos( time * 0.7 ) * 40;
        // light4.position.z = Math.sin( time * 0.5 ) * 30;

        // renderer.render( scene, camera );


    }
}