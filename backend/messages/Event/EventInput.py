from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Event #####
class EventInput(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    name = messages.StringField(3)
    description = messages.StringField(4)
    date = messages.StringField(5)
    days = messages.IntegerField(6)
    place = messages.StringField(7)
    hidden = messages.BooleanField(8)
    customerKey = messages.StringField(9, required = True) 