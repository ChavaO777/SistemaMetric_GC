from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)

# Input messages
#Recibe el token para validar
class Token(messages.Message):
    tokenint = messages.StringField(1, required = True)

#Recibe el token y un entityKey de cualquier base de datos para validar
class TokenKey(messages.Message):
    tokenint = messages.StringField(1, required = True)
    entityKey = messages.StringField(2, required = True)

#Recibe el email y contrasena para la creacion de token
class EmailPasswordMessage(messages.Message):
    email = messages.StringField(1, required = True)
    password = messages.StringField(2, required = True)

# Output messages
#regresa un token
class TokenMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)
    token = messages.StringField(3)

#regresa mensajes de lo ocurrido
class CodeMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)

#USERS
class UserInput(messages.Message):
    token = messages.StringField(1) 
    empresa_key = messages.StringField(2)
    email = messages.StringField(3)
    password = messages.StringField(4)

class UserUpdate(messages.Message):
    token = messages.StringField(1)
    email = messages.StringField(2)
    password = messages.StringField(3)
    entityKey = messages.StringField(4, required = True)

class UserList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(UserUpdate, 2, repeated = True)

##### Company #####
class CompanyInput(messages.Message):
    token = messages.StringField(1, required = True) 
    code = messages.StringField(2)
    name = messages.StringField(3)

class CompanyUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    code = messages.StringField(2)
    name = messages.StringField(3)

class CompanyList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(CompanyUpdate, 2, repeated = True)

##### Quotation #####
class QuotationInput(messages.Message):
    token = messages.StringField(1, required = True) 
    userKey = messages.StringField(2)
    iD = messages.StringField(3)
    date = messages.StringField(4) #DateOrTimeField is not working
    isFinal = messages.BooleanField(5)
    subtotal = messages.FloatField(6)
    revenueFactor = messages.FloatField(7)
    iva = messages.FloatField(8)
    discount = messages.FloatField(9)
    total = messages.FloatField(10)
    metricPlus = messages.StringField(11)

class QuotationUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    userKey = messages.StringField(2)
    iD = messages.StringField(3)
    date = messages.StringField(4) #DateOrTimeField is not working
    isFinal = messages.BooleanField(5)
    subtotal = messages.FloatField(6)
    revenueFactor = messages.FloatField(7)
    iva = messages.FloatField(8)
    discount = messages.FloatField(9)
    total = messages.FloatField(10)
    metricPlus = messages.StringField(11)
    entityKey = messages.StringField(12, required = True)

class QuotationList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(QuotationUpdate, 2, repeated = True)

##### Quotation Row #####
class QuotationRowInput(messages.Message):
    token = messages.StringField(1, required = True) 
    userKey = messages.StringField(2)
    quotationKey = messages.StringField(3)
    resourceKey = messages.StringField(4)
    iD = messages.StringField(5)
    quantity = messages.IntegerField(6)
    days = messages.IntegerField(7)
    amount = messages.IntegerField(8)

class QuotationRowUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    userKey = messages.StringField(2)
    quotationKey = messages.StringField(3)
    resourceKey = messages.StringField(4)
    iD = messages.StringField(5)
    quantity = messages.IntegerField(6)
    days = messages.IntegerField(7)
    amount = messages.IntegerField(8)
    entityKey = messages.StringField(9, required = True)

class QuotationRowList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(QuotationRowUpdate, 2, repeated = True)