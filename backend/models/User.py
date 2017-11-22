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

##### User #####
class User(CustomBaseModel):
    _message_fields_schema = ('companyKey', 'email', 'name', 'lastName', 'password', 'salt')

    companyKey = ndb.KeyProperty(kind = Company)
    email = ndb.StringProperty()
    name = ndb.StringProperty()
    lastName = ndb.StringProperty()
    password = ndb.StringProperty()
    salt = ndb.StringProperty(indexed = False)
   
    def hash_password(self):
        """ Create a cryptographyc random secure salt and hash the password
            using the salt created and store both in the database, the password
            and the salt """
        # Note: The salt must be encoded in base64, otherwise it will
        # cause an exception trying to store non utf-8 characteres
        #self.salt = base64.urlsafe_b64encode(Crypto.Random.get_random_bytes(16))
        self.salt = "not salty enough :("
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

#### create demo

def validarEmail(email):
    emailv = User.query(User.email == email)
    if not emailv.get():
        return False
    else:
        return True