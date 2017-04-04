from database_layer.models import *


class HandleDatabase:

    def __init__(self):
        self.db = Database().db
        self.db.connect()

    def fill_row(self, board_id, title_id, title):
        Boards.create(board_id=board_id,
                      title_id=title_id,
                      title=title)

    def load_boards(self):
        all_boards = Boards.select()
        return all_boards

