import base64
import Crypto
from Crypto.Hash import SHA256

import sys
sys.path.insert(0, '.../google-cloud-sdk/platform/google_appengine')
import dev_appserver
dev_appserver.fix_sys_path()
from google.appengine.ext import ndb


from google.appengine.ext import blobstore
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel
import endpoints
from google.appengine.api import mail
from google.appengine.ext.webapp import blobstore_handlers

from ..models.User import CustomBaseModel
from ..models.User import User
from ..models.Company import Company
from ..models.Customer import Customer

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#### Event ####
class Event(CustomBaseModel):
    _message_fields_schema = ('companyKey',
                              'customerKey',
                              'iD',
                              'date',
                              'days',
                              'place',
                              'hidden')

    companyKey = ndb.KeyProperty(kind = Company)
    customerKey = ndb.KeyProperty(kind = Customer)
    iD = ndb.StringProperty()
    date = ndb.DateProperty()
    days = ndb.IntegerProperty()
    place = ndb.StringProperty()
    hidden = ndb.BooleanProperty()

    def event_m(self, data, companyKey, customerKey, eventDate):
        event = Event() #Crea una variable de tipo Event
        event.populate(data) #Llena la variables con los datos dados por el request en main.py
        event.companyKey = companyKey #Set the company key
        event.customerKey = customerKey #Set the customer key
        event.date = eventDate #Insert the date
        event.put() #inserta o hace un update depende del main.py
        return 0

#### create demo

def validarEmail(email):
    emailv = User.query(User.email == email)
    if not emailv.get():
        return False
    else:
        return True

#### create root Empresa
if validarEmail("adsoft@kubeet.com") == False:
    
    empresaAdmin = Company(code = 'kubeet', name = "kubeet srl de cv")
    empresaAdmin.put()

    #### create root user  
    keyadmincol = ndb.Key(urlsafe = empresaAdmin.entityKey)
    admin = User(companyKey = keyadmincol,
                 name = "Adsoft",
                 email = "adsoft@kubeet.com",
                 password = "qubit")

    admin.hash_password()
    admin.put()

#### create another user
if validarEmail("salvador@orozco.in") == False:
    
    empresaOther = Company(code = "orvis", name = "orvis srl de cv")
    empresaOther.put()

    #### create another user 
    keyadmincolOther = ndb.Key(urlsafe=empresaOther.entityKey)
    adminOther = User(companyKey = keyadmincolOther,
                      name = "Salvador",
                      email = "salvador@orozco.in",
                      password = "12345")

    adminOther.hash_password()
    adminOther.put()