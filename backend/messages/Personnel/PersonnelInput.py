from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Personnel #####
class PersonnelInput(messages.Message):
    token = messages.StringField(1, required = True) 
    name = messages.StringField(2)
    lastName = messages.StringField(3)
    stage = messages.StringField(4)
    specialty = messages.StringField(5)
    comment = messages.StringField(6)
    tariff = messages.FloatField(7)
    tariffTimeUnit = messages.StringField(8)