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

from User import User
from Company import Company

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#### Event ####
class Event(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'iD',
                              'date',
                              'days',
                              'place',
                              'hidden')

    userKey = ndb.KeyProperty(kind = User)
    companyKey = ndb.KeyProperty(kind = Company)
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