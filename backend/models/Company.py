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