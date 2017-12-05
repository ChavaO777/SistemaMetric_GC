   
from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Quotation Row #####
class QuotationRowInput(messages.Message):
    token = messages.StringField(1, required = True) 
    quotationKey = messages.StringField(2)
    resourceKey = messages.StringField(3)
    iD = messages.StringField(4)
    quantity = messages.IntegerField(5)
    days = messages.IntegerField(6)
    amount = messages.IntegerField(7)
    timeUnits = messages.StringField(8)