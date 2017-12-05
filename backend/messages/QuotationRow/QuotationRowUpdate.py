
from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class QuotationRowUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    quotationKey = messages.StringField(2)
    resourceKey = messages.StringField(3)
    iD = messages.StringField(4)
    quantity = messages.IntegerField(5)
    days = messages.IntegerField(6)
    amount = messages.FloatField(7)
    entityKey = messages.StringField(8, required = True)
    userKey = messages.StringField(9)
    timeUnits = messages.StringField(10)
