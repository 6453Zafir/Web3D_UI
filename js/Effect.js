/**
 * Created by admin on 2017/5/12.
 */
var EffectNum = 0;

var IsFogNewed = false;
var IsGridNewed = false;
var IsTerrianNewed = false;
var IsShadowNewed = false;

var GridControl;

var FogGui;
var FogColor = 0xffffff;
var FogDensity = 0.0009;


var gridHelper;
var GridGui;

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

// --------------------------------Grid--------------------------------------
function initGrid(){
    if(!IsGridNewed){
        gridHelper = new THREE.GridHelper( 1000,10,0x5ae5e3,0x6d6d6d );
        gridHelper.position.y = 0;
        gridHelper.position.x = 0;
        scene.add( gridHelper );
        renderer.render( scene, camera );

        //--------control the position/rotation/range by mouse drag---------
        GridControl = new THREE.TransformControls(camera,renderer.domElement);
        GridControl.attach( gridHelper );
        GridControl.addEventListener( 'change', function () {
            renderer.render( scene, camera );
        } );
        scene.add( GridControl );
        //--------control the position/rotation/range by mouse gui end---------

        var controlGrid = function() {
            this.size = 1000;
            this.division = 10;
            this.colorcenterline = "#5ae5e3";
            this.color = "#6d6d6d";
            this.position = function() {GridControl.setMode( "translate" )};
            this.rotation = function() {GridControl.setMode( "rotate" )};
            this.scale =function() {GridControl.setMode( "scale" )};
            this.delete = function () {
                IsGridNewed = false;
                scene.remove(gridHelper);
                scene.remove(GridControl);
                GridGui.hide();
                renderer.render(scene,camera);
            }
        };

        var gridObject = new controlGrid();
        GridGui = new dat.GUI();
        GridGui.domElement.parentNode.id = 'grid-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");


        GridGui.add(gridObject, 'size',100,10000).onChange( function (e) {
            gridHelper.size = gridObject.size;
            renderer.render( scene, camera );
        });
        GridGui.add(gridObject, 'division', 10, 100).onChange( function (e) {
            gridHelper.division = gridObject.division;
            renderer.render( scene, camera );
        });
        GridGui.addColor(gridObject, 'colorcenterline').onChange( function (e) {
            // gridHelper.colorCenterLine.set(gridObject.colorcenterline);
            //
            // renderer.render( scene, camera );
        });
        GridGui.addColor(gridObject, 'color').onChange( function (e) {
            // gridHelper.colorGrid.setColors(gridObject.color);
            gridHelper.setColors(gridObject.color)
            renderer.render( scene, camera );
        });

        var transform = GridGui.addFolder('Transform');
        transform.add(gridObject, 'position');
        transform.add(gridObject, 'rotation');
        transform.add(gridObject, 'scale');

        GridGui.add(gridObject,'delete');

        IsGridNewed= true;
    }else{
        GridControl.visible = true;
        GridGui.show();
    }
}

function clearGrid() {
    GridControl.visible = false;
    GridGui.hide();
}

