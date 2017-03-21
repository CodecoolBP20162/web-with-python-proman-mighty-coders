/**
 * Created by okocsis90 on 2017.03.20..
 */
$(document).ready(function() {
    var boardTemplate = $('<div class="col-sm-4" id="board1"><div class="board"><h3 class="board_title"><input id="title" placeholder="Title"></h3><textarea id="description" placeholder="Description" data-toggle="tooltip" title="The description." rows=1 cols=50 maxlength="120"></textarea><div class="col-sm-1"><button class="button" id="save">Save</button></div></div></div>');
    $('.board').hover(
        function() {
            $(this).addClass('active')
        },
        function() {
            $(this).removeClass('active')
        });
    if (localStorage["board"]) {
        var jsonBoard = localStorage["board"];
        var importBoard = JSON.parse(jsonBoard);
        var newBoard = boardTemplate
        newBoard.children().find('#title').val(importBoard.title);
        newBoard.children().find('#description').val(importBoard.description);
        $(".row").append(newBoard);
    } else { var newBoard = boardTemplate;
        $(".row").append(newBoard) };
    $("#save").click(function() {
        var Board = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value
        };
        var jsonBoard = JSON.stringify(Board);
        localStorage.setItem("board", jsonBoard);
        alert("Saved!")
    });
    $("#new").click(function() {
        var num = parseInt($(".col-sm-4:last").attr("id").match(/(\d+)$/)[0], 10) + 1;
        var newBoard = $(".col-sm-4:last").clone(true, true).prop("id", "board" + num);
        newBoard.children().find('#title').val("");
        newBoard.children().find('#description').val("");
        newBoard.insertAfter(".col-sm-4:last");
        alert("Created!")
    });
});