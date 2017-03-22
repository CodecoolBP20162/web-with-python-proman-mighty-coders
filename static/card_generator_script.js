var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-sattus="new" data-order="non">Card title</li>';

var refresSortable = function() {
    $(function() {
        $("#new, #in_progress, #review, #done").sortable({
            connectWith: ".status_list"
        }).disableSelection();
    });
}


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
    var parentBoard = document.getElementsByClassName("boardCardsTitle").innerHTML
    newCard.prop("data-parent-board", parentBoard);
    $("#new").append(newCard);
    refresSortable()
    document.getElementById("card" + num).innerHTML = title;
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

refresSortable()