from protorpc import messages
from protorpc import message_types

from QuotationUpdate import QuotationUpdate

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class QuotationList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(QuotationUpdate, 2, repeated = True)