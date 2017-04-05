/**
 * Created by okocsis90 on 2017.04.02..
 */

function dataLayer(currentObject) {
    this.imp = new currentObject();
    this.saveCard = function(card) {
        this.imp.saveCard(card)
    };
    this.loadCards = function(boardID) {
        this.imp.loadCards(boardID)

    };
    this.removeCard = function(card) {
        this.imp.removeCard(card)
    };
    this.saveBoard = function(num) {
        this.imp.saveBoard(num)
    };

    this.loadBoards = function() {
        this.imp.loadBoards()
    };

    this.removeBoard = function(id) {
        this.imp.removeBoard(id)
    }

    this.editBoard = function(id, title) {
        this.imp.editBoard(id, title)
    };

    this.editCard = function(id, title, status, order) {
        this.imp.editCard(id, title, status, order)
    };
}