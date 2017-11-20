from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class CompanyUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    code = messages.StringField(2)
    name = messages.StringField(3)