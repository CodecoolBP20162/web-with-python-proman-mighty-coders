var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-status="new" data-order="non">Card title</li>';
var proxyObject = new Proxy(handlingLocalStorage);


var getID = function() {
    var titleData = document.getElementById("boardData").innerHTML;
    var boardID = titleData.substring(0, titleData.indexOf('%'));
    return boardID
};

var formatTitle = function() {
    var forDelete = getID() + '%';
    var titleData = document.getElementById("boardData").innerHTML;
    var newTitle = titleData.replace(forDelete, "");
    document.getElementById("boardCardsTitle").innerHTML = newTitle;
};

var orderCards = function(list) {
    list.sort(sort_list);

    function sort_list(a, b) {
        return (parseInt(b["data-order"]) < parseInt(a["data-order"])) ? 1 : -1;
    }
};


function handlingLocalStorage() {
    this.save = function(card) {
        var cardObject = {
            card_id: card.attr("id"),
            title: card.html(),
            parent_board: card.attr("data-parent-board"),
            status: card.attr("data-status"),
            order: card.attr("data-order")
        };
        var jsonCard = JSON.stringify(cardObject);
        localStorage.setItem(cardObject.parent_board.substring(5, 7) + cardObject.card_id, jsonCard);
    };

    this.load = function() {
        newArray = []
        progressArray = []
        reviewArray = []
        doneArray = []
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).includes(getID().substring(5, 7) + "card")) {
                    var importCard = localStorage.getItem(localStorage.key(i));
                    var cardObject = JSON.parse(importCard);
                    var newCard = $(cardTemplate);
                    newCard.attr("id", cardObject.card_id);
                    newCard.attr("data-parent-board", cardObject.parent_board);
                    newCard.attr("data-status", cardObject.status);
                    newCard.attr("data-order", cardObject.order);
                    newCard.html(cardObject.title);
                    if (newCard.attr("data-status") === "new") {
                        newArray.push(newCard);
                    } else if (newCard.attr("data-status") === "in_progress") {
                        progressArray.push(newCard);
                    } else if (newCard.attr("data-status") === "review") {
                        reviewArray.push(newCard);
                    } else if (newCard.attr("data-status") === "done") {
                        doneArray.push(newCard);
                    };
                };
            };
            orderCards(newArray);
            orderCards(progressArray);
            orderCards(reviewArray);
            orderCards(doneArray);
            for (var i = 0; i < newArray.length; i++) {
                $("#new").append(newArray[i]);
            };
            for (var i = 0; i < progressArray.length; i++) {
                $("#in_progress").append(progressArray[i]);
            };
            for (var i = 0; i < reviewArray.length; i++) {
                $("#review").append(reviewArray[i]);
            };
            for (var i = 0; i < doneArray.length; i++) {
                $("#done").append(doneArray[i]);
            };
        } else {
            $("#boardCardsTitle").append('<div class="col-sm-12" id="no_cards">There are no cards in this board. Start working NOW!</div>');
        };
    }
}

function Proxy(currentObject) {
    this.imp = new currentObject();
    this.proxySave = function(card) {
        this.imp.save(card)
    };
    this.proxyLoad = function() {
        this.imp.load()
    };
}


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
        num = 1
        order = 1
    }
    if (num < 10) {
        num = "0" + num
    }
    var newCard = $(cardTemplate);
    newCard.attr("id", "card" + num);
    newCard.attr("data-order", order);
    var parentBoard = getID();
    newCard.attr("data-parent-board", parentBoard);
    newCard.html(title);
    $("#new").append(newCard);
    $(".status_list").sortable("refresh");
    proxyObject.proxySave($("#card" + num));
};


var display = function() {
    proxyObject.proxyLoad();
};


$(document).ready(function() {
    display();
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

$(".status_list").sortable().droppable().on('sortreceive sortstop', function() {
    cards = this.getElementsByClassName("card");
    for (var i = 0; i < cards.length; ++i) {
        card = $(cards[i])
        card.attr('data-order', i + 1)
        card.attr('data-status', this.id);
        console.log(card.attr('data-order'))
        parent_board = card.attr('data-parent-board').substring(5, 7) + card.attr('id')
        localStorage.removeItem(card.attr('data-parent-board').substring(5, 7) + card.attr('id'));
        proxyObject.proxySave($(cards[i]));
        console.log(cards[i].getAttribute("data-status"));
    };
});

formatTitle();