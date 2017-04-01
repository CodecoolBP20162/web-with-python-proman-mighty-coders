var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-status="new" data-order="non">Card title</li>';
var proxyObject = new dataLayer(handlingLocalStorage);


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
        };
    };
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
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes(getID())) {
                var importBoard = JSON.parse(localStorage.getItem(localStorage.key(i)));
                var cards = JSON.parse(importBoard.cards);
                cards.push(JSON.stringify(cardObject));
                cards = JSON.stringify(cards);
                importBoard.cards = cards;
                localStorage.setItem("board" + getID(), JSON.stringify(importBoard));
            };
        };
    };

    this.orderCards = function(list) {
        list.sort(sort_list);

        function sort_list(a, b) {
            return (b.attr("data-order") < a.attr("data-order")) ? (1) : (-1);
        }
    };

    this.removeCard = function(card) {
        for (var z = 0; z < localStorage.length; z++) {
            if (localStorage.key(z).includes(getID())) {
                var importBoard = localStorage.getItem(localStorage.key(z));
                var importBoard = JSON.parse(importBoard);
                var cards = JSON.parse(importBoard.cards)
                for (var i = 0; i < cards.length; i++) {
                    cards[i] = JSON.parse(cards[i]);
                };
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].card_id === card.attr("id")) {
                        cards.splice(i, 1)
                    };
                };
                for (var i = 0; i < cards.length; i++) {
                    cards[i] = JSON.stringify(cards[i]);
                };
                importBoard.cards = JSON.stringify(cards)
                localStorage.setItem("board" + getID(), JSON.stringify(importBoard));
            };
        };
    };

    this.load = function() {
        var newArray = []
        var progressArray = []
        var reviewArray = []
        var doneArray = []
        for (var z = 0; z < localStorage.length; z++) {
            if (localStorage.key(z).includes(getID())) {
                var importBoard = localStorage.getItem(localStorage.key(z));
                var importBoard = JSON.parse(importBoard);
                var cards = JSON.parse(importBoard.cards)
                for (var i = 0; i < cards.length; i++) {
                    var cardObject = JSON.parse(cards[i]);
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
            this.orderCards(newArray);
            this.orderCards(progressArray);
            this.orderCards(reviewArray);
            this.orderCards(doneArray);
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
        };
    };
};



function dataLayer(currentObject) {
    this.imp = new currentObject();
    this.save = function(card) {
        this.imp.save(card)
    };
    this.load = function() {
        this.imp.load()
    };
    this.removeCard = function(card) {
        this.imp.removeCard(card)
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
    proxyObject.save($("#card" + num));
};


var display = function() {
    proxyObject.load();
};


$(document).ready(function() {
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
    cards = this.getElementsByClassName("card");
    for (var i = 0; i < cards.length; ++i) {
        card = $(cards[i])
        card.attr('data-order', i + 1)
        card.attr('data-status', this.id);
        proxyObject.removeCard($(cards[i]))
        proxyObject.save($(cards[i]));
    };
});

formatTitle();