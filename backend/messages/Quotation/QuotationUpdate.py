from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class QuotationUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    userKey = messages.StringField(2, required = True) 
    eventKey = messages.StringField(3, required = True) 
    iD = messages.StringField(4)
    date = messages.StringField(5) #DateOrTimeField is not working
    isFinal = messages.BooleanField(6)
    subtotal = messages.FloatField(7)
    revenueFactor = messages.FloatField(8)
    iva = messages.FloatField(9)
    discount = messages.FloatField(10)
    total = messages.FloatField(11)
    metricPlus = messages.StringField(12)
    version = messages.IntegerField(13)
    entityKey = messages.StringField(14, required = True)