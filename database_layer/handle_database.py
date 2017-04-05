from database_layer.models import *


class HandleDatabase:
    def __init__(self):
        self.db = Database().db
        self.db.connect()

    def board_fill_row(self, board_id, title_id, title):
        Boards.create(board_id=board_id,
                      title_id=title_id,
                      title=title)

    def make_json_list_from_boards(self):
        all_boards = Boards.select()
        list_of_dicts = []
        for board in all_boards:
            list_of_dicts.append({'board_id': board.board_id,
                                  'title_id': board.title_id,
                                  'title': board.title,
                                  'cards': []})
        return list_of_dicts


    def card_fill_row(self, card_id, title, parent_board, status, order):
        Cards.create(card_id=card_id,
                     title=title,
                     parent_board=parent_board,
                     status=status,
                     order=order)

    def make_json_list_from_cards(self, board_id):
        all_cards = Cards.select().where(board_id == board_id)
        list_of_dicts = []
        for card in all_cards:
            list_of_dicts.append({'board_id': card.card_id,
                                  'title': card.title,
                                  'parent_board_id': card.parent_board_id,
                                  'status': card.status,
                                  'order': card.order})
        return list_of_dicts

    def delete_card(self, parent_board, card_id):
        card = Cards.select().join(Boards).where(Boards.board_id == parent_board and Cards.card_id == card_id).get()
        card.delete_instance()
