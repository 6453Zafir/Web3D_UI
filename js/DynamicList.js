/**
 * Created by admin on 2017/5/19.
 */
$(document).ready(function(){

    var currentElememt;
    var FolderNum = 0;

    $("#browser").treeview({
        toggle: function() {
            console.log("%s was toggled.", $(this).find(">span").text());
        }
    });

    $("#add").click(function() {
        FolderNum += 1;
        var branches = $("<li><span class='folder' id='Folder'+FolderNum>New Folder</span><ul>" +
            "<li><span class='file'>New Item</span></li>").appendTo("#browser");
        $("#browser").treeview({
            add: branches
        });
    });

    $(".file,.folder").on("dblclick",function (e) {
        var buttonGroup = $("#buttonGroup");
        if(buttonGroup!=null){
            buttonGroup.remove();
        }
        currentElememt = $( event.target );

        var x = e.pageX +20+ 'px';
        var y = e.pageY -20+ 'px';
        $("#button-group").css({
            "display":"block",
            "position": "absolute",
            "left": x,
            "top": y
        });
    });

    $(document).on('dblclick', '.file, .folder', function (e) {
        var buttonGroup = $("#buttonGroup");
        if (buttonGroup != null) {
            buttonGroup.remove();
        }
        currentElememt = $(event.target);

        var x = e.pageX + 20 + 'px';
        var y = e.pageY -40 + 'px';
        $("#button-group").css({
            "display": "block",
            "position": "absolute",
            "left": x,
            "top": y
        });
    });

    $("#edit").on('click',function () {
        currentElememt.attr("contentEditable","true");
    })
    $("#delete").on('click',function () {
        currentElememt.parent().remove();
        $("#button-group").css({
            "display":"none",
        });
    })
    $("#conform").on('click',function () {
        currentElememt.attr("contentEditable","false");
        $("#button-group").css({
            "display":"none",
        });

    })
    $("#addchild").on('click',function () {
        if(currentElememt.hasClass("folder")){
            var newChild = $("<li><span class='file'>New Item</span></li>").appendTo(currentElememt.next());

        }else if(currentElememt.hasClass("file")){
            currentElememt.removeClass("file");
            currentElememt.addClass("folder");
            var newChild = $("<ul><li><span class='file'>New Item</span></li> </ul>").appendTo(currentElememt.parent());
        }
    })
});