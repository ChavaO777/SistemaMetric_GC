
from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class QuotationRowUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    quotationKey = messages.StringField(2)
    resourceKey = messages.StringField(3)
    quantity = messages.IntegerField(4)
    tariff = messages.FloatField(5)
    tariffTimeUnit = messages.StringField(6)
    entityKey = messages.StringField(7, required = True)
