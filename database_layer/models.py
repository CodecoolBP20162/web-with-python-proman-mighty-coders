from peewee import *
import os


class Database:

    def __init__(self):
        self.db = self.database()

    def database(self):
        current_file_path = os.path.dirname(os.path.abspath(__file__))
        credentials = open(current_file_path +
                           "/../database.txt", "r").readlines()
        database_name = credentials[0].replace("\n", "").split(":", 1)[1]
        username = credentials[1].replace("\n", "").split(":", 1)[1]
        return PostgresqlDatabase(database=database_name, user=username)


class BaseModel(Model):

    class Meta:
        database = Database().db


class Boards(BaseModel):
    board_id = CharField(unique=True)
    title_id = CharField()
    title = CharField()


class Cards(BaseModel):
    card_id = CharField()
    title = CharField()
    parent_board = ForeignKeyField(
        Boards, related_name="cards", to_field="board_id")
    status = CharField()
    order = IntegerField()
