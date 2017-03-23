var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data_status="new" data_order="non">Card title</li>';

var getID = function() {
    var titleData = document.getElementById("boardData").innerHTML;
    var boardID = titleData.substring(0, titleData.indexOf('%'));
    return boardID
};

var formatTitle = function() {
    var forDelete = getID() + '%'
    var titleData = document.getElementById("boardData").innerHTML;
    var newTitle = titleData.replace(forDelete, "");
    document.getElementById("boardCardsTitle").innerHTML = newTitle;
};

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
    var parentBoard = getID()
    newCard.attr("data-parent-board", parentBoard);
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


$(document).ready(function() {
    //display();
    $('#save_card_button').attr("disabled", "disabled");
});

$('#save_card_button').click(function() {
    var title = $('#new_card_title').val();
    create(title);
});

$('#new_card_title').keydown(function() {
    if ($('#new_card_title').val().length > 0) {

        $('#save_card_button').removeAttr("disabled");
    }
});

$("#create_card_modal").on("hidden.bs.modal", function() {
    $('#new_card_title').val('');
    $('#save_card_button').attr("disabled", "disabled");
});

$(function() {
    $("#new, #in_progress, #review, #done").sortable({
        connectWith: ".status_list"
    }).disableSelection();
});

$(".status_list").sortable().droppable().on('sortreceive', function() {
    cards = this.getElementsByClassName("card");
    for (var i = 0; i < cards.length; ++i) {
        document.getElementById(cards[i].id).data_status = this.id;
        card = document.getElementById(cards[i].id)
        console.log(card.data_status)
    };

});

formatTitle()