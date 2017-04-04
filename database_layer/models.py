from peewee import *


db = PostgresqlDatabase(database='proman', user='okocsis90')


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
