var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-satus="new" data-order="non">Card title</li>';

var create = function(title) {
    var num;
    if ($(".card")[0]) {
        num = parseInt($(".card:last").attr("id").match(/\d+/)) + 1;
    } else {
        //$("#no_cards").remove();
        num = 1
    }
    if (num < 10) {
        num = "0" + num
    }
    var newCard = $(cardTemplate).prop("id", "card" + num);
    var parentBoard = document.getElementById("boardCardsTitle").innerHTML
    console.log(parentBoard)
    newCard.prop("data-parent-board", parentBoard);
    newCard.attr("data-parent-board", parentBoard)
    $("#new").append(newCard);
    document.getElementById("card" + num).innerHTML = title;
    $(".status_list").sortable("refresh");
    /* var boardDict = {
        board_id: document.getElementById("board" + num).id,
        title_id: document.getElementById("title" + num).id,
        title: document.getElementById("title" + num).innerHTML
    };
    var jsonBoard = JSON.stringify(boardDict);
    localStorage.setItem(document.getElementById("board" + num).id, jsonBoard);*/
};

/*$(document).ready(function() {
    display();
    $('#save_card_button').attr("disabled", "disabled");
});*/

$('#save_card_button').click(function() {
    var title = $('#new_card_title').val();
    create(title);
});

$(function() {
    $("#new, #in_progress, #review, #done").sortable({
        connectWith: ".status_list"
    }).disableSelection();
});

$(function() {
    $("#new, #in_progress, #review, #done").sortable({
        connectWith: ".status_list",
        dropOnEmpty: true
    }).disableSelection();
});