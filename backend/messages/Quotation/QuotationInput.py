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
    subtotal = messages.FloatField(6)
    revenueFactor = messages.FloatField(7)
    iva = messages.FloatField(8)
    discount = messages.FloatField(9)
    total = messages.FloatField(10)
    metricPlus = messages.StringField(11)
    version = messages.IntegerField(12)