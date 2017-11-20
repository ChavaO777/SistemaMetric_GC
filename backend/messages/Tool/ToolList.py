from protorpc import messages
from protorpc import message_types

from ToolUpdate import ToolUpdate

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class ToolList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(ToolUpdate, 2, repeated = True)