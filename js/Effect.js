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

// var EffectControls=new Array(GridControl,GroundControl);

var FogGui;

var gridHelper;
var GridGui;

var GroundGui;

function initFog() {
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
                Foggui.hide();
            }
        };
        var FogObject = new controlFog();

        Foggui = new dat.GUI();
        Foggui.domElement.parentNode.id = 'fog-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        Foggui.addColor(FogObject, 'color').onChange(function (e) {
            scene.fog.color.set(FogObject.color);
            //the color variable can not ! use "=",must use the set funtion
            renderer.setClearColor( scene.fog.color );
            renderer.render( scene, camera );
        });

        Foggui.add(FogObject, 'density',0.0001,0.009).onChange(function (e) {
            scene.fog.density = FogObject.density;
            renderer.render( scene, camera );
        });

        Foggui.add(FogObject, 'delete');
        IsFogNewed = true;
    }else{
        Foggui.show();
    }
}
function clearFog() {
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

function initGround() {
    var plane;
    var geometry;
    var material;
    if(!IsGroundNewed){
        geometry = new THREE.PlaneGeometry(300,300,1,1 );
        material = new THREE.MeshBasicMaterial( {color: 0xd5d5d5, side: THREE.DoubleSide} );
        plane = new THREE.Mesh( geometry, material );
        scene.add( plane );
        renderer.render(scene,camera);

        //--------control the position/rotation/range by mouse drag---------
        GroundControl = new THREE.TransformControls(camera,renderer.domElement);
        GroundControl.attach( plane );
        GroundControl.addEventListener( 'change', function () {
            renderer.render( scene, camera );
        } );
        scene.add( GroundControl );
        //--------control the position/rotation/range by mouse gui end---------

        var controlGround = function () {
            this.width = 300;
            this.height = 300;
            this.color = "#d5d5d5";
            this.opacity = 1;
            this.position = function() {GroundControl.setMode( "translate" )};
            this.rotation = function() {GroundControl.setMode( "rotate" )};
            this.scale =function() {GroundControl.setMode( "scale" )};
            this.delete = function () {
                scene.remove(plane);
                GroundControl.visible=false;
                renderer.render( scene, camera );
                GroundGui.hide();
                IsGroundNewed = false;
            }
        }

        var GroundObject = new controlGround();

        GroundGui = new dat.GUI();
        GroundGui.domElement.parentNode.id = 'ground-controller';

        $(".dg.ac").appendTo("#moduleArea");
        $(".dg.ac").css("position","absolute");
        $(".dg.ac").css("top","15px");

        GroundGui.add(GroundObject, 'width',10,10000).onChange(gernerateGeometry);
        GroundGui.add(GroundObject, 'height',10,10000).onChange(gernerateGeometry);

        GroundGui.addColor(GroundObject, 'color').onChange(gernarateMaterial);

        var transform = GroundGui.addFolder('Transform');
        transform.add(GroundObject, 'position');
        transform.add(GroundObject, 'rotation');
        transform.add(GroundObject, 'scale');

        GroundGui.add(GroundObject,'delete');

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
        GroundControl.visible = true;
        GroundGui.show();
    }
}

function clearGround() {
    GroundControl.visible = false;
    GroundGui.hide();

}