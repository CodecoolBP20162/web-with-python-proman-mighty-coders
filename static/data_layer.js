/**
 * Created by okocsis90 on 2017.03.31..
 */
function handlingLocalStorage() {

    this.saveBoard = function (num) {
        var boardObject = {
            board_id: document.getElementById("board" + num).id,
            title_id: document.getElementById("title" + num).id,
            title: document.getElementById("title" + num).innerHTML,
            cards: $("#board" + num).attr("data-cards")
        };
        var jsonBoard = JSON.stringify(boardObject);
        localStorage.setItem(document.getElementById("board" + num).id, jsonBoard);
    };

    this.loadBoards = function () {
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).includes("board")) {
                    var importBoard = localStorage.getItem(localStorage.key(i));
                    var jsonBoard = JSON.parse(importBoard);
                    var newBoard = $(boardTemplate).prop("id", jsonBoard.board_id);
                    newBoard.attr("data-cards", jsonBoard.cards);
                    newBoard.children().find('#title').prop("id", jsonBoard.title_id);
                    $("#board_row").append(newBoard);
                    document.getElementById(jsonBoard.title_id).innerHTML = jsonBoard.title;
                }
            }
        } else {
            $("#board_row").append('<div class="col-sm-12" id="no_boards"><div class="alert alert-info"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>There are no boards in the system. Start working NOW!</div></div>');
        }
    };

    this.saveCard = function (card) {
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

    this.loadCards = function () {
        var newArray = [];
        var progressArray = [];
        var reviewArray = [];
        var doneArray = [];
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
                    }
                }
            }
            this.orderCards(newArray);
            this.orderCards(progressArray);
            this.orderCards(reviewArray);
            this.orderCards(doneArray);
            for (var i = 0; i < newArray.length; i++) {
                $("#new").append(newArray[i]);
            }
            for (var i = 0; i < progressArray.length; i++) {
                $("#in_progress").append(progressArray[i]);
            }
            for (var i = 0; i < reviewArray.length; i++) {
                $("#review").append(reviewArray[i]);
            }
            for (var i = 0; i < doneArray.length; i++) {
                $("#done").append(doneArray[i]);
            }
        } else {
            $("#boardCardsTitle").append('<div class="col-sm-12" id="no_cards">There are no cards in this board. Start working NOW!</div>');
        }
    };

    this.orderCards = function (list) {
        list.sort(sort_list);

        function sort_list(a, b) {
            return (b.attr("data-order") < a.attr("data-order")) ? (1) : (-1);
        }
    };
}

function dataLayer(currentObject) {
    this.imp = new currentObject();
    this.saveBoard = function (num) {
        this.imp.saveBoard(num)
    };
    this.loadBoards = function () {
        this.imp.loadBoards()
    };
    this.saveCard = function (card) {
        this.imp.saveCard(card)
    };
    this.loadCards = function () {
        this.imp.loadCards()
    };
}
