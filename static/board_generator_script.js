/**
 * Created by okocsis90 on 2017.03.20..
 */

var boardTemplate = '<div class="col-sm-3" id="board0" data-cards="null"><div class="board"><h3 class="board_title" id ="title">Project title</h3></div></div>';
var dataLayerObj = new dataLayer(handlingDB);

var create = function(title) {
    var num;
    if ($(".board")[0]) {
        num = parseInt($(".col-sm-3:last").attr("id").match(/\d+/)) + 1;
    } else {
        $("#no_boards").remove();
        num = 1
    }
    if (num < 10) {
        num = "0" + num
    }
    var newBoard = $(boardTemplate).prop("id", "board" + num);
    newBoard.children().find('#title').prop("id", "title" + num);
    var card_list = [];
    newBoard.attr("data-cards", JSON.stringify(card_list));
    $("#board_row").append(newBoard);
    document.getElementById("title" + num).innerHTML = title;
    dataLayerObj.saveBoard(num);
};

var display = function() {
    dataLayerObj.loadBoards();
};

$(document).ready(function() {
    display();
    $('#save_board_button').attr("disabled", "disabled");
});

$('.modal').on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
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
    var boardID = $(this).parent().attr('id');
    boardID = boardID.replace('board', '');
    location.href = '/details/' + boardID;
});