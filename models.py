import base64
import Crypto
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from google.appengine.ext import blobstore
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel
import endpoints
from google.appengine.api import mail
from google.appengine.ext.webapp import blobstore_handlers

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#### Company ####
class Company(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'code', 'name')
    code = ndb.StringProperty()
    name = ndb.StringProperty()
    
    def company_m(self, data):
        
        company = Company()#Crea una variable de tipo Base de datos
        company.populate(data)#Llena la variables con los datos dados por el request en main.py
        company.put()#inserta o hace un update depende del main.py
        
        return 0

##### User #####
class User(CustomBaseModel):
    _message_fields_schema = ('companyKey', 'email', 'password', 'salt')

    companyKey = ndb.KeyProperty(kind = Company)
    email = ndb.StringProperty()
    password = ndb.StringProperty()
    salt = ndb.StringProperty(indexed = False)
   
    def hash_password(self):
        """ Create a cryptographyc random secure salt and hash the password
            using the salt created and store both in the database, the password
            and the salt """
        # Note: The salt must be encoded in base64, otherwise it will
        # cause an exception trying to store non utf-8 characteres
        self.salt = base64.urlsafe_b64encode(
            Crypto.Random.get_random_bytes(16))
        hash_helper = SHA256.new()
        hash_helper.update(self.password + self.salt)
        self.password = hash_helper.hexdigest()

    def verify_password(self, password):
        """ Verify if the password is correct """
        hash_helper = SHA256.new()
        hash_helper.update(password + self.salt)
        
        return hash_helper.hexdigest() == self.password

    def user_m(self, data, companyKey):
        user = User() #Crea una variable de tipo User
        user.populate(data) #Llena la variables con los datos dados por el request en main.py
        user.companyKey = companyKey
        user.status = 1
        user.hash_password() #encripta la contrasena
        user.put() #inserta o hace un update depende del main.py
        
        return 0

#### Quotation ####
class Quotation(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'iD', 
                              'date',
                              'isFinal',
                              'subtotal',
                              'revenueFactor',
                              'iva',
                              'discount',
                              'total',
                              'metricPlus')

    userKey = ndb.KeyProperty(kind = User)
    iD = ndb.StringProperty();
    date = ndb.DateTimeProperty();
    isFinal = ndb.BooleanProperty();
    subtotal = ndb.FloatProperty();
    revenueFactor = ndb.FloatProperty();
    iva = ndb.FloatProperty();
    discount = ndb.FloatProperty();
    total = ndb.FloatProperty();
    metricPlus = ndb.StringProperty();
 
    def quotation_m(self, data, userKey):
        quotation = Quotation() #Crea una variable de tipo Quotation
        quotation.populate(data) #Llena la variables con los datos dados por el request en main.py
        quotation.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        quotation.put() #inserta o hace un update depende del main.py
        return 0

#### QuotationRow ####
class QuotationRow(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'quotationKey',
                              'resourceKey', # This entity key is the key of a tool or a personnel
                              'iD', 
                              'quantity',
                              'days',
                              'amount')

    userKey = ndb.KeyProperty(kind = User)
    quotationKey = ndb.KeyProperty(kind = Quotation)
    resourceKey = ndb.StringProperty(); # Save it as a string because it can either be a Personnel key or a Tool key
    iD = ndb.StringProperty();
    quantity = ndb.IntegerProperty();
    days = ndb.IntegerProperty();
    amount = ndb.IntegerProperty();

    def quotationRow_m(self, data, userKey):
        quotationRow = QuotationRow() #Crea una variable de tipo Quotation Row
        quotationRow.populate(data) #Llena la variables con los datos dados por el request en main.py
        quotationRow.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        quotationRow.put() #inserta o hace un update depende del main.py
        return 0

#### AdditionalExpense ####
class AdditionalExpense(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'quotationKey',
                              'description',
                              'price',
                              'comment')

    userKey = ndb.KeyProperty(kind = User)
    quotationKey = ndb.KeyProperty(kind = Quotation)
    description = ndb.StringProperty()
    price = ndb.FloatProperty();
    comment = ndb.StringProperty();

    ### Quotation ####
    def additionalExpense_m(self, data, userKey):
        additionalExpense = AdditionalExpense() #Crea una variable de tipo Additional Expense
        additionalExpense.populate(data) #Llena la variables con los datos dados por el request en main.py
        additionalExpense.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        additionalExpense.put() #inserta o hace un update depende del main.py
        return 0

#### Customer ####
class Customer(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'iD',
                              'email',
                              'type',
                              'name',
                              'rfc',
                              'phone')

    userKey = ndb.KeyProperty(kind = User)
    iD = ndb.StringProperty()
    email = ndb.StringProperty()
    type = ndb.StringProperty()
    name = ndb.StringProperty()
    rfc = ndb.StringProperty()
    phone = ndb.StringProperty()

    def customer_m(self, data, userKey):
        customer = Customer() #Crea una variable de tipo Customer
        customer.populate(data) #Llena la variables con los datos dados por el request en main.py
        customer.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        customer.put() #inserta o hace un update depende del main.py
        return 0

#### Tool ####
class Tool(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'iD',
                              'category',
                              'type',
                              'brand',
                              'model',
                              'pricePerDay',
                              'quantity',
                              'available',
                              'comment')

    userKey = ndb.KeyProperty(kind = User)
    iD = ndb.StringProperty()
    category = ndb.StringProperty()
    type = ndb.StringProperty()
    brand = ndb.StringProperty()
    model = ndb.StringProperty()
    pricePerDay = ndb.FloatProperty()
    quantity = ndb.IntegerProperty()
    available = ndb.IntegerProperty()
    comment = ndb.StringProperty()

    def tool_m(self, data, userKey):
        tool = Tool() #Crea una variable de tipo Tool
        tool.populate(data) #Llena la variables con los datos dados por el request en main.py
        tool.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        tool.put() #inserta o hace un update depende del main.py
        return 0

#### Personnel ####
class Personnel(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'iD',
                              'stage',
                              'specialty',
                              'comment',
                              'pricePerDay')

    userKey = ndb.KeyProperty(kind = Company)
    iD = ndb.StringProperty()
    stage = ndb.StringProperty()
    specialty = ndb.StringProperty()
    comment = ndb.StringProperty()
    pricePerDay = ndb.FloatProperty()

    def personnel_m(self, data, userKey):
        personnel = Personnel() #Crea una variable de tipo Personnel
        personnel.populate(data) #Llena la variables con los datos dados por el request en main.py
        personnel.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        personnel.put() #inserta o hace un update depende del main.py
        return 0

#### Event ####
class Event(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'iD',
                              'date',
                              'days',
                              'place',
                              'hidden')

    userKey = ndb.KeyProperty(kind = Company)
    iD = ndb.StringProperty()
    date = ndb.DateTimeProperty()
    days = ndb.IntegerProperty()
    place = ndb.StringProperty()
    hidden = ndb.BooleanProperty()

    def event_m(self, data, userKey):
        event = Event() #Crea una variable de tipo Event
        event.populate(data) #Llena la variables con los datos dados por el request en main.py
        event.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        event.put() #inserta o hace un update depende del main.py
        return 0

def validarEmail(email):

    user = User.query(User.email == email)
    # if not user.get():
    #     return False
    # else:
    #     return True

    return user.get()

#### create root Empresa
if validarEmail("adsoft@kubeet.com") == False:
    
    empresaAdmin = Company(code = 'kubeet', name = "kubeet srl de cv")
    empresaAdmin.put()

    #### create root user  
    keyadmincol = ndb.Key(urlsafe=empresaAdmin.entityKey)
    admin = User(companyKey = keyadmincol,
                 name = "Adsoft",
                 email = "adsoft@kubeet.com",
                 password = "qubit")

    admin.hash_password()
    admin.put()

#### create another user
if validarEmail("salvador@orozco.in") == False:
    
    empresaOther = Company(code = 'orvis', name = "orvis srl de cv")
    empresaOther.put()

    #### create another user 
    keyadmincolOther = ndb.Key(urlsafe=empresaOther.entityKey)
    adminOther = User(companyKey = keyadmincolOther,
                      name = "Salvador",
                      email = "salvador@orozco.in",
                      password = "12345")

    adminOther.hash_password()
    adminOther.put()