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
    $("#button-div").click(function() {
        alert("click");
        var Board = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value
        };
        var jsonBoard = JSON.stringify(Board);
        localStorage.setItem("board", jsonBoard);
        alert("Saved!")
    });
});