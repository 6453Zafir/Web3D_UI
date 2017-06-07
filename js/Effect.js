/**
 * Created by admin on 2017/5/12.
 */
var EffectNum = 0;

var IsFogNewed = false;
var IsGridNewed = false;
var IsGroundNewed = false;
var IsShadowNewed = false;

var GridControl;
var GroundControl;
var EffectControls=new Array(GridControl,GroundControl);

var FogGui;
var GridGui;
var GroundGui;

var EffectGuis=new Array(FogGui,GridGui,GroundGui);

var gridHelper;

function initFog() {
    EffectNum =1;
  if(!IsFogNewed){
        scene.fog = new THREE.FogExp2(0xffffff,0.0009)
        renderer.setClearColor( scene.fog.color );
        renderer.render( scene, camera );

        var controlFog  = function(){
            this.color="#ffffff";
            this.density=0.0009;
            this.delete = function () {
                scene.fog.density=0;
                renderer.setClearColor( backgroundColor );
                renderer.render( scene, camera );
                EffectGuis.Foggui.hide();
            }
        };
        var FogObject = new controlFog();

        EffectGuis.Foggui = new dat.GUI();
        EffectGuis.Foggui.domElement.parentNode.id = 'fog-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        EffectGuis.Foggui.addColor(FogObject, 'color').onChange(function (e) {
            scene.fog.color.set(FogObject.color);
            //the color variable can not ! use "=",must use the set funtion
            renderer.setClearColor( scene.fog.color );
            renderer.render( scene, camera );
        });

        EffectGuis.Foggui.add(FogObject, 'density',0.0001,0.009).onChange(function (e) {
            scene.fog.density = FogObject.density;
            renderer.render( scene, camera );
        });

        EffectGuis.Foggui.add(FogObject, 'delete');
        IsFogNewed = true;
    }else{
        EffectGuis.Foggui.show();
    }
}
function clearFog() {
    IsFogNewed = false;
    EffectGuis.Foggui.hide();
}

// --------------------------------Grid--------------------------------------
function initGrid(){
    EffectNum =2;
    if(!IsGridNewed){
        gridHelper = new THREE.GridHelper( 1000,10,0x5ae5e3,0x6d6d6d );
        gridHelper.position.y = -20;
        gridHelper.position.x = 0;
        scene.add( gridHelper );
        renderer.render( scene, camera );

        //--------control the position/rotation/range by mouse drag---------

        EffectControls.GridControl = new THREE.TransformControls(camera,renderer.domElement);
        EffectControls.GridControl.attach( gridHelper );
        EffectControls.GridControl.addEventListener( 'change', function () {
            renderer.render( scene, camera );
        } );
        scene.add( EffectControls.GridControl );
        //--------control the position/rotation/range by mouse gui end---------

        var controlGrid = function() {
            this.size = 1000;
            this.division = 10;
            this.colorcenterline = "#5ae5e3";
            this.color = "#6d6d6d";
            this.position = function() {EffectControls.GridControl.setMode( "translate" )};
            this.rotation = function() {EffectControls.GridControl.setMode( "rotate" )};
            this.scale =function() {EffectControls.GridControl.setMode( "scale" )};
            this.delete = function () {
                IsGridNewed = false;
                scene.remove(gridHelper);
                scene.remove(EffectControls.GridControl);
                EffectGuis.GridGui.hide();
                renderer.render(scene,camera);
            }
        };

        var gridObject = new controlGrid();
        EffectGuis.GridGui = new dat.GUI();
        EffectGuis.GridGui.domElement.parentNode.id = 'grid-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");


        EffectGuis.GridGui.add(gridObject, 'size',100,10000).onChange( function (e) {
            gridHelper.size = gridObject.size;
            renderer.render( scene, camera );
        });
        EffectGuis.GridGui.add(gridObject, 'division', 10, 100).onChange( function (e) {
            gridHelper.division = gridObject.division;
            renderer.render( scene, camera );
        });
        EffectGuis.GridGui.addColor(gridObject, 'colorcenterline').onChange( function (e) {
            // gridHelper.colorCenterLine.set(gridObject.colorcenterline);
            //
            // renderer.render( scene, camera );
        });
        EffectGuis.GridGui.addColor(gridObject, 'color').onChange( function (e) {
            // gridHelper.colorGrid.setColors(gridObject.color);
            gridHelper.setColors(gridObject.color)
            renderer.render( scene, camera );
        });

        var transform = EffectGuis.GridGui.addFolder('Transform');
        transform.add(gridObject, 'position');
        transform.add(gridObject, 'rotation');
        transform.add(gridObject, 'scale');

        EffectGuis.GridGui.add(gridObject,'delete');

        IsGridNewed= true;
    }else{
        EffectControls.GridControl.enabled = true;
        EffectControls.GridControl.visible = true;
        EffectGuis.GridGui.show();
    }
}

function clearGrid() {
    IsGridNewed = false;
    EffectControls.GridControl.enabled=false;
    EffectControls.GridControl.visible=false;
    EffectGuis.GridGui.hide();
}

function initGround() {
    EffectNum =3;
    var plane;
    var geometry;
    var material;
    if(!IsGroundNewed){
        geometry = new THREE.PlaneGeometry(80,80,1,1 );
        material = new THREE.MeshBasicMaterial( {color: 0xd5d5d5, side: THREE.DoubleSide} );
        plane = new THREE.Mesh( geometry, material );
        scene.add( plane );
        renderer.render(scene,camera);

        //--------control the position/rotation/range by mouse drag---------
        EffectControls.GroundControl = new THREE.TransformControls(camera,renderer.domElement);
        EffectControls.GroundControl.attach( plane );
        EffectControls.GroundControl.addEventListener( 'change', function () {
            renderer.render( scene, camera );
        } );
        scene.add( EffectControls.GroundControl );
        //--------control the position/rotation/range by mouse gui end---------

        var controlGround = function () {
            this.width = 80;
            this.height = 80;
            this.color = "#d5d5d5";
            this.opacity = 1;
            this.position = function() {EffectControls.GroundControl.setMode( "translate" )};
            this.rotation = function() {EffectControls.GroundControl.setMode( "rotate" )};
            this.scale =function() {EffectControls.GroundControl.setMode( "scale" )};
            this.delete = function () {
                scene.remove(plane);
                scene.remove(EffectControls.GroundControl);
                // EffectControls.GroundControl
                renderer.render( scene, camera );
                EffectGuis.GroundGui.hide();
                IsGroundNewed = false;
            }
        }

        var GroundObject = new controlGround();

        EffectGuis.GroundGui = new dat.GUI();
        EffectGuis.GroundGui.domElement.parentNode.id = 'ground-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        EffectGuis.GroundGui.add(GroundObject, 'width',10,1000).onChange(gernerateGeometry);
        EffectGuis.GroundGui.add(GroundObject, 'height',10,1000).onChange(gernerateGeometry);

        EffectGuis.GroundGui.addColor(GroundObject, 'color').onChange(gernarateMaterial);

        var transform = EffectGuis.GroundGui.addFolder('Transform');
        transform.add(GroundObject, 'position');
        transform.add(GroundObject, 'rotation');
        transform.add(GroundObject, 'scale');

        EffectGuis.GroundGui.add(GroundObject,'delete');

        function gernerateGeometry(){
            updateGroupGeometry(plane, new THREE.PlaneGeometry(
                GroundObject.width,GroundObject.height,1,1
            ))
        }
        function updateGroupGeometry(mesh,geometry) {
            mesh.geometry.dispose();
            // mesh.children[0].geometry = new THREE.WireframeGeometry(geometry);
            mesh.geometry = geometry;
        }

        function gernarateMaterial() {
            updateGroupMaterial(plane,new THREE.MeshBasicMaterial(
                {color:GroundObject.color,side: THREE.DoubleSide}
            ))
        }
        function updateGroupMaterial(mesh,material) {
            mesh.material.dispose();
            // mesh.children[0].geometry = new THREE.WireframeGeometry(geometry);
            mesh.material = material;
        }
        IsGroundNewed = material;
    }else{
        EffectControls.GroundControl.enabled = true;
        EffectControls.GroundControl.visible = true;
        EffectGuis.GroundGui.show();
    }
}

function clearGround() {
    EffectControls.GroundControl.enabled = false;
    EffectControls.GroundControl.visible = false;
    EffectGuis.GroundGui.hide();

}