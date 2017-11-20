from protorpc import messages
from protorpc import message_types

from CustomerUpdate import CustomerUpdate

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class CustomerList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(CustomerUpdate, 2, repeated = True)