from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

# Output messages
#regresa un token
class TokenMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)
    token = messages.StringField(3)