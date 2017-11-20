   
from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class PersonnelList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(ToolUpdate, 2, repeated = True)