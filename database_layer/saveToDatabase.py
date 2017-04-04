from database_layer.models import *


class SaveToDatabase:

    def fillRow(self, board_id, title_id, title):
        Boards.create(board_id=board_id,
                      title_id=title_id,
                      title=title)

