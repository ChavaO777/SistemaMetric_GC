from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

##### Customer #####
class CustomerInput(messages.Message):
    token = messages.StringField(1, required = True) 
    email = messages.StringField(2)
    name = messages.StringField(3)
    lastName = messages.StringField(4)
    rfc = messages.StringField(5)
    phone = messages.StringField(6)