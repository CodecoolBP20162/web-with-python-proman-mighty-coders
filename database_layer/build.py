from database_layer.models import *

db.connect()
db.create_tables([Boards, Cards], safe=True)
