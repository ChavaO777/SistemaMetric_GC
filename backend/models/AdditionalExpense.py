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