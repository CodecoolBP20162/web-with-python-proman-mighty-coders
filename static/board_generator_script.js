/**
 * Created by okocsis90 on 2017.03.20..
 */

var boardTemplate = '<div class="col-sm-4" id="board0"><div class="board"><h3 class="board_title" id ="title">Project title</h3></div></div>';
var proxyObject = new Proxy(handlingLocalStorage);


function handlingLocalStorage() {
    this.save = function (num) {
        var boardObject = {
            board_id: document.getElementById("board" + num).id,
            title_id: document.getElementById("title" + num).id,
            title: document.getElementById("title" + num).innerHTML
        };
        var jsonBoard = JSON.stringify(boardObject);
        localStorage.setItem(document.getElementById("board" + num).id, jsonBoard);
    };

    this.load = function () {
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).includes("board")) {
                    var importBoard = localStorage.getItem(localStorage.key(i));
                    var jsonBoard = JSON.parse(importBoard);
                    var newBoard = $(boardTemplate).prop("id", jsonBoard.board_id);
                    newBoard.children().find('#title').prop("id", jsonBoard.title_id);
                    $("#board_row").append(newBoard);
                    document.getElementById(jsonBoard.title_id).innerHTML = jsonBoard.title;
                }
            }
        } else {
            $("#board_row").append('<div class="col-sm-12" id="no_boards">There are no boards in the system. Start working NOW!</div>');
        }
    };
}

function Proxy(currentObject) {
    this.imp = new currentObject();
    this.proxySave = function(num) {
        this.imp.save(num)
    };
    this.proxyLoad = function() {
        this.imp.load()
    };
}

var create = function(title) {
    var num;
    if ($(".board")[0]) {
        num = parseInt($(".col-sm-4:last").attr("id").match(/\d+/)) + 1;
    } else {
        $("#no_boards").remove();
        num = 1
    }
    if (num < 10) {
        num = "0" + num
    }
    var newBoard = $(boardTemplate).prop("id", "board" + num);
    newBoard.children().find('#title').prop("id", "title" + num);
    $("#board_row").append(newBoard);
    document.getElementById("title" + num).innerHTML = title;
    proxyObject.proxySave(num);
};

var display = function() {
    proxyObject.proxyLoad();
};

$(document).ready(function() {
    display();
    $('#save_board_button').attr("disabled", "disabled");
});

$('#save_board_button').click(function() {
    var title = $('#new_board_title').val();
    create(title);
});

$('#new_board_title').keydown(function() {
    if ($('#new_board_title').val().length > 0) {

        $('#save_board_button').removeAttr("disabled");
    }
});

$("#create_board_modal").on("hidden.bs.modal", function() {
    $('#new_board_title').val('');
    $('#save_board_button').attr("disabled", "disabled");
});

$(document).on("click", ".board", function() {
    var boardTitle = $(this).text();
    var boardID = $(this).parent().attr('id');
    location.href = '/details/' + boardID + "%" + boardTitle;
});