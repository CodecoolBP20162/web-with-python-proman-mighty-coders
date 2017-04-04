from database_layer import models

db.connect()
db.create_tables([Boards, Cards], safe=True)
