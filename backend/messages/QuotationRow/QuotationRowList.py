
from protorpc import messages
from protorpc import message_types

from QuotationRowUpdate import QuotationRowUpdate

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class QuotationRowList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(QuotationRowUpdate, 2, repeated = True)
