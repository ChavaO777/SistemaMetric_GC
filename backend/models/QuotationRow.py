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
from Quotation import Quotation

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#### QuotationRow ####
class QuotationRow(CustomBaseModel):
    _message_fields_schema = ('userKey', 
                              'quotationKey',
                              'resourceKey', # This entity key is the key of a tool or a personnel
                              'quantity',
                              'timeUnits',
                              'amount')

    userKey = ndb.KeyProperty(kind = User)
    quotationKey = ndb.KeyProperty(kind = Quotation)
    resourceKey = ndb.StringProperty(); # Save it as a string because it can either be a Personnel key or a Tool key
    quantity = ndb.IntegerProperty();
    timeUnits = ndb.IntegerProperty();
    amount = ndb.FloatProperty();

    def quotationRow_m(self, data, userKey):
        quotationRow = QuotationRow() #Crea una variable de tipo Quotation Row
        quotationRow.populate(data) #Llena la variables con los datos dados por el request en main.py
        quotationRow.userKey = userKey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        quotationRow.put() #inserta o hace un update depende del main.py
        return 0