from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

# Input messages
#Recibe el token para validar
class Token(messages.Message):
    tokenint = messages.StringField(1, required = True)