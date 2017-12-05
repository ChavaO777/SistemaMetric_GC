from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class QuotationUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    eventKey = messages.StringField(3, required = True) 
    iD = messages.StringField(4)
    date = messages.StringField(5) #DateOrTimeField is not working
    isFinal = messages.BooleanField(6)
    revenueFactor = messages.FloatField(7)
    iva = messages.FloatField(8)
    discount = messages.FloatField(9)
    metricPlus = messages.StringField(10)
    version = messages.IntegerField(11)
    entityKey = messages.StringField(12, required = True)