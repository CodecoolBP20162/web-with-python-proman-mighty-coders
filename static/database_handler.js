/**
 * Created by okocsis90 on 2017.04.04..
 */
function handlingDB() {

    this.saveBoard = function(num) {
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

    this.loadBoards = function() {
        $.ajax({
            url: "/boards",
            type: "GET",
            success: function(response) {
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

    this.removeBoard = function(id) {

        var boardObject = {
            board_id: id
        }
        $.ajax({
            url: "/delete_board",
            type: "POST",
            data: boardObject
        });
    };

    this.editBoard = function(id, title) {

        var boardObject = {
            board_id: id,
            board_title: title
        };

        $.ajax({
            url: "/edit_board",
            type: "POST",
            data: boardObject
        });
    };

    this.saveCard = function(card) {
        var cardObject = {
            card_id: card.attr("id"),
            title: card.html().split('<div')[0],
            parent_board: card.attr("data-parent-board"),
            status: card.attr("data-status"),
            order: card.attr("data-order")
        };

        var boardID = cardObject.parent_board;
        var url = "/details/" + boardID;
        $.ajax({
            url: url,
            type: "POST",
            data: cardObject
        });

    };

    this.orderCards = function(list) {
        list.sort(sort_list);

        function sort_list(a, b) {
            return (b.attr("data-order") < a.attr("data-order")) ? (1) : (-1);
        }
    };

    this.removeCard = function(card) {
        var cardObject = {
            card_id: card.attr("id"),
            parent_board: card.attr("data-parent-board")
        };
        $.ajax({
            url: '/details/delete_card',
            type: "POST",
            data: cardObject
        });
    };



    this.editCard = function(card) {

        var cardObject = {
            id: card.attr("id"),
            parent_board: card.attr("data-parent-board"),
            title: card.html().split('<div')[0],
            status: card.attr("data-status"),
            order: card.attr("data-order")
        };

        $.ajax({
            url: "/details/edit_card",
            type: "POST",
            data: cardObject
        });
    };

    this.appendToStatus = function(arrayName, selector) {
        for (var i = 0; i < arrayName.length; i++) {
            selector.append(arrayName[i]);
        }
    };

    this.loadCards = function(boardID) {

        $.ajax({
            url: "/details/" + boardID + "/cards",
            type: "GET",
            success: function(response) {
                var buttons = '<div class="edit-delete-wrapper" id="card-icons"><span class="glyphicon glyphicon-trash" id="delete_card" title="Delete cards"></span><span class="glyphicon glyphicon-pencil" id="edit_card" title="Edit cards" data-toggle="modal" data-target="#edit_card_modal"></span></div>'
                var newArray = [];
                var progressArray = [];
                var reviewArray = [];
                var doneArray = [];
                var card_json = JSON.parse(response);
                for (var i = 0; i < card_json.length; i++) {
                    var cardObject = card_json[i];
                    var newCard = $(cardTemplate);
                    newCard.attr("id", cardObject.card_id);
                    newCard.attr("data-parent-board", cardObject.parent_board);
                    newCard.attr("data-status", cardObject.status);
                    newCard.attr("data-order", cardObject.order);
                    newCard.html(cardObject.title + buttons);
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
                var list_handler = new handlingDB();
                list_handler.orderCards(newArray);
                list_handler.orderCards(progressArray);
                list_handler.orderCards(reviewArray);
                list_handler.orderCards(doneArray);
                list_handler.appendToStatus(newArray, $("#new"));
                list_handler.appendToStatus(progressArray, $("#in_progress"));
                list_handler.appendToStatus(reviewArray, $("#review"));
                list_handler.appendToStatus(doneArray, $("#done"));

            }
        });
    };
}