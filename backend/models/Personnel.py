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

from ..models.Company import Company

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#### Personnel ####
class Personnel(CustomBaseModel):
    _message_fields_schema = ('companyKey', 
                              'name',
                              'lastName',
                              'stage',
                              'specialty',
                              'comment',
                              'tariff', 
                              'tariffTimeUnit')

    companyKey = ndb.KeyProperty(kind = Company)
    name = ndb.StringProperty()
    lastName = ndb.StringProperty()
    stage = ndb.StringProperty()
    specialty = ndb.StringProperty()
    comment = ndb.StringProperty()
    tariff = ndb.FloatProperty()
    tariffTimeUnit = ndb.StringProperty()

    def personnel_m(self, data, companyKey):
        personnel = Personnel() #Crea una variable de tipo Personnel
        personnel.populate(data) #Llena la variables con los datos dados por el request en main.py
        personnel.companyKey = companyKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        personnel.put() #inserta o hace un update depende del main.py
        return 0