from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class EventUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    date = messages.StringField(3)
    days = messages.IntegerField(4)
    place = messages.StringField(5)
    hidden = messages.BooleanField(6)
    customerKey = messages.StringField(7, required = True)
    entityKey = messages.StringField(8, required = True)