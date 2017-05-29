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
    LightNum = 3;
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
    LightNum =1;
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

function initSpotLight() {
    LightNum =2;
    if(!IsSpotLightNewed){
        var spotLight = new THREE.SpotLight( 0xffb110, 1 );
        var lightHelper = new THREE.SpotLightHelper(spotLight);
        var param = { color: '0xffb110' };

        function init() {
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                renderer.gammaInput = true;
                renderer.gammaOutput = true;

                spotLight.position.set(15, 20, 10);
                spotLight.castShadow = true;
                spotLight.angle = Math.PI / 8
                spotLight.penumbra = 0.05;
                spotLight.decay = 2;
                spotLight.distance = 200;
                spotLight.shadow.mapSize.width = 1024;
                spotLight.shadow.mapSize.height = 1024;
                spotLight.shadow.camera.near = 1;
                spotLight.shadow.camera.far = 200;

                scene.add(spotLight);
                scene.add(lightHelper);
                scene.add(new THREE.AxisHelper(10));
            }
            function render() {
                lightHelper.update(); // required
                renderer.render( scene, camera );
            }

            function clearGui() {
                if ( lightGuis.SpotLightGui ) lightGuis.SpotLightGui.destroy();
                lightGuis.SpotLightGui = new dat.GUI();
                $(".dg.ac").appendTo("#moduleArea");
                $(".dg.ac").css("position","absolute");
                $(".dg.ac").css("top","15px");
                lightGuis.SpotLightGui.open();
            }

            function buildGui() {
                //--------control the position/rotation/range by mouse drag---------
                lightControls.spotLightControl= new THREE.TransformControls(camera,renderer.domElement);
                lightControls.spotLightControl.attach( spotLight );
                lightControls.spotLightControl.addEventListener( 'change', function () {
                    renderer.render( scene, camera );
                } );
                scene.add( lightControls.spotLightControl );
                //--------control the position/rotation/range by mouse gui end---------

                clearGui();
                addGui( 'light color', spotLight.color.getHex(), function( val ) {
                    spotLight.color.setHex( val );
                    render();
                }, true );
                addGui( 'intensity', spotLight.intensity, function( val ) {
                    spotLight.intensity = val;
                    render();
                }, false, 0, 2 );

                addGui( 'distance', spotLight.distance, function( val ) {
                    spotLight.distance = val;
                    render();
                }, false, 0, 200 );

                addGui( 'angle', spotLight.angle, function( val ) {
                    spotLight.angle = val;
                    render();
                }, false, 0, Math.PI / 3 );

                addGui( 'penumbra', spotLight.penumbra, function( val ) {
                    spotLight.penumbra = val;
                    render();
                }, false, 0, 1 );

                addGui( 'decay', spotLight.decay, function( val ) {
                    spotLight.decay = val;
                    render();
                }, false, 1, 2 );

                var spotLightData = function(){
                    this.visible = true;
                    // this.move = true;
                    this.position = function () {lightControls.spotLightControl.setMode("translate")};
                    this.rotation = function () {lightControls.spotLightControl.setMode("rotate")};
                    this.scale = function () {lightControls.spotLightControl.setMode("scale")};
                    this.delete = function () {
                        scene.remove(spotLight);
                        scene.remove(lightHelper);
                        lightGuis.SpotLightGui.hide();
                        scene.remove(lightControls.spotLightControl);
                        IsSpotLightNewed = false;
                    };
                }

                var spotLightObject = new spotLightData();
                lightGuis.SpotLightGui.add( spotLightObject, 'visible' ).onChange( function ( val ) {
                    if(val == false){
                        lightHelper.visible = false;
                    }else{
                        lightHelper.visible = true;
                    }
                    renderer.render(scene,camera);
                } );

                var transform = lightGuis.SpotLightGui.addFolder('Transform');
                transform.add(spotLightObject, 'position');
                transform.add(spotLightObject, 'rotation');
                transform.add(spotLightObject, 'scale');

                lightGuis.SpotLightGui.add(spotLightObject,'delete');
            }

            function addGui( name, value, callback, isColor, min, max ) {
                var node;
                param[ name ] = value;
                if ( isColor ) {
                    node = lightGuis.SpotLightGui.addColor( param, name ).onChange( function() {
                        callback( param[ name ] );
                    } );

                } else if ( typeof value == 'object' ) {
                    node = lightGuis.SpotLightGui.add( param, name, value ).onChange( function() {
                        callback( param[ name ] );
                    } );
                } else {
                    node = lightGuis.SpotLightGui.add( param, name, min, max ).onChange( function() {
                        callback( param[ name ] );
                    } );

                }
                return node;
            }
            init();
            buildGui();
            render();
        } else{
            lightControls.spotLightControl.visible = true;
            lightControls.spotLightControl.enabled = true;
            lightGuis.SpotLightGui.show();
        }
}
function clearSpotLight() {
    lightControls.spotLightControl.visible = false;
    lightControls.spotLightControl.enabled = false;
    lightGuis.SpotLightGui.hide();
}

