/**
 * Created by admin on 2017/5/15.
 */
var LightNum=0;

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


        rectLight = new THREE.RectAreaLight( 0xFFFFFF, undefined, 100, 100 );
        rectLight.matrixAutoUpdate = true;
        rectLight.intensity = 100.0;
        rectLight.position.set( 1500, 1500, 0 );
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

        update();
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

        var r = 10.0;

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

        if ( AreaLightGui ) AreaLightGui.destroy();

        AreaLightGui = new dat.GUI();

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");


        AreaLightGui.open();

    }

    function buildGui() {

        clearGui();

        param = {
            'light color': rectLight.color.getHex(),
            intensity: rectLight.intensity,
            width: rectLight.width,
            height: rectLight.height,
            // shininess: matFloor.shininess

        };

        AreaLightGui.add( param, 'width', 0.1, 2000).onChange( function ( val ) {

            rectLight.width = val;

        } );

        AreaLightGui.add( param, 'height', 0.1, 2000).onChange( function ( val ) {

            rectLight.height = val;

        } );

        AreaLightGui.addColor( param, 'light color' ).onChange( function ( val ) {

            rectLight.color.setHex( val );

        } );

        AreaLightGui.add( param, 'intensity', 0, 100 ).onChange( function ( val ) {

            rectLight.intensity = val;

        } );
        //
        // AreaLightGui.add( param, 'shininess', 0, 100000 ).onChange( function ( val ) {
        //
        //     cube.shininess = val;
        //     matFloor.shininess = val;
        //
        // } );


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