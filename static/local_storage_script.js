/**
 * Created by okocsis90 on 2017.03.20..
 */
$(document).ready(function() {
    if (localStorage["board"]) {
        var board = localStorage["board"];
        document.getElementById("board1").value = board;
    } else {
        document.getElementById("board1").placeholder = "board 1 text";
    };

    document.getElementById("save").addEventListener("click", function() {
        var board = document.getElementById("board1").value;
        localStorage.setItem("board", board);
        alert("board saved");
    }, false);
});