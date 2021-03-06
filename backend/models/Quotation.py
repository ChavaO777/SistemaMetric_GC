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

from ..models.User import User
from ..models.Event import Event

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#### Quotation ####
class Quotation(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'eventKey',
                              'iD', 
                              'date',
                              'isFinal',
                              'revenueFactor',
                              'iva',
                              'discount',
                              'metricPlus',
                              'version')

    userKey = ndb.KeyProperty(kind = User)
    eventKey = ndb.KeyProperty(kind = Event)
    iD = ndb.StringProperty()
    date = ndb.DateTimeProperty()
    isFinal = ndb.BooleanProperty()
    revenueFactor = ndb.FloatProperty()
    iva = ndb.FloatProperty()
    discount = ndb.FloatProperty()
    metricPlus = ndb.StringProperty()
    version = ndb.IntegerProperty()
 
    def quotation_m(self, data, userKey, eventKey, dateObj):
        quotation = Quotation() #Crea una variable de tipo Quotation
        quotation.populate(data) #Llena la variables con los datos dados por el request en main.py
        quotation.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        quotation.eventKey = eventKey
        quotation.date = dateObj
        quotation.put() #inserta o hace un update depende del main.py
        return 0