/**
 * Created by okocsis90 on 2017.03.20..
 */
$(document).ready(function() {
    $('.board').hover(
        function() {
            $(this).addClass('active')
        },
        function() {
            $(this).removeClass('active')
        });
    if (localStorage["board"]) {
        var jsonBoard = localStorage["board"];
        var board = JSON.parse(jsonBoard);
        document.getElementById("title").value = board.title;
        document.getElementById("description").value = board.description;
    };
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
        var num = parseInt($(".board:last").attr("id").match(/(\d+)$/)[0], 10) + 1;
        var newBoard = $(".board:last").clone(true, true).prop("id", "board" + num);
        newBoard.find('#title').val("");
        newBoard.find('#description').val("");
        newBoard.insertAfter(".board:last");
        alert("Created!")
    });
});