from peewee import *


def database():
    try:
        credentials = open("../database.txt", "r").readlines()
        database_name = credentials[0].replace("\n", "").split(":", 1)[1]
        username = credentials[1].replace("\n", "").split(":", 1)[1]
        return PostgresqlDatabase(database_name, user=username)
    except:
        print("Provide your database and user name in 'database.txt', colon-separated.")


db = database()


class BaseModel(Model):
    class Meta:
        database = db


class Boards(BaseModel):
    board_id = CharField()
    title_id = CharField()
    title = CharField()


class Cards(BaseModel):
    card_id = CharField()
    title = CharField()
    parent_board = ForeignKeyField(Boards, related_name="cards")
    status = CharField()
    order = IntegerField()
