from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Tool #####
class ToolInput(messages.Message):
    token = messages.StringField(1, required = True)
    iD = messages.StringField(2)
    category = messages.StringField(3)
    kind = messages.StringField(4)
    brand = messages.StringField(5)
    model = messages.StringField(6)
    tariff = messages.FloatField(7)
    tariffTimeUnit = messages.StringField(8)
    quantity = messages.IntegerField(9)
    availableQuantity = messages.IntegerField(10)
    comment = messages.StringField(11)
