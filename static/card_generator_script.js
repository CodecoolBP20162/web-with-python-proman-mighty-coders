var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-status="new" data-order="non">Card title</li>';

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

var saveCardToLocal = function(card) {
    var cardObject = {
        card_id: card.attr("id"),
        title: card.html(),
        parent_board: card.attr("data-parent-board"),
        status: card.attr("data-status"),
        order: card.attr("data-order")
    };
    var jsonCard = JSON.stringify(cardObject);
    localStorage.setItem(cardObject.parent_board.substring(5, 7) + cardObject.card_id, jsonCard);
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
    var parentBoard = getID();
    newCard.attr("data-parent-board", parentBoard);
    $("#new").append(newCard);
    document.getElementById("card" + num).innerHTML = title;
    $(".status_list").sortable("refresh");
    saveCardToLocal($("#card" + num));
};

/*var display = function() {
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes(getID().substring(5, 7))) {
                var importCard = localStorage.getItem(localStorage.key(i));
                var cardObject = JSON.parse(importBoard);
                var newCard = $(cardTemplate);
                newCard.attr("id", cardObject.card_id);
                newCard.attr("id", cardObject.card_id)
                newBoard.children().find('#title').prop("id", jsonBoard.title_id);
                $("#board_row").append(newBoard);
                document.getElementById(jsonBoard.title_id).innerHTML = jsonBoard.title;
            }
        }
    } else {
        $("#board_row").append('<div class="col-sm-12" id="no_boards">There are no boards in the system. Start working NOW!</div>');
    }
};*/


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
        card = $(cards[i])
        card.attr('data-status', this.id);
        parent_board = card.attr('data-parent-board').substring(5, 7) + card.attr('id')
        localStorage.removeItem(card.attr('data-parent-board').substring(5, 7) + card.attr('id'));
        saveCardToLocal($(cards[i]));
        console.log(cards[i].getAttribute("data-status"));
    };
});

formatTitle()