   
from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class PersonnelUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    companyKey = messages.StringField(2)
    name = messages.StringField(3)
    lastName = messages.StringField(4)
    stage = messages.StringField(5)
    specialty = messages.StringField(6)
    comment = messages.StringField(7)
    tariff = messages.FloatField(8)
    tariffUnit = messages.StringField(9)
    entityKey = messages.StringField(10, required = True)