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

from Company import Company

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#### Customer ####
class Customer(CustomBaseModel):
    _message_fields_schema = ('companyKey', 
                              'iD',
                              'email',
                              'type',
                              'name',
                              'rfc',
                              'phone')

    companyKey = ndb.KeyProperty(kind = Company)
    iD = ndb.StringProperty()
    email = ndb.StringProperty()
    type = ndb.StringProperty()
    name = ndb.StringProperty()
    rfc = ndb.StringProperty()
    phone = ndb.StringProperty()

    def customer_m(self, data, companyKey):
        customer = Customer() #Crea una variable de tipo Customer
        customer.populate(data) #Llena la variables con los datos dados por el request en main.py
        customer.companyKey = companyKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        customer.put() #inserta o hace un update depende del main.py
        return 0