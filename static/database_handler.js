/**
 * Created by okocsis90 on 2017.04.04..
 */
function handlingDB() {

    this.saveBoard = function (num) {
        var boardObject = {
            board_id: document.getElementById("board" + num).id,
            title_id: document.getElementById("title" + num).id,
            title: document.getElementById("title" + num).innerHTML,
            cards: $("#board" + num).attr("data-cards")
        };
        $.ajax({
            url: "/",
            type: "POST",
            data: boardObject
        });
    };

    this.loadBoards = function () {
        $.ajax({
            url: "/boards",
            type: "GET",
            success: function (response) {
                var response_json = JSON.parse(response);
                for (var i = 0; i < response_json.length; i++) {
                    var jsonBoard = response_json[i];
                    var newBoard = $(boardTemplate).prop("id", jsonBoard.board_id);
                    newBoard.attr("data-cards", jsonBoard.cards);
                    newBoard.children().find('#title').prop("id", jsonBoard.title_id);
                    $("#board_row").append(newBoard);
                    document.getElementById(jsonBoard.title_id).innerHTML = jsonBoard.title;
                }
            }
        });
    };

    this.saveCard = function (card) {
        var cardObject = {
            card_id: card.attr("id"),
            title: card.html(),
            parent_board: card.attr("data-parent-board"),
            status: card.attr("data-status"),
            order: card.attr("data-order")
        };

        var boardID = cardObject.parent_board;
        var url = "/details/" + boardID;
        $.ajax({
            url: url,
            type: "POST",
            data: cardObject,
            success: function (response) {
                alert('OK');
            }
        });

    };

    this.orderCards = function (list) {
        list.sort(sort_list);

        function sort_list(a, b) {
            return (b.attr("data-order") < a.attr("data-order")) ? (1) : (-1);
        }
    };

    this.removeCard = function (card) {
        for (var z = 0; z < localStorage.length; z++) {
            if (localStorage.key(z).includes(getID())) {
                var importBoard = localStorage.getItem(localStorage.key(z));
                var importBoard = JSON.parse(importBoard);
                var cards = JSON.parse(importBoard.cards);
                for (var i = 0; i < cards.length; i++) {
                    cards[i] = JSON.parse(cards[i]);
                }
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].card_id === card.attr("id")) {
                        cards.splice(i, 1)
                    }
                }
                for (var i = 0; i < cards.length; i++) {
                    cards[i] = JSON.stringify(cards[i]);
                }
                importBoard.cards = JSON.stringify(cards);
                localStorage.setItem("board" + getID(), JSON.stringify(importBoard));
            }
        }
    };

    this.appendToStatus = function (arrayName, selector) {
        for (var i = 0; i < arrayName.length; i++) {
            selector.append(arrayName[i]);
        }
    };

    this.loadCards = function () {
        var id = location.href.slice(-2);
        var boardID = {
            boardId: "board" + id
        };
        $.ajax({
            url: "/cards",
            type: "POST",
            data: boardID,
            success: function (response) {
                var newArray = [];
                var progressArray = [];
                var reviewArray = [];
                var doneArray = [];
                var cards = JSON.parse(response);
                for (var i = 0; i < cards.length; i++) {
                    var cardObject = cards[i];
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
                    }
                }
                var dbInstance = new handlingDB();
                dbInstance.orderCards(newArray);
                dbInstance.orderCards(progressArray);
                dbInstance.orderCards(reviewArray);
                dbInstance.orderCards(doneArray);
                dbInstance.appendToStatus(newArray, $("#new"));
                dbInstance.appendToStatus(progressArray, $("#in_progress"));
                dbInstance.appendToStatus(reviewArray, $("#review"));
                dbInstance.appendToStatus(doneArray, $("#done"));
            }
        })
    };
}
