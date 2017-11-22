from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class CustomerUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    companyKey = messages.StringField(2)
    email = messages.StringField(3)
    name = messages.StringField(4)
    lastName = messages.StringField(5)
    rfc = messages.StringField(6)
    phone = messages.StringField(7)
    entityKey = messages.StringField(8, required = True)