from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class AdditionalExpenseList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(AdditionalExpenseUpdate, 2, repeated = True)