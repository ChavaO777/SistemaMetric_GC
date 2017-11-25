from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class ToolUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    companyKey = messages.StringField(2, required = True)
    iD = messages.StringField(3)
    category = messages.StringField(4)
    kind = messages.StringField(5)
    brand = messages.StringField(6)
    model = messages.StringField(7)
    tariff = messages.FloatField(8)
    tariffUnit = messages.FloatField(9)
    quantity = messages.IntegerField(10)
    availableQuantity = messages.IntegerField(11)
    comment = messages.StringField(12)
    entityKey = messages.StringField(13, required = True)