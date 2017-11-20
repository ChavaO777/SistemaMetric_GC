   
from protorpc import messages
from protorpc import message_types

from PersonnelUpdate update PersonnelUpdate

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class PersonnelList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(PersonnelUpdate, 2, repeated = True)