var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-status="new" data-order="none">Card title</li>';
var dataLayerObj = new dataLayer(handlingDB);
var buttons = '<div class="edit-delete-wrapper" id="card-icons"><span class="glyphicon glyphicon-trash" id="delete_card" title="Delete cards"></span><span class="glyphicon glyphicon-pencil" id="edit_card" title="Edit cards" data-toggle="modal" data-target="#edit_card_modal"></span></div>'



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
    dataLayerObj.loadCards("board" + getID());
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

$("#create_card_modal").keypress(function(e) {
    if ($('#new_card_title').val().length > 0) {
        if (e.which == 13) {
            $('#save_card_button').click();
        };
    };
});

$("#edit_card_modal").keypress(function(e) {
    if ($('#edit_card_title').val().length > 0) {
        if (e.which == 13) {
            $('#edit_card_button').click();
        };
    };
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
        dataLayerObj.editCard($(cards[i]));
    }
});

$(document).on("click", "#delete_card", function(event) {
    event.stopPropagation();
    var cardID = $(this).parent().parent().attr('id');
    dataLayerObj.removeCard($("#" + cardID))
    $(".card").remove()
    dataLayerObj.loadCards("board" + getID())
});

$(document).on("click", "#edit_card", function(event) {
    event.stopPropagation();
    var editCardID = $(this).parent().parent().attr('id');
    $("#edit_card_title").val($(this).parent().parent().html().split('<div')[0]);
    $(".modal-body").attr("data-card", editCardID);
});


$('#edit_card_button').click(function() {
    var title = $('#edit_card_title').val();
    var cardID = ($(".modal-body").attr("data-card"))
    $("#" + cardID).html(title + buttons)
    dataLayerObj.editCard($("#" + cardID))

});