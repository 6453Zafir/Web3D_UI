/**
 * Created by admin on 2017/5/4.
 */
function layoutController() {
    // $("#canvasArea").load("FullScreenLayout.html");
    $("#template1").on("click", function() {
        LayoutNum = 1;
        $('#myModal').modal('hide');
        basicLayout();
    })
    $("#template2").on("click", function() {
        LayoutNum=2;
        $('#myModal').modal('hide');
        FullLayout();
    })
    $("#template3").on("click", function() {
        LayoutNum=3;
        $('#myModal').modal('hide');
    })
}

function basicLayout() {

    var html = [
        '<div class="ListArea">',
        '<button class="btn btn-default addItemButton">+</button>',
        '</div>'
    ].join("\n");
    $("#canvasArea").prepend(html);
    $("#moduleArea").removeClass("moduleArea");
    $("#moduleArea").addClass("HalfModuleArea");
    renderEasyModel()
    backgroundController();
}
function FullLayout() {
    $("#moduleArea").removeClass("HalfModuleArea");
    $("#moduleArea").addClass("moduleArea");

}
function mapLayout() {

}