from peewee import *


def database():
    try:
        credentials = open("database.txt", "r").readlines()
        database = credentials[0].replace("\n", "").split(":", 1)[1]
        username = credentials[1].replace("\n", "").split(":", 1)[1]
        return PostgresqlDatabase(database, user=username)
    except:
        print("Provide your database and user name in 'database.txt', colon-separated.")


database = database()


class BaseModel(Model):
    class Meta:
        database = database


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
