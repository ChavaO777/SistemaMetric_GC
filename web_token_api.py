import endpoints
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from protorpc import remote

import jwt
import time

from CustomExceptions import NotFoundException

from messages import EmailPasswordMessage, TokenMessage, CodeMessage, Token, TokenKey, MessageNone
from messages import CompanyInput, CompanyUpdate, CompanyList
from messages import UserInput, UserUpdate, UserList
from messages import QuotationInput, QuotationUpdate, QuotationList

from endpoints_proto_datastore.ndb import EndpointsModel

import models
from models import validarEmail
from models import Company, User, Quotation, QuotationRow, AdditionalExpense, Customer, Tool, Personnel, Event 

###############
# QuotationAPI
###############
@endpoints.api(name='quotation_api', version='v1', description='quotations endpoints')
class QuotationAPI(remote.Service):

  ######## Add quotation ##########
  @endpoints.method(QuotationInput, CodeMessage, path = 'quotation/insert', http_method = 'POST', name = 'quotation.insert')
  def quotation_add(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = User.get_by_id(token['user_id'])

      myQuotation = Quotation() 

      if myQuotation.quotation_m(request, user.key) == 0:
        codigo = 1
      else:
        codigo = -3

      message = CodeMessage(code = codigo, message = 'Quotation added')
   
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

  @endpoints.method(TokenKey, QuotationList, path = 'quotation/get', http_method = 'POST', name = 'quotation.get')
  def quotation_get(cls, request):
    try:                 
      
      token = jwt.decode(request.tokenint, 'secret')  #checa token
      quotationEntity = ndb.Key(urlsafe = request.entityKey)
      quotation = Quotation.get_by_id(quotationEntity.id()) #obtiene usuario
      
      list = []  #crea lista
      listMessage = QuotationList(code = 1) # crea objeto mensaje
      list.append(QuotationUpdate(token = '', 
                                  companyKey = quotation.companyKey,
                                  iD = quotation.iD,
                                  date = quotation.date,
                                  isFinal = quotation.isFinal,
                                  subtotal = quotation.subtotal,
                                  revenueFactor = quotation.revenueFactor,
                                  iva = quotation.iva,
                                  discount = quotation.discount,
                                  total = quotation.total,
                                  metricPlus = quotation.metricPlus))

      listMessage.data = list #ASIGNA a la salida la lista
      message = listMessage
    
    except jwt.DecodeError:
      message = QuotationList(code = -1, data = []) #token invalido
    
    except jwt.ExpiredSignatureError:
      message = QuotationList(code = -2, data = []) #token expiro
    
    return message

  @endpoints.method(Token, QuotationList, path = 'quotation/list', http_method = 'POST', name = 'quotation.list')
  def quotation_list(cls, request):
    try:
      
      token = jwt.decode(request.tokenint, 'secret')  #checa token
      user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
      list = []  #create list
      listMessage = QuotationList(code = 1) # crea objeto mensaje
      listBd = Quotation.query().fetch() # recupera de base de datos
      
      for i in listBd: # iterate
        list.append(QuotationUpdate(token='', 
                                    companyKey = i.companyKey,
                                    iD = i.iD,
                                    date = i.date,
                                    isFinal = i.isFinal,
                                    subtotal = i.subtotal,
                                    revenueFactor = i.revenueFactor,
                                    iva = i.iva,
                                    discount = i.discount,
                                    total = i.total,
                                    metricPlus = i.metricPlus))
      listMessage.data = list 
      message = listMessage
      
    except jwt.DecodeError:
      message = QuotationList(code = -1, data = []) #token invalido
    except jwt.ExpiredSignatureError:
      message = QuotationList(code = -2, data = []) #token expiro
    return message

  @endpoints.method(QuotationUpdate, CodeMessage, path='quotation/update', http_method='POST', name='quotation.update')
  #siempre lleva cls y request
  def quotation_update(cls, request):
    try:
      token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
      user = User.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
      quotation = Quotation()

      if quotation.quotation_m(request, user.key) == 0: #llama a la funcion declarada en models.py en la seccion de USUARIOS
        codigo = 1
      
      else:
        codigo = -3
      
      message = CodeMessage(code = 1, message = 'The quotation has been updated')
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

  @endpoints.method(TokenKey, CodeMessage, path = 'quotation/delete', http_method = 'POST', name = 'quotation.delete')
  def quotation_remove(cls, request):
    
    try:

      token = jwt.decode(request.tokenint, 'secret') #CHECA EL TOKEN
      quotationEntity = ndb.Key(urlsafe = request.entityKey )#Obtiene el elemento dado el EntityKey
      quotationEntity.delete() #Delete the quotation
      message = CodeMessage(code = 1, message = 'The quotation was succesfully deleted')
    
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')

    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

###############
# UserAPI
###############
@endpoints.api(name = 'user_api', version = 'v1', description = 'users endpoints')
class UserAPI(remote.Service):
  @endpoints.method(TokenKey, UserList, path='user/get', http_method='POST', name='user.get')
  def user_get(cls, request):
    try:                 
    
      token = jwt.decode(request.tokenint, 'secret')  #checa token
      userentity = ndb.Key(urlsafe = request.entityKey)
      user = User.get_by_id(userentity.id()) #obtiene usuario
      lista = []  #crea lista
      lstMessage = UserList(code = 1) # crea objeto mensaje
      lista.append(UserUpdate(token = '', 
                              entityKey = user.entityKey,
                              email = user.email))
      lstMessage.data = lista#ASIGNA a la salida la lista
      message = lstMessage
      
    except jwt.DecodeError:
      message = UserList(code = -1, data = []) #token invalido
    except jwt.ExpiredSignatureError:
      message = UserList(code = -2, data = []) #token expiro
    
    return message

  @endpoints.method(Token, UserList, path='user/list', http_method='POST', name='user.list')
  def user_list(cls, request):
    try:
      
      token = jwt.decode(request.tokenint, 'secret')  #checa token
      user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
      lista = []  #crea lista
      lstMessage = UserList(code=1) # crea objeto mensaje
      lstBd = User.query().fetch() # recupera de base de datos
      
      for i in lstBd: # recorre
        lista.append(UserUpdate(token = '',
                                entityKey = i.entityKey,
                                email = i.email)) # agrega a la lista
      
      lstMessage.data = lista # la manda al messa
      message = lstMessage #regresa
      
    except jwt.DecodeError:
      message = UserList(code=-1, data=[]) #token invalido
    except jwt.ExpiredSignatureError:
      message = UserList(code=-2, data=[]) #token expiro
    
    return message

  @endpoints.method(TokenKey, CodeMessage, path='user/delete', http_method='POST', name='user.delete')
  def user_remove(cls, request):
    try:
      
      token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
      usersentity = ndb.Key(urlsafe = request.entityKey)#Obtiene el elemento dado el EntitKey
      usersentity.delete()#BORRA
      message = CodeMessage(code = 1, message = 'Succesfully deleted')
    
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

  @endpoints.method(UserInput, CodeMessage, path='user/insert', http_method='POST', name='user.insert')
  def user_add(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = User.get_by_id(token['user_id'])
    
      if validarEmail(request.email) == False: #checa si el email esta registrado
        if user.usuario_m(request, user.empresa_key) == 0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
          codigo = 1
        else:
          codigo = -3
        
        message = CodeMessage(code = codigo, message = 'Succesfully added')
    
      else:
        message = CodeMessage(code = -4, message = 'El email ya ha sido registrado')
    
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

  @endpoints.method(EmailPasswordMessage, TokenMessage, path='user/login', http_method='POST', name='user.login')
  def users_login(cls, request):
    try:
      
      user = User.query(User.email == request.email).fetch() #obtiene el usuario dado el email
      if not user or len(user) == 0: #si no encuentra user saca
        raise NotFoundException()
      
      user = user[0] 
      companyKey = user.companyKey.urlsafe() # regresa como mensaje el empresa key
      
      if not user.verify_password(request.password): # checa la contrasena
        raise NotFoundException()

      token = jwt.encode({'user_id': user.key.id(), 'exp': time.time() + 43200}, 'secret') #crea el token
      message = TokenMessage(token = token, message = companyKey, code = 1) # regresa token
    
    except NotFoundException:
      message = TokenMessage(token = None, message = 'Wrong username or password', code = -1)
    
    return message

  @endpoints.method(UserUpdate, CodeMessage, path = 'user/update', http_method = 'POST', name = 'user.update')
  def user_update(cls, request):
    try:
      
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = User.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
      empresakey = ndb.Key(urlsafe=user.empresa_key.urlsafe())#convierte el string dado a entityKey
      
      if user.usuario_m(request, empresakey)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
        codigo = 1
      
      else:
        codigo = -3

      message = CodeMessage(code = 1, message = 'Sus cambios han sido guardados exitosamente')
    
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

###########################
#### Company
###########################

## Google Cloud Endpoint
@endpoints.api(name='company_api', version='v1', description='companies endpoints')
class CompanyAPI(remote.Service):

# get one

  @endpoints.method(TokenKey, CompanyList, path='empresa/get', http_method='POST', name='empresa.get')
  #siempre lleva cls y request
  def empresa_get(cls, request):
    try:
      token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
      empresaentity = ndb.Key(urlsafe=request.entityKey)
      message = CompanyList(code = 1, 
                            data = [CompanyUpdate(token='Succesfully get',
                                                  entityKey = empresaentity.get().entityKey,
                                                  codigo_empresa=empresaentity.get().codigo_empresa, 
                                                  nombre_empresa = empresaentity.get().nombre_empresa)])

    except jwt.DecodeError:
      message = CompanyList(code = -1, data = [])
    except jwt.ExpiredSignatureError:
      message = CompanyList(code = -2, data = [])
    
    return message

  @endpoints.method(TokenKey, CodeMessage, path='empresa/delete', http_method='POST', name='empresa.delete')
  def empresa_remove(cls, request):
    
    try:
      token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
      empresaentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
      empresaentity.delete()#BORRA
      message = CodeMessage(code=1, message='Succesfully deleted')
    except jwt.DecodeError:
      message = CodeMessage(code=-2, message='Invalid token')
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code=-1, message='Token expired')
    
    return message

  # insert
  @endpoints.method(CompanyInput, CodeMessage, path='empresa/insert', http_method='POST', name='empresa.insert')
  def empresa_add(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = User.get_by_id(token['user_id'])#obtiene el usuario models.py 
      myCompany = Company()
      
      if myCompany.company_m(request) == 0: 
        codigo = 1
      
      else:
        codigo = -3
      
      message = CodeMessage(code = codigo, message = 'Succesfully added')
      
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
      
      return message

  @endpoints.method(CompanyUpdate, CodeMessage, path='empresa/update', http_method='POST', name='empresa.update')
  def empresa_update(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN 
      user = User.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
          #empresakey = ndb.Key(urlsafe=request.empresa_key)#convierte el string dado a entityKey
      myempresa = Company()
      if myempresa.company_m(request)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
        codigo = 1
      else:
        codigo = -3
      message = CodeMessage(code=1, message='Sus cambios han sido guardados exitosamente')
    except jwt.DecodeError:
      message = CodeMessage(code=-2, message='Invalid token')
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code=-1, message='Token expired')
    
    return message

  @endpoints.method(Token, CompanyList, path='empresa/list', http_method='POST', name='empresa.list')
  #siempre lleva cls y request
  def empresa_list(cls, request):
    try:
      token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
      user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
      lista = [] #crea lista para guardar contenido de la BD
      lstMessage = CompanyList(code=1) #CREA el mensaje de salida
      lstBdCompany = Company.query().fetch() #obtiene de la base de datos
      
      for i in lstBdCompany: #recorre la base de datos
        lista.append(CompanyUpdate(token='', 
                                   entityKey = i.entityKey,
                                   codigo_empresa=i.codigo_empresa, 
                                   nombre_empresa = i.nombre_empresa))
          
      lstMessage.data = lista #ASIGNA a la salida la lista
      message = lstMessage
    except jwt.DecodeError:
      message = CompanyList(code=-1, data=[])
    except jwt.ExpiredSignatureError:
      message = CompanyList(code=-2, data=[])
    
    return message

application = endpoints.api_server([UserAPI, CompanyAPI, QuotationAPI], restricted = False)

