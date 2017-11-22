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

#### Tool ####
class Tool(CustomBaseModel):
    _message_fields_schema = ('companyKey', 
                              'iD',
                              'category',
                              'kind',
                              'brand',
                              'model',
                              'tariff',
                              'tariffUnit',
                              'quantity',
                              'availableQuantity',
                              'comment')

    companyKey = ndb.KeyProperty(kind = Company)
    iD = ndb.StringProperty()
    category = ndb.StringProperty()
    kind = ndb.StringProperty()
    brand = ndb.StringProperty()
    model = ndb.StringProperty()
    tariff = ndb.FloatProperty()
    tariffUnit = ndb.StringProperty()
    quantity = ndb.IntegerProperty()
    availableQuantity = ndb.IntegerProperty()
    comment = ndb.StringProperty()

    def tool_m(self, data, companyKey):
        tool = Tool() #Crea una variable de tipo Tool
        tool.populate(data) #Llena la variables con los datos dados por el request en main.py
        tool.companyKey = companyKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        tool.put() #inserta o hace un update depende del main.py
        return 0