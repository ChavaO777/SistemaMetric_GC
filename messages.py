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
    companyKey = messages.StringField(2)
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
    iD = messages.StringField(2)
    date = messages.StringField(3) #DateOrTimeField is not working
    isFinal = messages.BooleanField(4)
    subtotal = messages.FloatField(5)
    revenueFactor = messages.FloatField(6)
    iva = messages.FloatField(7)
    discount = messages.FloatField(8)
    total = messages.FloatField(9)
    metricPlus = messages.StringField(10)

class QuotationUpdate(messages.Message):
    token = messages.StringField(1, required = True)
    iD = messages.StringField(2)
    date = messages.StringField(3) #DateOrTimeField is not working
    isFinal = messages.BooleanField(4)
    subtotal = messages.FloatField(5)
    revenueFactor = messages.FloatField(6)
    iva = messages.FloatField(7)
    discount = messages.FloatField(8)
    total = messages.FloatField(9)
    metricPlus = messages.StringField(10)
    entityKey = messages.StringField(11, required = True)

class QuotationList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(QuotationUpdate, 2, repeated = True)

##### Quotation Row #####
class QuotationRowInput(messages.Message):
    token = messages.StringField(1, required = True) 
    quotationKey = messages.StringField(2)
    resourceKey = messages.StringField(3)
    iD = messages.StringField(4)
    quantity = messages.IntegerField(5)
    days = messages.IntegerField(6)
    amount = messages.IntegerField(7)

class QuotationRowUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    quotationKey = messages.StringField(2)
    resourceKey = messages.StringField(3)
    iD = messages.StringField(4)
    quantity = messages.IntegerField(5)
    days = messages.IntegerField(6)
    amount = messages.IntegerField(7)
    entityKey = messages.StringField(8, required = True)

class QuotationRowList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(QuotationRowUpdate, 2, repeated = True)

##### Additional Expense #####
class AdditionalExpenseInput(messages.Message):
    token = messages.StringField(1, required = True) 
    quotationKey = messages.StringField(2)
    description = messages.StringField(3)
    price = messages.FloatField(4)
    comment = messages.StringField(5)

class AdditionalExpenseUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    quotationKey = messages.StringField(2)
    description = messages.StringField(3)
    price = messages.FloatField(4)
    comment = messages.StringField(5)
    entityKey = messages.StringField(6, required = True)

class AdditionalExpenseList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(AdditionalExpenseUpdate, 2, repeated = True)

##### Customer #####
class CustomerInput(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    email = messages.StringField(3)
    type = messages.StringField(4)
    name = messages.StringField(5)
    rfc = messages.StringField(6)
    phone = messages.StringField(7)

class CustomerUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    email = messages.StringField(3)
    type = messages.StringField(4)
    name = messages.StringField(5)
    rfc = messages.StringField(6)
    phone = messages.StringField(7)
    entityKey = messages.StringField(8, required = True)

class CustomerList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(CustomerUpdate, 2, repeated = True)

##### Tool #####
class ToolInput(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    category = messages.StringField(3)
    type = messages.StringField(4)
    brand = messages.StringField(5)
    model = messages.StringField(6)
    pricePerDay = messages.FloatField(7)
    quantity = messages.IntegerField(8)
    available = messages.IntegerField(9)
    comment = messages.StringField(10)

class ToolUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    companyKey = messages.StringField(2, required = True)
    iD = messages.StringField(3)
    category = messages.StringField(4)
    type = messages.StringField(5)
    brand = messages.StringField(6)
    model = messages.StringField(7)
    pricePerDay = messages.FloatField(8)
    quantity = messages.IntegerField(9)
    available = messages.IntegerField(10)
    comment = messages.StringField(11)
    entityKey = messages.StringField(12, required = True)

class ToolList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(ToolUpdate, 2, repeated = True)

##### Personnel #####
class PersonnelInput(messages.Message):
    token = messages.StringField(1, required = True) 
    iD = messages.StringField(2)
    category = messages.StringField(3)
    type = messages.StringField(4)
    brand = messages.StringField(5)
    model = messages.StringField(6)
    pricePerDay = messages.FloatField(7)
    quantity = messages.IntegerField(8)
    available = messages.IntegerField(9)
    comment = messages.StringField(10)

class PersonnelUpdate(messages.Message):
    token = messages.StringField(1, required = True) 
    companyKey = messages.StringField(2, required = True)
    iD = messages.StringField(3)
    category = messages.StringField(4)
    type = messages.StringField(5)
    brand = messages.StringField(6)
    model = messages.StringField(7)
    pricePerDay = messages.FloatField(8)
    quantity = messages.IntegerField(9)
    available = messages.IntegerField(10)
    comment = messages.StringField(11)
    entityKey = messages.StringField(12, required = True)
   
class PersonnelList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(ToolUpdate, 2, repeated = True)