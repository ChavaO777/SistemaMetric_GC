import endpoints
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from protorpc import remote

import jwt
import time

from datetime import datetime

import base64 # Padding errors
from CustomExceptions import NotFoundException

#Import generic messages
from backend.messages.Generic.CodeMessage import CodeMessage
from backend.messages.Generic.EmailPassword import EmailPassword
from backend.messages.Generic.Token import Token
from backend.messages.Generic.TokenKey import TokenKey
from backend.messages.Generic.TokenMessage import TokenMessage

#Import AdditionalExpense messages
from backend.messages.AdditionalExpense.AdditionalExpenseInput import AdditionalExpenseInput
from backend.messages.AdditionalExpense.AdditionalExpenseUpdate import AdditionalExpenseUpdate
from backend.messages.AdditionalExpense.AdditionalExpenseList import AdditionalExpenseList

#Import Company messages
from backend.messages.Company.CompanyInput import CompanyInput
from backend.messages.Company.CompanyUpdate import CompanyUpdate
from backend.messages.Company.CompanyList import CompanyList

#Import Customer messages
from backend.messages.Customer.CustomerInput import CustomerInput
from backend.messages.Customer.CustomerUpdate import CustomerUpdate
from backend.messages.Customer.CustomerList import CustomerList

#Import Event messages
from backend.messages.Event.EventInput import EventInput
from backend.messages.Event.EventUpdate import EventUpdate
from backend.messages.Event.EventList import EventList

#Import Personnel messages
from backend.messages.Personnel.PersonnelInput import PersonnelInput
from backend.messages.Personnel.PersonnelUpdate import PersonnelUpdate
from backend.messages.Personnel.PersonnelList import PersonnelList

#Import Quotation messages
from backend.messages.Quotation.QuotationInput import QuotationInput
from backend.messages.Quotation.QuotationUpdate import QuotationUpdate
from backend.messages.Quotation.QuotationList import QuotationList

#Import QuotationRow messages
from backend.messages.QuotationRow.QuotationRowInput import QuotationRowInput
from backend.messages.QuotationRow.QuotationRowUpdate import QuotationRowUpdate
from backend.messages.QuotationRow.QuotationRowList import QuotationRowList

#Import Tool messages
from backend.messages.Tool.ToolInput import ToolInput
from backend.messages.Tool.ToolUpdate import ToolUpdate
from backend.messages.Tool.ToolList import ToolList

#Import User messages
from backend.messages.User.UserInput import UserInput
from backend.messages.User.UserUpdate import UserUpdate
from backend.messages.User.UserList import UserList

from endpoints_proto_datastore.ndb import EndpointsModel

#Import models
from backend.models.AdditionalExpense import AdditionalExpense
from backend.models.Company import Company
from backend.models.Customer import Customer
from backend.models.Event import Event
from backend.models.Personnel import Personnel
from backend.models.Quotation import Quotation
from backend.models.QuotationRow import QuotationRow
from backend.models.Tool import Tool
from backend.models.User import User

import logging

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

			#Get the key object given the event key
			eventKeyObj = ndb.Key(urlsafe = request.eventKey)
			#Set the request's eventKey field to None, but pass the recently created Key object
			# as a parameter to event_m()
			request.eventKey = None

			myQuotation = Quotation()
			# The request's date comes in as 'YYYY-MM-DD', e.g.: '2017-11-23'
			dateStr = request.date
			# Split the date into an array of strings e.g.: '2017-11-23' -> ['2017', '11', '23']
			dateStrArray = dateStr.split("-")
			# Create a date object with the values from that array
			dateObj = datetime(int(dateStrArray[0]), int(dateStrArray[1]), int(dateStrArray[2]))
			#Set the request's date field to None, but pass the recently created date object
			# as a parameter to event_m()
			request.date = None

			if myQuotation.quotation_m(request, user.key, eventKeyObj, dateObj) == 0:
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

			token = jwt.decode(request.token, 'secret')  #checa token
			quotationEntity = ndb.Key(urlsafe = request.entityKey)
			quotation = Quotation.get_by_id(quotationEntity.id()) #obtiene usuario

			list = []  #crea lista
			listMessage = QuotationList(code = 1) # crea objeto mensaje
			list.append(QuotationUpdate(token = '',
										userKey = quotation.userKey.urlsafe(),
										eventKey = i.eventKey.urlsafe(),
										iD = quotation.iD,
										date = quotation.date.strftime("%d/%m/%Y"),
										isFinal = quotation.isFinal,
										subtotal = quotation.subtotal,
										revenueFactor = quotation.revenueFactor,
										iva = quotation.iva,
										discount = quotation.discount,
										total = quotation.total,
										metricPlus = quotation.metricPlus,
										version = quotation.version,
										entityKey = quotation.entityKey))

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

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = QuotationList(code = 1) # crea objeto mensaje
			listBd = Quotation.query().fetch() # recupera de base de datos

			for i in listBd: # iterate
				list.append(QuotationUpdate(token='',
											userKey = i.userKey.urlsafe(),
											eventKey = i.eventKey.urlsafe(),
											iD = i.iD,
											date = i.date.strftime("%d/%m/%Y"),
											isFinal = i.isFinal,
											subtotal = i.subtotal,
											revenueFactor = i.revenueFactor,
											iva = i.iva,
											discount = i.discount,
											total = i.total,
											metricPlus = i.metricPlus,
											version = i.version,
											entityKey = i.entityKey))
			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = QuotationList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = QuotationList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(QuotationUpdate, CodeMessage, path='quotation/update', http_method='POST', name='quotation.update')
	def quotation_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			user = User.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py

			quotationKeyObj = ndb.Key(urlsafe = request.entityKey)
			quotationEntity = quotationKeyObj.get()
			
			#replace attributes with those of the request
			quotationEntity.userKey = user.key

			eventKeyObj = ndb.Key(urlsafe = request.eventKey)
			quotationEntity.eventKey = eventKeyObj

			quotationEntity.iD = request.iD

			# The request's date comes in as 'YYYY-MM-DD', e.g.: '2017-11-23'
			dateStr = request.date
			# Split the date into an array of strings e.g.: '2017-11-23' -> ['2017', '11', '23']
			dateStrArray = dateStr.split("-")
			# Create a date object with the values from that array -> datetime(year, month, day)
			date = datetime(int(dateStrArray[0]), int(dateStrArray[1]), int(dateStrArray[2]))
			# Finally, place the new date in the entity
			quotationEntity.date = date

			quotationEntity.isFinal = request.isFinal
			quotationEntity.subtotal = request.subtotal
			quotationEntity.revenueFactor = request.revenueFactor
			quotationEntity.iva = request.iva
			quotationEntity.discount = request.discount
			quotationEntity.total = request.total
			quotationEntity.metricPlus = request.metricPlus
			quotationEntity.version = request.version

			#Save the changes in the Quotation entity in the DB
			quotationEntity.put()

			message = CodeMessage(code = 1, message = 'The quotation has been updated')
		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CodeMessage, path = 'quotation/delete', http_method = 'POST', name = 'quotation.delete')
	def quotation_remove(cls, request):

		try:

			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			quotationEntity = ndb.Key(urlsafe = fixedEntityKey)#Obtiene el elemento dado el EntityKey
			quotationEntity.delete() #Delete the quotation
			message = CodeMessage(code = 1, message = 'The quotation was succesfully deleted')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

###############
# QuotationRowAPI
###############
@endpoints.api(name='quotation_row_api', version='v1', description='quotation rows endpoints')
class QuotationRowAPI(remote.Service):

	######## Add quotation row ##########
	@endpoints.method(QuotationRowInput, CodeMessage, path = 'quotationRow/insert', http_method = 'POST', name = 'quotationRow.insert')
	def quotationRow_add(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id'])
			quotationKeyObj = ndb.Key(urlsafe = request.quotationKey)

			myQuotationRow = QuotationRow()

			#Has to be none, otherwise will fail in the call to populate(data)
			request.quotationKey = None

			if myQuotationRow.quotationRow_m(request, user.key, quotationKeyObj) == 0:
				codigo = 1
			else:
				codigo = -3

			message = CodeMessage(code = codigo, message = 'Quotation Row added')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, QuotationRowList, path = 'quotationRow/get', http_method = 'POST', name = 'quotationRow.get')
	def quotationRow_get(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			quotationRowEntity = ndb.Key(urlsafe = fixedEntityKey)
			quotationRow = QuotationRow.get_by_id(quotationRowEntity.id()) #obtiene usuario

			list = []  #crea lista
			listMessage = QuotationRowList(code = 1) # crea objeto mensaje
			list.append(QuotationRowUpdate(token = '',
											userKey = quotationRow.userKey.urlsafe(),
											quotationKey = quotationRow.quotationKey.urlsafe(),
											resourceKey = quotationRow.resourceKey, # This key is saved as a string because it can either be a Personnel key or a Tool key
											iD = quotationRow.iD,
											quantity = quotationRow.quantity,
											days = quotationRow.days,
											amount = quotationRow.amount,
											entityKey = quotationRow.entityKey))

			listMessage.data = list #ASIGNA a la salida la lista
			message = listMessage

		except jwt.DecodeError:
			message = QuotationRowList(code = -1, data = []) #token invalido

		except jwt.ExpiredSignatureError:
			message = QuotationRowList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(Token, QuotationRowList, path = 'quotationRow/list', http_method = 'POST', name = 'quotationRow.list')
	def quotationRow_list(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = QuotationRowList(code = 1) # crea objeto mensaje
			listBd = QuotationRow.query().fetch() # recupera de base de datos

			for i in listBd: # iterate
				list.append(QuotationRowUpdate(token = '',
											userKey = i.userKey.urlsafe(),
											quotationKey = i.quotationKey.urlsafe(),
											resourceKey = i.resourceKey, # This key is saved as a string because it can either be a Personnel key or a Tool key
											iD = i.iD,
											quantity = i.quantity,
											days = i.days,
											amount = i.amount,
											entityKey = i.entityKey))
			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = QuotationRowList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = QuotationRowList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(TokenKey, QuotationRowList, path = 'quotationRow/listByQuotation', http_method = 'POST', name = 'quotationRow.listByQuotation')
	def quotationRow_listByQuotation(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = QuotationRowList(code = 1) # crea objeto mensaje
			quotationKeyObj = ndb.Key(urlsafe = request.quotationKey)
			listBd = QuotationRow.query(QuotationRow.quotationKey == quotationKeyObj).fetch() # get only the quotation rows from that specific quotation

			for i in listBd: # iterate
				list.append(QuotationRowUpdate(token = '',
											userKey = i.userKey.urlsafe(),
											quotationKey = i.quotationKey.urlsafe(),
											resourceKey = i.resourceKey, # This key is saved as a string because it can either be a Personnel key or a Tool key
											iD = i.iD,
											quantity = i.quantity,
											days = i.days,
											amount = i.amount,
											entityKey = i.entityKey))
			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = QuotationRowList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = QuotationRowList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(QuotationRowUpdate, CodeMessage, path='quotationRow/update', http_method='POST', name='quotationRow.update')
	def quotationRow_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			user = User.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py

			quotationRowKeyObj = ndb.Key(urlsafe = request.entityKey)
			quotationRowEntity = quotationRowKeyObj.get()
			
			#replace attributes with those of the request
			quotationKeyObj = ndb.Key(urlsafe = request.quotationKey)
			quotationRowEntity.quotationKey = quotationKeyObj

			quotationRowEntity.resourceKey = request.resourceKey
			quotationRowEntity.iD = request.iD
			quotationRowEntity.quantity = request.quantity
			quotationRowEntity.days = request.days
			quotationRowEntity.amount = request.amount

			#Save the changes in the QuotationRow entity in the DB
			quotationRowEntity.put()

			message = CodeMessage(code = 1, message = 'The quotation row has been updated')
		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CodeMessage, path = 'quotationRow/delete', http_method = 'POST', name = 'quotationRow.delete')
	def quotationRow_remove(cls, request):

		try:

			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			quotationRowEntity = ndb.Key(urlsafe = fixedEntityKey)#Obtiene el elemento dado el EntityKey
			quotationRowEntity.delete() #Delete the quotation row
			message = CodeMessage(code = 1, message = 'The quotation row was succesfully deleted')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')

		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

######################
# AdditionalExpenseAPI
########################
@endpoints.api(name='additional_expense_api', version='v1', description='additional expenses endpoints')
class AdditionalExpenseAPI(remote.Service):

	######## Add additional expense ##########
	@endpoints.method(AdditionalExpenseInput, CodeMessage, path = 'additionalExpense/insert', http_method = 'POST', name = 'additionalExpense.insert')
	def additionalExpense_add(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id'])

			myAdditionalExpense = AdditionalExpense()

			if myAdditionalExpense.additionalExpense_m(request, user.key) == 0:
				codigo = 1
			else:
				codigo = -3

			message = CodeMessage(code = codigo, message = 'Additional Expense added')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, AdditionalExpenseList, path = 'additionalExpense/get', http_method = 'POST', name = 'additionalExpense.get')
	def additionalExpense_get(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			additionalExpenseEntity = ndb.Key(urlsafe = fixedEntityKey)
			additionalExpense = AdditionalExpense.get_by_id(additionalExpenseEntity.id()) #obtiene usuario

			list = []  #crea lista
			listMessage = AdditionalExpenseList(code = 1) # crea objeto mensaje
			list.append(AdditionalExpenseUpdate(token = '',
												userKey = additionalExpense.userKey.urlsafe(),
												quotationKey = additionalExpense.quotationKey.urlsafe(),
												description = additionalExpense.description,
												price = additionalExpense.price,
												comment = additionalExpense.comment,
												entityKey = additionalExpense.entityKey))

			listMessage.data = list #ASIGNA a la salida la lista
			message = listMessage

		except jwt.DecodeError:
			message = AdditionalExpenseList(code = -1, data = []) #token invalido

		except jwt.ExpiredSignatureError:
			message = AdditionalExpenseList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(Token, AdditionalExpenseList, path = 'additionalExpense/list', http_method = 'POST', name = 'additionalExpense.list')
	def additionalExpense_list(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = AdditionalExpenseList(code = 1) # crea objeto mensaje
			listBd = AdditionalExpense.query().fetch() # recupera de base de datos

			for i in listBd: # iterate
				list.append(AdditionalExpenseUpdate(token = '',
													userKey = i.userKey.urlsafe(),
													quotationKey = i.quotationKey.urlsafe(),
													description = i.description,
													price = i.price,
													comment = i.comment,
													entityKey = i.entityKey))

			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = AdditionalExpenseList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = AdditionalExpenseList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(AdditionalExpenseUpdate, CodeMessage, path='additionalExpense/update', http_method='POST', name='additionalExpense.update')
	def additionalExpense_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			user = User.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py
			
			additionalExpenseKeyObj = ndb.Key(urlsafe = request.entityKey)
			additionalExpenseEntity = additionalExpenseKeyObj.get()
			
			#replace attributes with those of the request
			quotationKeyObj = ndb.Key(urlsafe = request.quotationKey)
			additionalExpenseEntity.quotationKey = quotationKeyObj

			additionalExpenseEntity.description = description
			additionalExpenseEntity.price = price
			additionalExpenseEntity.comment = comment

			#Save the changes in the AdditionalExpense entity in the DB
			additionalExpenseEntity.put()

			message = CodeMessage(code = 1, message = 'The additional expense has been updated')
		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CodeMessage, path = 'additionalExpense/delete', http_method = 'POST', name = 'additionalExpense.delete')
	def additionalExpense_remove(cls, request):

		try:

			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			additionalExpenseEntity = ndb.Key(urlsafe = fixedEntityKey)#Obtiene el elemento dado el EntityKey
			additionalExpenseEntity.delete() #Delete the additional expense e
			message = CodeMessage(code = 1, message = 'The additional expense was succesfully deleted')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')

		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

###############
# CustomerAPI
###############
@endpoints.api(name='customer_api', version='v1', description='customers endpoints')
class CustomerAPI(remote.Service):

	######## Add customer ##########
	@endpoints.method(CustomerInput, CodeMessage, path = 'customer/insert', http_method = 'POST', name = 'customer.insert')
	def customer_add(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id'])
			companyKey = user.companyKey

			myCustomer = Customer()

			if myCustomer.customer_m(request, companyKey) == 0:
				codigo = 1
			else:
				codigo = -3

			message = CodeMessage(code = codigo, message = 'The customer was added')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CustomerList, path = 'customer/get', http_method = 'POST', name = 'customer.get')
	def customer_get(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			# fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			customerEntity = ndb.Key(urlsafe = request.entityKey) # The problem is (was?) in request.entityKey
			customer = Customer.get_by_id(customerEntity.id()) #obtiene usuario

			list = []  #crea lista
			listMessage = CustomerList(code = 1) # crea objeto mensaje
			list.append(CustomerUpdate(token = '',
									   companyKey = customer.companyKey.urlsafe(),
									   email = customer.email,
									   name = customer.name,
									   lastName = customer.lastName,
									   rfc = customer.rfc,
									   phone = customer.phone,
									   entityKey = customer.entityKey))

			listMessage.data = list #ASIGNA a la salida la lista
			message = listMessage

		except jwt.DecodeError:
			message = CustomerList(code = -1, data = []) #token invalido

		except jwt.ExpiredSignatureError:
			message = CustomerList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(Token, CustomerList, path = 'customer/list', http_method = 'POST', name = 'customer.list')
	def customer_list(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = CustomerList(code = 1) # crea objeto mensaje
			listBd = Customer.query().fetch() # recupera de base de datos

			for i in listBd: # iterate
				list.append(CustomerUpdate(token = '',
										   companyKey = i.companyKey.urlsafe(),
										   email = i.email,
										   name = i.name,
										   lastName = i.lastName,
										   rfc = i.rfc,
										   phone = i.phone,
										   entityKey = i.entityKey))

			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = CustomerList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = CustomerList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(CustomerUpdate, CodeMessage, path='customer/update', http_method='POST', name='customer.update')
	def customer_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			user = User.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py
			companyKey = user.companyKey

			customerKeyObj = ndb.Key(urlsafe = request.entityKey)
			customerEntity = customerKeyObj.get()
			
			#replace attributes with those of the request
			customerEntity.companyKey = companyKey
			customerEntity.email = request.email
			customerEntity.name = request.name
			customerEntity.lastName = request.lastName
			customerEntity.rfc = request.rfc
			customerEntity.phone = request.phone

			#Save the changes in the Customer entity in the DB
			customerEntity.put()

			message = CodeMessage(code = 1, message = 'The customer has been updated')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CodeMessage, path = 'customer/delete', http_method = 'POST', name = 'customer.delete')
	def customer_remove(cls, request):

		try:

			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			# fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			customerEntity = ndb.Key(urlsafe = request.entityKey)#Obtiene el elemento dado el EntityKey
			customerEntity.delete() #Delete the customer
			message = CodeMessage(code = 1, message = 'The customer was succesfully deleted')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

###############
# ToolAPI
###############
@endpoints.api(name='tool_api', version='v1', description='tools endpoints')
class ToolAPI(remote.Service):

	######## Add tool ##########
	@endpoints.method(ToolInput, CodeMessage, path = 'tool/insert', http_method = 'POST', name = 'tool.insert')
	def tool_add(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id'])
			companyKey = user.companyKey

			myTool = Tool()

			if myTool.tool_m(request, companyKey) == 0:
				codigo = 1
			else:
				codigo = -3

			message = CodeMessage(code = codigo, message = 'The tool was added')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, ToolList, path = 'tool/get', http_method = 'POST', name = 'tool.get')
	def tool_get(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			# fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			toolEntity = ndb.Key(urlsafe = request.entityKey) # TypeError: Incorrect padding -> The problem is in request.entityKey
			tool = Tool.get_by_id(toolEntity.id()) #obtiene usuario

			list = []  #crea lista
			listMessage = ToolList(code = 1) # crea objeto mensaje
			list.append(ToolUpdate(token = '',
								   iD = tool.iD,
								   category = tool.category,
								   kind = tool.kind,
								   brand = tool.brand,
								   model = tool.model,
								   tariff = tool.tariff,
								   tariffTimeUnit = tool.tariffTimeUnit,
								   quantity = tool.quantity,
								   availableQuantity = tool.availableQuantity,
								   comment = tool.comment,
								   entityKey = tool.entityKey))

			listMessage.data = list #ASIGNA a la salida la lista
			message = listMessage

		except jwt.DecodeError:
			message = ToolList(code = -1, data = []) #token invalido

		except jwt.ExpiredSignatureError:
			message = ToolList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(Token, ToolList, path = 'tool/list', http_method = 'POST', name = 'tool.list')
	def tool_list(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = ToolList(code = 1) # crea objeto mensaje
			listBd = Tool.query().fetch() # recupera de base de datos

			for i in listBd: # iterate
				list.append(ToolUpdate(token = '',
									   iD = i.iD,
									   category = i.category,
									   kind = i.kind,
									   brand = i.brand,
									   model = i.model,
									   tariff = i.tariff,
									   tariffTimeUnit = i.tariffTimeUnit,
									   quantity = i.quantity,
									   availableQuantity = i.availableQuantity,
									   comment = i.comment,
									   entityKey = i.entityKey))

			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = ToolList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = ToolList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(ToolUpdate, CodeMessage, path='tool/update', http_method='POST', name='tool.update')
	def tool_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			user = User.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py
			companyKey = user.companyKey

			toolKeyObj = ndb.Key(urlsafe = request.entityKey)
			toolEntity = toolKeyObj.get()
			
			#replace attributes with those of the request
			toolEntity.companyKey = companyKey
			toolEntity.iD = request.iD
			toolEntity.category = request.category
			toolEntity.kind = request.kind
			toolEntity.brand = request.brand
			toolEntity.model = request.model
			toolEntity.tariff = request.tariff
			toolEntity.tariffTimeUnit = request.tariffTimeUnit
			toolEntity.quantity = request.quantity
			toolEntity.availableQuantity = request.availableQuantity
			toolEntity.comment = request.comment

			#Save the changes in the Tool entity in the DB
			toolEntity.put()

			message = CodeMessage(code = 1, message = 'The tool has been successfully updated')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CodeMessage, path = 'tool/delete', http_method = 'POST', name = 'tool.delete')
	def tool_remove(cls, request):

		try:

			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			# fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			toolEntity = ndb.Key(urlsafe = request.entityKey)#Obtiene el elemento dado el EntityKey
			toolEntity.delete() #Delete the tool
			message = CodeMessage(code = 1, message = 'The tool was succesfully deleted')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

###############
# PersonnelAPI
###############
@endpoints.api(name='personnel_api', version='v1', description='personnel endpoints')
class PersonnelAPI(remote.Service):

	######## Add personnel ##########
	@endpoints.method(PersonnelInput, CodeMessage, path = 'personnel/insert', http_method = 'POST', name = 'personnel.insert')
	def personnel_add(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id'])
			companyKey = user.companyKey

			myPersonnel = Personnel()

			if myPersonnel.personnel_m(request, companyKey) == 0:
				codigo = 1
			else:
				codigo = -3

			message = CodeMessage(code = codigo, message = 'The personnel was added')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, PersonnelList, path = 'personnel/get', http_method = 'POST', name = 'personnel.get')
	def personnel_get(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			# fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			personnelEntity = ndb.Key(urlsafe = request.entityKey) # TypeError: Incorrect padding -> The problem is in request.entityKey
			personnel = Personnel.get_by_id(personnelEntity.id()) #obtiene usuario

			list = []  #crea lista
			listMessage = PersonnelList(code = 1) # crea objeto mensaje
			list.append(PersonnelUpdate(token = '',
										companyKey = personnel.companyKey.urlsafe(),
										name = personnel.name,
										lastName = personnel.lastName,
										stage = personnel.stage,
										specialty = personnel.specialty,
										comment = personnel.comment,
										tariff = personnel.tariff,
										tariffTimeUnit = personnel.tariffTimeUnit,
										entityKey = personnel.entityKey))

			listMessage.data = list #ASIGNA a la salida la lista
			message = listMessage

		except jwt.DecodeError:
			message = PersonnelList(code = -1, data = []) #token invalido

		except jwt.ExpiredSignatureError:
			message = PersonnelList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(Token, PersonnelList, path = 'personnel/list', http_method = 'POST', name = 'personnel.list')
	def personnel_list(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = PersonnelList(code = 1) # crea objeto mensaje
			listBd = Personnel.query().fetch() # recupera de base de datos

			for i in listBd: # iterate
				list.append(PersonnelUpdate(token = '',
											companyKey = i.companyKey.urlsafe(),
											name = i.name,
											lastName = i.lastName,
											stage = i.stage,
											specialty = i.specialty,
											comment = i.comment,
											tariff = i.tariff,
											tariffTimeUnit = i.tariffTimeUnit,
											entityKey = i.entityKey))

			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = PersonnelList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = PersonnelList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(PersonnelUpdate, CodeMessage, path='personnel/update', http_method='POST', name='personnel.update')
	def personnel_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			user = User.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py
			companyKey = user.companyKey

			personnelKeyObj = ndb.Key(urlsafe = request.entityKey)
			personnelEntity = personnelKeyObj.get()
			
			#replace attributes with those of the request
			personnelEntity.companyKey = companyKey
			personnelEntity.name = request.name
			personnelEntity.lastName = request.lastName
			personnelEntity.stage = request.stage
			personnelEntity.specialty = request.specialty
			personnelEntity.comment = request.comment
			personnelEntity.tariff = request.tariff
			personnelEntity.tariffTimeUnit = request.tariffTimeUnit

			#Save the changes in the Personnel entity in the DB
			personnelEntity.put()

			message = CodeMessage(code = 1, message = 'The personnel has been successfully updated')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CodeMessage, path = 'personnel/delete', http_method = 'POST', name = 'personnel.delete')
	def personnel_remove(cls, request):

		try:

			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			# fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			personnelEntity = ndb.Key(urlsafe = request.entityKey)#Obtiene el elemento dado el EntityKey
			personnelEntity.delete() #Delete the tool
			message = CodeMessage(code = 1, message = 'The personnel was succesfully deleted')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

###############
# EventAPI
###############
@endpoints.api(name='event_api', version='v1', description='events endpoints')
class EventAPI(remote.Service):

	######## Add event ##########
	@endpoints.method(EventInput, CodeMessage, path = 'event/insert', http_method = 'POST', name = 'event.insert')
	def event_add(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id'])
			companyKey = user.companyKey
			#Get the key object given the customer key
			customerKeyObj = ndb.Key(urlsafe = request.customerKey)
			#Set to None to avoid problems during the call to event_m (request.customerKey is not a Key; it's a string)
			request.customerKey = None

			myEvent = Event()
			# The request's date comes in as 'YYYY-MM-DD', e.g.: '2017-11-23'
			dateStr = request.date
			# Split the date into an array of strings e.g.: '2017-11-23' -> ['2017', '11', '23']
			dateStrArray = dateStr.split("-")
			# Create a date object with the values from that array
			date = datetime(int(dateStrArray[0]), int(dateStrArray[1]), int(dateStrArray[2]))
			#Set the request's date field to None, but pass the recently created date object
			# as a parameter to event_m()
			request.date = None

			if myEvent.event_m(request, companyKey, customerKeyObj, date) == 0:
				codigo = 1
			else:
				codigo = -3

			message = CodeMessage(code = codigo, message = 'The event was added')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, EventList, path = 'event/get', http_method = 'POST', name = 'event.get')
	def event_get(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			# fixedEntityKey = request.entityKey[1:] #The padding error occurs because there was a '\n' character at the beginning of the string
			eventEntity = ndb.Key(urlsafe = request.entityKey) # TypeError: Incorrect padding -> The problem is in request.entityKey
			event = Event.get_by_id(eventEntity.id()) #obtiene usuario

			list = []  #crea lista
			listMessage = EventList(code = 1) # crea objeto mensaje
			list.append(EventUpdate(token = '',
									iD = event.iD,
									name = event.name,
									description = event.description,
									date = event.date.strftime("%d/%m/%Y"), #Change date object to string
									days = event.days,
									place = event.place,
									hidden = event.hidden,
									customerKey = event.customerKey.urlsafe(),
									entityKey = event.entityKey))

			listMessage.data = list #ASIGNA a la salida la lista
			message = listMessage

		except jwt.DecodeError:
			message = EventList(code = -1, data = []) #token invalido

		except jwt.ExpiredSignatureError:
			message = EventList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(Token, EventList, path = 'event/list', http_method = 'POST', name = 'event.list')
	def event_list(cls, request):
		try:

			token = jwt.decode(request.token, 'secret')  #checa token
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			list = []  #create list
			listMessage = EventList(code = 1) # crea objeto mensaje
			listBd = Event.query().fetch() # recupera de base de datos

			for i in listBd: # iterate
				list.append(EventUpdate(token = '',
										iD = i.iD,
										name = i.name,
										description = i.description,
										date = i.date.strftime("%d/%m/%Y"), #Change date object to string
										days = i.days,
										place = i.place,
										hidden = i.hidden,
										customerKey = i.customerKey.urlsafe(),
										entityKey = i.entityKey))

			listMessage.data = list
			message = listMessage

		except jwt.DecodeError:
			message = EventList(code = -1, data = []) #token invalido
		except jwt.ExpiredSignatureError:
			message = EventList(code = -2, data = []) #token expiro

		return message

	@endpoints.method(EventUpdate, CodeMessage, path='event/update', http_method='POST', name='event.update')
	def event_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			companyKey = user.companyKey
			customerEntity = ndb.Key(urlsafe = request.customerKey)

			eventKeyObj = ndb.Key(urlsafe = request.entityKey)
			eventEntity = eventKeyObj.get()
			
			#replace attributes with those of the request
			eventEntity.iD = request.iD
			eventEntity.name = request.name
			eventEntity.description = request.description

			# The request's date comes in as 'YYYY-MM-DD', e.g.: '2017-11-23'
			dateStr = request.date
			# Split the date into an array of strings e.g.: '2017-11-23' -> ['2017', '11', '23']
			dateStrArray = dateStr.split("-")
			# Create a date object with the values from that array -> datetime(year, month, day)
			date = datetime(int(dateStrArray[0]), int(dateStrArray[1]), int(dateStrArray[2]))
			# Finally, place the new date in the entity
			eventEntity.date = date

			eventEntity.days = request.days
			eventEntity.place = request.place
			eventEntity.hidden = request.hidden
			eventEntity.customerKey = request.customerKey
			
			#Save the changes in the Event entity in the DB
			eventEntity.put()

			message = CodeMessage(code = 1, message = 'The event was successfully updated')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(TokenKey, CodeMessage, path = 'event/delete', http_method = 'POST', name = 'event.delete')
	def event_remove(cls, request):

		try:

			token = jwt.decode(request.token, 'secret') #CHECA EL TOKEN
			eventEntity = ndb.Key(urlsafe = request.entityKey)#Obtiene el elemento dado el EntityKey
			eventEntity.delete() #Delete the event
			message = CodeMessage(code = 1, message = 'The event was succesfully deleted')

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

			token = jwt.decode(request.token, 'secret')  #checa token
			userEntity = ndb.Key(urlsafe = request.entityKey)
			user = User.get_by_id(userEntity.id()) #obtiene usuario
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

			token = jwt.decode(request.token, 'secret')  #checa token
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

			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
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
				if user.usuario_m(request, user.empresa_key) == 0:#llama a la funcion declarada en models.py
					codigo = 1
				else:
					codigo = -3

				message = CodeMessage(code = codigo, message = 'The user was succesfully added')

			else:
				message = CodeMessage(code = -4, message = 'That email has already been registered')

		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')

		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(EmailPassword, TokenMessage, path='user/login', http_method='POST', name='user.login')
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
			user = User.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py
			companyKey = ndb.Key(urlsafe = user.companyKey.urlsafe())#convierte el string dado a entityKey

			userKeyObj = ndb.Key(urlsafe = request.entityKey)
			userEntity = userKeyObj.get()
			
			#replace attributes with those of the request
			userEntity.companyKey = companyKey
			userEntity.email = request.email
			userEntity.password = request.password
			userEntity.name = request.name
			userEntity.lastName = request.lastName

			#Save the changes in the User entity in the DB
			userEntity.put()

			message = CodeMessage(code = 1, message = 'The user was successfully updated')

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

	@endpoints.method(TokenKey, CompanyList, path='empresa/get', http_method='POST', name='empresa.get')
	def company_get(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			companyEntity = ndb.Key(urlsafe = request.entityKey)
			message = CompanyList(code = 1,
								  data = [CompanyUpdate(token='Successful get',
														entityKey = companyEntity.get().entityKey,
														code = companyEntity.get().code,
														name = companyEntity.get().name)])

		except jwt.DecodeError:
			message = CompanyList(code = -1, data = [])
		except jwt.ExpiredSignatureError:
			message = CompanyList(code = -2, data = [])

		return message

	@endpoints.method(TokenKey, CodeMessage, path='empresa/delete', http_method='POST', name='empresa.delete')
	def company_remove(cls, request):

		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			empresaentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
			empresaentity.delete()#BORRA
			message = CodeMessage(code=1, message='Succesfully deleted')

		except jwt.DecodeError:
			message = CodeMessage(code=-2, message='Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code=-1, message='Token expired')

		return message

	@endpoints.method(CompanyInput, CodeMessage, path='empresa/insert', http_method='POST', name='empresa.insert')
	def company_add(cls, request):
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
	def company_update(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py

			companyKeyObj = ndb.Key(urlsafe = request.entityKey)
			companyEntity = companyKeyObj.get()
			
			#replace attributes with those of the request
			companyEntity.code = request.code
			companyEntity.name = request.name

			#Save the changes in the Company entity in the DB
			companyEntity.put()

			message = CodeMessage(code = 1, message = 'The company was successfully updated')
		except jwt.DecodeError:
			message = CodeMessage(code = -2, message = 'Invalid token')
		except jwt.ExpiredSignatureError:
			message = CodeMessage(code = -1, message = 'Token expired')

		return message

	@endpoints.method(Token, CompanyList, path='empresa/list', http_method='POST', name='empresa.list')
	def company_list(cls, request):
		try:
			token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
			user = User.get_by_id(token['user_id']) #obtiene usuario dado el token
			lista = [] #crea lista para guardar contenido de la BD
			lstMessage = CompanyList(code = 1) #CREA el mensaje de salida
			lstBdCompany = Company.query().fetch() #obtiene de la base de datos

			for i in lstBdCompany: #recorre la base de datos
				lista.append(CompanyUpdate(token = '',
										   code = i.code,
										   name = i.name))

			lstMessage.data = lista #ASIGNA a la salida la lista
			message = lstMessage
		except jwt.DecodeError:
			message = CompanyList(code = -1, data = [])
		except jwt.ExpiredSignatureError:
			message = CompanyList(code = -2, data = [])

		return message

application = endpoints.api_server([UserAPI,
								    CompanyAPI,
									QuotationAPI,
									QuotationRowAPI,
									AdditionalExpenseAPI,
									CustomerAPI,
									ToolAPI,
									PersonnelAPI,
									EventAPI], restricted = False)
