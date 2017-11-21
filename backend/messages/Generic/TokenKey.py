from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

#Recibe el token y un entityKey de cualquier base de datos para validar
class TokenKey(messages.Message):
    tokenint = messages.StringField(1, required = True)
    entityKey = messages.StringField(2, required = True)