/**
 * Created by admin on 2017/5/4.
 */
function layoutController() {
    $("#canvasArea").load("FullScreenLayout.html");
    $("#template1").on("click", function() {
        LayoutNum=1;
        $('#myModal').modal('hide');
        // $("#canvasArea").load("FullScreenLayout.html");
    })
    $("#template2").on("click", function() {
        LayoutNum=2;
        $('#myModal').modal('hide');
        // $("#canvasArea").load("BasicLayout.html");
    })
    $("#template3").on("click", function() {
        LayoutNum=3;
        $('#myModal').modal('hide');
        // $("#canvasArea").load("BasicLayout.html");
    })
}

function basicLayout() {
    
}
function FullLayout() {

}
function mapLayout() {

}