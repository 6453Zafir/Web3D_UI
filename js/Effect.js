/**
 * Created by admin on 2017/5/12.
 */
var IsFogNewed = false;
var IsGridNewed = false;
var IsTerrianNewed = false;
var IsShadowNewed = false;

var FogGui;
var FogColor = 0xffffff;
var FogDensity = 0.0009;

function initFog() {
    if(!IsFogNewed){
        scene.fog = new THREE.FogExp2(FogColor,FogDensity)
        renderer.setClearColor( scene.fog.color );
        renderer.render( scene, camera );

        var controlFog  = {
            color: FogColor,
            density: FogDensity
        };

        Foggui = new dat.GUI();
        Foggui.domElement.parentNode.id = 'fog-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        Foggui.addColor(controlFog, "color").onChange(function (e) {
            scene.fog.color.set(controlFog.color);
            //the color variable can not ! use "=",must use the set funtion
            renderer.setClearColor( scene.fog.color );
            renderer.render( scene, camera );
        });

        Foggui.add(controlFog, "density",0.0001,0.009).onChange(function (e) {
            scene.fog.density = controlFog.density;
            renderer.render( scene, camera );
        });

        IsFogNewed = true;
    }else{
        Foggui.show();
    }
}
function clearFog() {
    scene.fog.density=0;
    renderer.setClearColor( backgroundColor );
    renderer.render( scene, camera );
    Foggui.hide();
}
