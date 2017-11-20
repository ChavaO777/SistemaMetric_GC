from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class QuotationUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    iD = messages.StringField(2)
    date = messages.StringField(3) #DateOrTimeField is not working
    isFinal = messages.BooleanField(4)
    subtotal = messages.FloatField(5)
    revenueFactor = messages.FloatField(6)
    iva = messages.FloatField(7)
    discount = messages.FloatField(8)
    total = messages.FloatField(9)
    metricPlus = messages.StringField(10)
    entityKey = messages.StringField(11, required = True)