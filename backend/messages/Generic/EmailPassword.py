from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

#Recibe el email y contrasena para la creacion de token
class EmailPassword(messages.Message):
    email = messages.StringField(1, required = True)
    password = messages.StringField(2, required = True)