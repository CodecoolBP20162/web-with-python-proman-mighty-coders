/**
 * Created by okocsis90 on 2017.03.20..
 */
$(document).ready(function() {
    var boardTemplate = '<div class="col-sm-4" id="board0"><div class="board"><h3 class="board_title">Project title</h3></div></div>';
    if (localStorage["boards"]) {
        var jsonBoard = localStorage["boards"];
        var importBoard = JSON.parse(jsonBoard);
        var newBoard = boardTemplate;
        newBoard.children().find('.board_title').val(importBoard.title);
        $("#board_row").append(newBoard);
    } else {
        if ($(".board")[0]) {
            var newBoard = boardTemplate;
            $("#board_row").append(newBoard);
        } else {
            $("#board_row").append('<div class="col-sm-12" id="no_boards">There are no boards in the system. Start working now!</div>');
        };
    };

    // $(document).on("click", "#save", function() {
    //     alert("Click");
    //     var Board = {
    //         title: $(this).parents().find('.board_title').html(),
    //     };
    //     var jsonBoard = JSON.stringify(Board);
    //     localStorage.setItem("board", jsonBoard);
    //     alert("Saved!");
    //
    // });

    $(".circle").click(function() {
        if ($(".board")[0]) {
            var num = parseInt($(".col-sm-4:last").attr("id").match(/(\d+)$/)[0], 10) + 1;
            var newBoard = $(boardTemplate).prop("id", "board" + num);
            $("#board_row").append(newBoard);
        } else {
            $("#no_boards").remove();
            var newBoard = $(boardTemplate).prop("id", "board" + 1);
            $("#board_row").append(newBoard);
        }
        alert("Created!");
    });

});