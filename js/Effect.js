/**
 * Created by admin on 2017/5/12.
 */
var IsFogNewed = false;
var IsGridNewed = false;
var IsTerrianNewed = false;
var IsShadowNewed = false;

function initFog() {
    if(!IsFogNewed){
        scene.fog = new THREE.FogExp2( 0x80baf1, 0.009 );
        renderer.render( scene, camera );
        renderer.setClearColor( scene.fog.color );
        IsFogNewed = true;
    }
}
function cleatFog() {
    scene.remove(fog);
    renderer.render( scene, camera );
}
