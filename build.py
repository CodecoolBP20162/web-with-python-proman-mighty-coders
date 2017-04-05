from database_layer.models import *


db = Database()
db.db.connect()
db.db.drop_tables([Boards, Cards], safe=True, cascade=True)
db.db.create_tables([Boards, Cards], safe=True)
db.db.close()
