/**
 * Created by okocsis90 on 2017.03.20..
 */
$(document).ready(function() {
    var boardTemplate = '<div class="col-sm-4" id="board0"><div class="board"><h3 class="board_title" id ="title">Project title</h3></div></div>';
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            var importBoard = localStorage.getItem(localStorage.key(i))
            var jsonBoard = JSON.parse(importBoard);
            var newBoard = $(boardTemplate).prop("id", jsonBoard.board_id);
            newBoard.children().find('#title').prop("id", jsonBoard.title_id);
            $("#board_row").append(newBoard);
            document.getElementById(jsonBoard.title_id).innerHTML = jsonBoard.title;
        };
    } else {
        $("#board_row").append('<div class="col-sm-12" id="no_boards">There are no boards in the system. Start working NOW!</div>');
    };

    $(".circle").click(function() {
        if ($(".board")[0]) {
            var num = parseInt($(".col-sm-4:last").attr("id").match(/(\d+)$/)[0], 10) + 1;
            var newBoard = $(boardTemplate).prop("id", "board" + num);
            newBoard.children().find('#title').prop("id", "title" + num);
            $("#board_row").append(newBoard);
            var title = window.prompt("Please give the board title:");
            document.getElementById("title" + num).innerHTML = title;
            var boardDict = {
                board_id: document.getElementById("board" + num).id,
                title_id: document.getElementById("title" + num).id,
                title: document.getElementById("title" + num).innerHTML
            }
            var jsonBoard = JSON.stringify(boardDict);
            localStorage.setItem(document.getElementById("board" + num).id, jsonBoard);
        } else {
            $("#no_boards").remove();
            var newBoard = $(boardTemplate).prop("id", "board" + 1);
            newBoard.children().find('#title').prop("id", "title" + 1);
            $("#board_row").append(newBoard);
            var title = window.prompt("Please give the board title:");
            document.getElementById("title" + 1).innerHTML = title;
            var boardDict = {
                board_id: document.getElementById("board" + 1).id,
                title_id: document.getElementById("title" + 1).id,
                title: document.getElementById("title" + 1).innerHTML
            };
            var jsonBoard = JSON.stringify(boardDict);
            localStorage.setItem(document.getElementById("board" + 1).id, jsonBoard);
        };
    });

});