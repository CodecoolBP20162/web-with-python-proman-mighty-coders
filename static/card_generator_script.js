var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-status="new" data-order="none">Card title</li>';
var buttons = '<div class="edit-delete-wrapper" id="card-icons"><span class="glyphicon glyphicon-trash" id="delete_card" title="Delete cards"></span><span class="glyphicon glyphicon-pencil" id="edit_card" title="Edit cards"></span></div>'
var dataLayerObj = new dataLayer(handlingLocalStorage);


var getID = function() {
    var titleData = window.location.pathname;
    var boardID = titleData.slice(9);
    return boardID
};

var formatTitle = function() {
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes(getID())) {
            var importBoard = JSON.parse(localStorage.getItem(localStorage.key(i)));
            document.getElementById("boardCardsTitle").innerHTML = importBoard.title
        }
    }
};

var searchMaxId = function(element, checkNumberFrom) {
    var allElements = document.getElementsByClassName(element);
    var maxId = 0;
    for (var i = 0; i < allElements.length; i++) {
        var currentId = parseInt(allElements.item(i).id.substring(checkNumberFrom));
        if (currentId > maxId) {
            maxId = currentId;
        }
    }
    return maxId
};

var create = function(title) {
    var num;
    var order;
    if ($(".card")[0]) {
        var maxId = searchMaxId("card", 4);
        num = maxId + 1;
        order = parseInt($("#new").children().last().attr("data-order")) + 1;
    } else {
        $("#no_cards").remove();
        num = 1;
        order = 1;
    }
    if (num < 10) {
        num = "0" + num;
    }
    var newCard = $(cardTemplate);
    newCard.attr("id", "card" + num);
    newCard.attr("data-order", order);
    var parentBoard = getID();
    newCard.attr("data-parent-board", parentBoard);
    newCard.html(title + buttons);
    $("#new").append(newCard);
    $(".status_list").sortable("refresh");
    dataLayerObj.saveCard($("#card" + num));
};

var display = function() {
    dataLayerObj.loadCards();
};

$(document).ready(function() {
    formatTitle();
    display();
    $('#save_card_button').attr("disabled", "disabled");
});

$('.modal').on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
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

$(".status_list").sortable().droppable().on('sortreceive sortstop', function() {
    var cards = this.getElementsByClassName("card");
    for (var i = 0; i < cards.length; ++i) {
        var card = $(cards[i]);
        card.attr('data-order', i + 1);
        card.attr('data-status', this.id);
        dataLayerObj.removeCard($(cards[i]));
        dataLayerObj.saveCard($(cards[i]));
    }
});

$(document).on("click", "#delete_card", function(event) {
    event.stopPropagation();
    var cardID = $(this).parent().parent().attr('id');
    console.log(cardID)
    dataLayerObj.removeCard($("#" + cardID))
    $(".card").remove()
    dataLayerObj.loadCards()
});