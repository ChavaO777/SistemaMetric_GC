from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Customer #####
class CustomerInput(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    email = messages.StringField(3)
    type = messages.StringField(4)
    name = messages.StringField(5)
    rfc = messages.StringField(6)
    phone = messages.StringField(7)