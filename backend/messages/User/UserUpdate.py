from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class UserUpdate(messages.Message):
    token = messages.StringField(1)
    email = messages.StringField(2)
    password = messages.StringField(3)
    entityKey = messages.StringField(4, required = True)