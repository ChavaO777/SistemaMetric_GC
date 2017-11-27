from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class UserUpdate(messages.Message):
    token = messages.StringField(1) 
    companyKey = messages.StringField(2)
    email = messages.StringField(3)
    password = messages.StringField(4)
    name = messages.StringField(5)
    lastName = messages.StringField(6)
    entityKey = messages.StringField(7, required = True)