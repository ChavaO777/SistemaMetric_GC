from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

#regresa mensajes de lo ocurrido
class CodeMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)