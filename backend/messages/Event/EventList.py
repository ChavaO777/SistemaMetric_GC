from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class EventList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(EventUpdate, 2, repeated = True)