from protorpc import messages
from protorpc import message_types

from UserUpdate import UserUpdate

class MessageNone(messages.Message):
    inti = messages.StringField(1)

class UserList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(UserUpdate, 2, repeated = True)