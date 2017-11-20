   
from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class PersonnelUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    companyKey = messages.StringField(2, required = True)
    iD = messages.StringField(3)
    category = messages.StringField(4)
    type = messages.StringField(5)
    brand = messages.StringField(6)
    model = messages.StringField(7)
    pricePerDay = messages.FloatField(8)
    quantity = messages.IntegerField(9)
    available = messages.IntegerField(10)
    comment = messages.StringField(11)
    entityKey = messages.StringField(12, required = True)