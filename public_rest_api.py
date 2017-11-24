import webapp2
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from google.appengine.api import images
from google.appengine.ext import blobstore
import cloudstorage
import mimetypes
import json
import os
import jinja2

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

jinja_env = jinja2.Environment(
    loader = jinja2.FileSystemLoader(os.path.dirname(__file__)))

class DemoClass(object):
    pass

def MyClass(obj):
    return obj.__dict__

###########################################################################     

class MainHandler(webapp2.RequestHandler):

    def get(self):

        template_context = {}
        self.response.out.write(
            self._render_template('./frontend/public/index.html', template_context))

    def _render_template(self, template_name, context=None):
        if context is None:
            context = {}

        template = jinja_env.get_template(template_name)
        return template.render(context)

class LoginHandler(webapp2.RequestHandler):

    def get(self):

        template_context = {}
        self.response.out.write(
            self._render_template('./frontend/public/login.html', template_context))

    def _render_template(self, template_name, context=None):
        if context is None:
            context = {}

        template = jinja_env.get_template(template_name)
        
        return template.render(context)

class myCustomersHandler(webapp2.RequestHandler):

    def get(self):

        template_context = {}
        self.response.out.write(
            self._render_template('./frontend/public/customer/myCustomers.html', template_context))

    def _render_template(self, template_name, context=None):
        if context is None:
            context = {}

        template = jinja_env.get_template(template_name)
        
        return template.render(context)

class CustomerHandler(webapp2.RequestHandler):

    def get(self):

        template_context = {}
        self.response.out.write(
            self._render_template('./frontend/public/customer/customer.html', template_context))

    def _render_template(self, template_name, context=None):
        if context is None:
            context = {}

        template = jinja_env.get_template(template_name)
        
        return template.render(context)

class AddCustomerHandler(webapp2.RequestHandler):

    def get(self):

        template_context = {}
        self.response.out.write(
            self._render_template('./frontend/public/customer/addCustomer.html', template_context))

    def _render_template(self, template_name, context=None):
        if context is None:
            context = {}

        template = jinja_env.get_template(template_name)
        
        return template.render(context)

class EditCustomerHandler(webapp2.RequestHandler):

    def get(self):

        template_context = {}
        self.response.out.write(
            self._render_template('./frontend/public/customer/editCustomer.html', template_context))

    def _render_template(self, template_name, context=None):
        if context is None:
            context = {}

        template = jinja_env.get_template(template_name)
        
        return template.render(context)

class myPersonnelHandler(webapp2.RequestHandler):

    def get(self):

        template_context = {}
        self.response.out.write(
            self._render_template('./frontend/public/personnel/myPersonnel.html', template_context))

    def _render_template(self, template_name, context=None):
        if context is None:
            context = {}

        template = jinja_env.get_template(template_name)
        
        return template.render(context)

class UpHandler(webapp2.RequestHandler):
    
    def _get_urls_for(self, file_name):
        
        bucket_name = app_identity.get_default_gcs_bucket_name()
        path = os.path.join('/', bucket_name, file_name)
        real_path = '/gs' + path
        key = blobstore.create_gs_key(real_path)
        
        try:
            url = images.get_serving_url(key, size=0)
        except images.TransformationError, images.NotImageError:
            url = "http://storage.googleapis.com{}".format(path)

        return url


    def post(self):
        self.response.headers.add_header('Access-Control-Allow-Origin', '*')
        self.response.headers['Content-Type'] = 'application/json'

        bucket_name = app_identity.get_default_gcs_bucket_name()
        uploaded_file = self.request.POST.get('uploaded_file')
        file_name = getattr(uploaded_file, 'filename', None)
        file_content = getattr(uploaded_file, 'file', None)
        real_path = ''

        if file_name and file_content:
            content_t = mimetypes.guess_type(file_name)[0]
            real_path = os.path.join('/', bucket_name, file_name)

        with cloudstorage.open(real_path, 'w', content_type=content_t,
        options={'x-goog-acl': 'public-read'}) as f:
            f.write(file_content.read())

        key = self._get_urls_for(file_name)
        self.response.write(key)

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/login', LoginHandler),
    ######### CUSTOMER ########
    ('/myCustomers', myCustomersHandler),
    ('/customer', CustomerHandler),
    ('/addCustomer', AddCustomerHandler),
    ('/editCustomer', EditCustomerHandler),
    ######### PERSONNEL ########
    ('/myPersonnel', myPersonnelHandler),
    ('/up', UpHandler)
], debug = True)
