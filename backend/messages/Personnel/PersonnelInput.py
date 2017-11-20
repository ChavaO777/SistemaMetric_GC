from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Personnel #####
class PersonnelInput(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    category = messages.StringField(3)
    type = messages.StringField(4)
    brand = messages.StringField(5)
    model = messages.StringField(6)
    pricePerDay = messages.FloatField(7)
    quantity = messages.IntegerField(8)
    available = messages.IntegerField(9)
    comment = messages.StringField(10)