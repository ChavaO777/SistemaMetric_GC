function Customer(entityKey,
                  companyKey, 
                  email, 
                  name, 
                  lastName, 
                  rfc, 
                  phone) {
    
    this.entityKey = entityKey;
    this.companyKey = companyKey;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.rfc = rfc;
    this.phone = phone;

    this.toString() = function() {

        return JSON.stringify(this);
    };
};

function TokenObject() {
    
    this.token = sessionStorage.token;
    
    this.toJsonString = function () { 
        
        return JSON.stringify(this); 
    };
};

function createCustomer() {
    
    var myCompanyKey = null;
    var myEmail = $('#email').val();
    var myName = $('#name').val();
    var myLastName = $('#lastName').val();
    var myRfc = $('#rfc').val();
    var myPhone = $('#phone').val();

    var customer = new Customer(companyKey = myCompanyKey,
                                email = myEmail,
                                name = myName,
                                lastName = myLastName,
                                rfc = myRfc,
                                phone = myPhone);

    try{
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/customer_api/v1/customer/insert",
            data: customer.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The customer was successfully created.");
            },
            error: function (error) {
                
                alert(error);
            }
        });
    }
    catch(error){
      
        alert(error);
    }
}

function getCustomer() {
    
    try{

        var urlVariables = getURLVariables();
        customerKey = urlVariables.propertyID;
        var myCustomer = new Customer(entityKey = customerKey);

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/customer_api/v1/customer/get",
            data: customer.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");

                totalCustomers = response.data;

                // Do a forEach even if the array only has one customer
                totalCustomers.forEach(function(customer){

                    //Place the content in the HTML
                });
            },
            error: function (error) {
                
                alert(error);
            }
        });
    }
    catch(error){
      
        alert(error);
    }
}

function listCustomers() {
    
    try{
        
        // alert("token : " + sessionStorage.token);
        var myData = new TokenObject();

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/customer_api/v1/customer/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");

                $("#listCustomers").empty();
                var totalCustomers = response.data;
                // alert(JSON.stringify(response.data));

                var myListCustomers = "";

                // Do a forEach even if the array only has one customer
                totalCustomers.forEach(function(customer){

                    //Place the content in the HTML

                    // alert(customer);

                    myListCustomers += "<div class='hero-element'>" +
                                            "<div class='hero-content-inner'>" +
                                                "<p>" + customer.email + "</p>" + 
                                                "<p>" + customer.name + " " + customer.lastName + "</p>" + 
                                                "<p>" + customer.phone + "</p>" + 
                                                "<p>" + customer.rfc + "</p>" + 
                                        "</div>";
                });

                $("#listCustomers").append(myListCustomers);
            },
            error: function (error) {
                
                alert(error);
            }
        });
    }
    catch(error){
      
        alert(error);
    }
}

function getURLVariables() {
    
    var vars = {};
     
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         
         vars[key] = value;
    });
 
    return vars;
}
