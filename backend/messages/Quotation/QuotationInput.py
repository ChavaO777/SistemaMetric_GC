from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Quotation #####
class QuotationInput(messages.Message):
    token = messages.StringField(1, required = True) 
    eventKey = messages.StringField(2, required = True) 
    iD = messages.StringField(3)
    date = messages.StringField(4) #DateOrTimeField is not working
    isFinal = messages.BooleanField(5)
    revenueFactor = messages.FloatField(6)
    iva = messages.FloatField(7)
    discount = messages.FloatField(8)
    metricPlus = messages.StringField(9)
    version = messages.IntegerField(10)