/**
 * Created by admin on 2017/5/15.
 */
var LightNum=0;

var IsAreaLightNewed = false;
var IsPointLightNewed = false;
var IsDirectionalLightNewed = false;
var IsSpotLightNewed = false;

var pointLightControl,spotLightControl,directionalLightControl,areaLightControl;

var AreaLightGui,PointLightGui,DirectionalLightGui,SpotLightGui;

var lightControls = new Array(pointLightControl,spotLightControl,directionalLightControl,areaLightControl);
var lightGuis = new Array(PointLightGui,SpotLightGui,DirectionalLightGui,AreaLightGui);

var moveAreaLight = true;
var movePointLight = true;
var moveSpotLight = true;

function initAreaLight() {
    if(!IsAreaLightNewed){
        var matParams = {
            specular: 0xFFFFFF,
            shininess: 10000
        };

        var amb = new THREE.AmbientLight( 0x080808 );

        var rectLight;
        var rectLightHelper;

        function init() {

            var gl = renderer.context;

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

            randomColor( cube );

            cube.castShadow = true;
            cube.receiveShadow = true;

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

            var r = 15.0;

            var lx = r * Math.cos( t );
            var lz = r * Math.sin( t );

            var ly = 5.0 + 5.0 * Math.sin( t / 3.0 );

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
                    IsAreaLightNewed = false;
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
        IsAreaLightNewed = true;
    }else{
        lightControls.areaLightControl.visible = true;
        lightControls.areaLightControl.enabled = true;
        lightGuis.AreaLightGui.show();
    }

}
function clearAreaLight() {
    lightControls.areaLightControl.visible = false;
    lightControls.areaLightControl.enabled = false;
    lightGuis.AreaLightGui.hide();
}

function initPointLight(){
    if(!IsPointLightNewed){
        var clock = new THREE.Clock();
        var pointlight;
        var sphere = new THREE.SphereGeometry( 0.5, 16, 8 );
        var pointlightHelper = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) );

        pointlight = new THREE.PointLight( 0xff0040, 6, 100,1 );
        pointlight.add( pointlightHelper);
        pointlight.position.set(-20,15,10);
        scene.add( pointlight );

        //--------control the position/rotation/range by mouse drag---------
        lightControls.pointLightControl= new THREE.TransformControls(camera,renderer.domElement);
        lightControls.pointLightControl.attach( pointlight );
        lightControls.pointLightControl.addEventListener( 'change', function () {
            renderer.render( scene, camera );
        } );
        scene.add( lightControls.pointLightControl );
        //--------control the position/rotation/range by mouse gui end---------


        if ( lightGuis.PointLightGui ) lightGuis.PointLightGui.destroy();


        lightGuis.PointLightGui = new dat.GUI();

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        lightGuis. PointLightGui.open();

        var pointLightData = function(){
            this.color=pointlight.color.getHex();
            this.intensity=pointlight.intensity;
            this.distence = pointlight.distance;
            this.decay = pointlight.decay;
            this.visible = true;
            this.move = true;
            this.position = function () {lightControls.pointLightControl.setMode("translate")};
            this.rotation = function () {lightControls.pointLightControl.setMode("rotate")};
            this.scale = function () {lightControls.pointLightControl.setMode("scale")};
            this.delete = function () {
                scene.remove(pointlight);
                lightGuis.PointLightGui.hide();
                scene.remove(lightControls.pointLightControl);
                IsPointLightNewed = false;
            };
        }

        var param = new pointLightData();
        lightGuis.PointLightGui.addColor( param, 'color' ).onChange( function ( val ) {pointlight.color.setHex( val );} );
        lightGuis.PointLightGui.add( param, 'intensity', 0,50 ).onChange( function ( val ) {pointlight.intensity = val;} );
        lightGuis.PointLightGui.add( param, 'distence', 1, 200).onChange( function ( val ) {pointlight.distence = val;} );
        lightGuis.PointLightGui.add( param, 'decay', 1, 2).onChange( function ( val ) {pointlight.decay = val;} );
        lightGuis.PointLightGui.add( param, 'visible' ).onChange( function ( val ) {
            if(val == false){
                pointlightHelper.visible = false;
            }else{
                pointlightHelper.visible = true;
            }
        } );
        lightGuis.PointLightGui.add( param, 'move').onChange( function ( val ) {
            movePointLight = val;
        } );

        var transform = lightGuis.PointLightGui.addFolder('Transform');
        transform.add(param, 'position');
        transform.add(param, 'rotation');
        transform.add(param, 'scale');

        lightGuis.PointLightGui.add(param,'delete');

        renderer.render(scene,camera);

        animate();
        function animate() {
            requestAnimationFrame( animate );
            if(movePointLight){
                update();
            }
            renderer.render( scene, camera );
        }

        function update() {

            var time = Date.now() * 0.0005;
            var delta = clock.getDelta();

            pointlight.position.x = Math.sin( time * 0.7 ) * 20;
            pointlight.position.y = Math.cos( time * 0.5 ) * 20;
            pointlight.position.z = Math.cos( time * 0.3 ) * 20;

        }
        IsPointLightNewed = true;
    }else{
        lightControls.pointLightControl.visible = true;
        lightControls.pointLightControl.enabled = true;
        lightGuis.PointLightGui.show();
    }

}

function clearPointLight() {
    lightControls.pointLightControl.visible = false;
    lightControls.pointLightControl.enabled = false;
    lightGuis.PointLightGui.hide();
}

// function clearThisGuiSlibling(thisgui) {
//     for(i=0;i<lightGuis.length;i++){
//         if(lightGuis[i] != thisgui){
//             lightGuis[i].hide();
//         }else{
//             lightGuis[i].show();
//         }
//     }
// }