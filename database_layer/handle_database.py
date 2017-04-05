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
