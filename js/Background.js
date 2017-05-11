/**
 * Created by admin on 2017/5/11.
 */
var BackgroundNum = 0;
var ImageBgNum = 0;
var SkyboxName = "";

var sky, sunSphere;
var backgroundColor = 0xffffff;
var backgroundOpacity = 1;

var backgroundScene;
var backgroundCamera;
var skyShaderNewed = false;
var colordBgNewed = false;
var skyBoxNewed = false;

var skyShadergui;
var bgColorgui;

var skyBox

// ----------------------------skyshader background------------------------------
function initSky() {
    //sky
    if(!skyShaderNewed){
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
        skyShaderNewed=true;
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

        skyShadergui = new dat.GUI();
        skyShadergui.domElement.parentNode.id= 'skyShader-controller';

        skyShadergui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
        skyShadergui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
        skyShadergui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
        skyShadergui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
        skyShadergui.add( effectController, "luminance", 0.0, 2 ).onChange( guiChanged );
        skyShadergui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
        skyShadergui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
        skyShadergui.add( effectController, "sun" ).onChange( guiChanged );

        guiChanged();

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");
    }else{
        sky.mesh.visible = true;
        sunSphere.visible = true;
        skyShadergui.show();
    }
}

function clearSky(){
    sky.mesh.visible = false;
    sunSphere.visible = false;
    renderer.render( scene, camera );
    skyShadergui.hide();
}
// ----------------------------skyshader background end------------------------------
// --------------------------------color background----------------------------------
function initBgColor(){
    if(!colordBgNewed){
        var controlbgColor  = {
            color: backgroundColor,
            opacity: backgroundOpacity,
        };

        bgColorgui = new dat.GUI();
        bgColorgui.domElement.parentNode.id= 'bgColor-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        bgColorgui.addColor(controlbgColor, "color").onChange(function (e) {
            renderer.setClearColor(controlbgColor.color,controlbgColor.opacity);
            renderer.render( scene, camera );
        });
        bgColorgui.add(controlbgColor, "opacity",0,1).onChange(function (e) {
            renderer.setClearColor(controlbgColor.color,controlbgColor.opacity);
            renderer.render( scene, camera );
        });

        colordBgNewed =true;
    }else{
        bgColorgui.show();
    }
}

function clearBgcolor(){
    bgColorgui.hide();
}
// ------------------------------color background end--------------------------------
// --------------------------------image background----------------------------------
function initImageBackground(imageNum) {

    $("#background").css("height","420px");
    $("#background").css("transition","all 0.4s");
    $(".ImageBackgroundArea").slideDown();
    var texture1 = THREE.ImageUtils.loadTexture( 'images/image-backgrounds/imagebg-'+imageNum+'.jpg' );
    // var texture2 = THREE.ImageUtils.loadTexture( 'images/black.jpg' );
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: texture1
        }));

    backgroundMesh .material.depthTest = false;
    backgroundMesh .material.depthWrite = false;

    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.Camera();
    backgroundScene .add(backgroundCamera );
    backgroundScene .add(backgroundMesh );
    // backgroundMesh.material.map = texture2;

    var render = function () {
        requestAnimationFrame(render);
        renderer.autoClear = false;
        renderer.clear();
        renderer.render(backgroundScene , backgroundCamera );
        renderer.render( scene, camera );
    };
    render();
}

function clearImageBackground() {
    $("#background").css("height","250px");
    $(".ImageBackgroundArea").hide(500);
    backgroundScene.delete;
    backgroundCamera.delete;
    renderer.autoClear = true;
    renderer.clear();
    renderer.render( scene, camera );
}
// ------------------------------image background end--------------------------------

// ------------------------------skybox background--------------------------------
function initSkybox(skyboxName) {
    $("#background").css("height","420px");
    $("#background").css("transition","all 0.4s");
    $(".skyboxBackgroundArea").slideDown();
    if(!skyBoxNewed){
        var imagePrefix = "images/skyboxs/dawnmountain/dawnmountain-";
        var imagePrefix = "images/skyboxs/"+skyboxName+"/"+skyboxName+"-";
        var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
        var imageSuffix = ".png";
        var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

        var materialArray = [];
        for (var i = 0; i < 6; i++)
            materialArray.push( new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
                side: THREE.BackSide
            }));
        var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
        skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
        scene.add( skyBox );
        skyBoxNewed=true;
    }else{
        skyBox.visible=true;
    }
}

function clearslibingSkybox() {
    skyBoxNewed=false;
    scene.remove(skyBox);
}
function clearSkybox() {
    $("#background").css("height","250px");
    $(".skyboxBackgroundArea").hide(500);
    skyBox.visible=false;
}
// ------------------------------skybox background end--------------------------------