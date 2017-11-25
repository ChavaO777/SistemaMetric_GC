class Event {
    
        constructor(token,
                    entityKey,
                    companyKey, 
                    email, 
                    name, 
                    lastName, 
                    rfc, 
                    phone) {
    
            this.token = sessionStorage.token;
            this.entityKey = entityKey;
            this.companyKey = companyKey;
            this.email = email;
            this.name = name;
            this.lastName = lastName;
            this.rfc = rfc;
            this.phone = phone;
        }
    
        toString(){
            
            return JSON.stringify(this);
        };
      }
      
    function TokenObject() {
        
        this.token = sessionStorage.token;
        
        this.toJsonString = function () { 
            
            return JSON.stringify(this); 
        };
    };
    
    function createCustomer() {
        
        var myEmail = $('#email').val();
        var myName = $('#name').val();
        var myLastName = $('#lastName').val();
        var myRfc = $('#rfc').val();
        var myPhone = $('#phone').val();
    
        var customer = new Event();
        customer.email = myEmail;
        customer.name = myName;
        customer.lastName = myLastName;
        customer.rfc = myRfc;
        customer.phone = myPhone;
    
        alert(customer.toString());
    
        try{
            jQuery.ajax({
                type: "POST",
                url: "http://localhost:8080/_ah/api/customer_api/v1/customer/insert",
                data: customer.toString(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                before: function(){
                    
                    // $(".msg").html("<p>Esperando respuesta...</p>");
                },
                success: function (response) {
                    
                    // $(".msg").html("<p>Herramienta creado</p>");
                    alert("The customer was successfully created.");
                    window.location = "/myCustomers";
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
    
    function editCustomer() {
        
        var urlVariables = getURLVariables();
        var customerKey = urlVariables.customerID;
    
        var myEmail = $('#email').val();
        var myName = $('#name').val();
        var myLastName = $('#lastName').val();
        var myRfc = $('#rfc').val();
        var myPhone = $('#phone').val();
    
        var customer = new Event();
        customer.entityKey = customerKey;
        customer.email = myEmail;
        customer.name = myName;
        customer.lastName = myLastName;
        customer.rfc = myRfc;
        customer.phone = myPhone;
    
        alert(customer.toString());
    
        try{
            jQuery.ajax({
                type: "POST",
                url: "http://localhost:8080/_ah/api/customer_api/v1/customer/update",
                data: customer.toString(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                before: function(){
                    
                    // $(".msg").html("<p>Esperando respuesta...</p>");
                },
                success: function (response) {
                    
                    // $(".msg").html("<p>Herramienta creado</p>");
                    alert("The customer was successfully updated.");
                    window.location = "/myCustomers";
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
    
    function deleteCustomer() {
        
        var urlVariables = getURLVariables();
        var customerKey = urlVariables.customerID;
    
        var customer = new Event();
        customer.entityKey = customerKey;
    
        alert(customer.toString());
    
        try{
            jQuery.ajax({
                type: "POST",
                url: "http://localhost:8080/_ah/api/customer_api/v1/customer/delete",
                data: customer.toString(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                before: function(){
                    
                    // $(".msg").html("<p>Esperando respuesta...</p>");
                },
                success: function (response) {
                    
                    // $(".msg").html("<p>Herramienta creado</p>");
                    alert("The customer was successfully deleted.");
                    window.location = "/myCustomers";
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
            var customerKey = urlVariables.customerID;
            alert("customerKey = " + customerKey);
            var myCustomer = new Event(token = sessionStorage.token,
                                          entityKey = customerKey);
    
            jQuery.ajax({
                type: "POST",
                url: "http://localhost:8080/_ah/api/customer_api/v1/customer/get",
                data: myCustomer.toString(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                before: function(){
                    
                    // $(".msg").html("<p>Esperando respuesta...</p>");
                },
                success: function (response) {
                    
                    // $(".msg").html("<p>Message</p>");
    
                    $("#singleCustomer").empty();
                    totalCustomers = response.data;
    
                    var myCustomer = "";
    
                    // Do a forEach even if the array only has one customer
                    totalCustomers.forEach(function(customer){
    
                        //Place the content in the HTML
    
                        myCustomer +=  "<div class='hero-element'>" +
                                            "<div class='hero-content-inner'>" +
                                                "<form action='/editCustomer' method='GET'>" +
                                                    "<p>" + customer.email + "</p>" + 
                                                    "<p>" + customer.name + " " + customer.lastName + "</p>" + 
                                                    "<p>" + customer.phone + "</p>" + 
                                                    "<p>" + customer.rfc + "</p>" +
                                                    "<input type='hidden' name=customerID value='" + customer.entityKey + "'/>" +
                                                    "<input type='submit' value='Editar'/>" + 
                                                "</form>" +
                                            "</div>" +
                                        "</div>"
                    });
    
                    myCustomer +=   "<div class='fixed-buttons'>" + 
                                        "<a onclick='deleteCustomer()' class='big-fixed btn-circle btn-red'><i class='fa fa-minus' aria-hidden='true'></i></a>" +
                                    "</div>"
    
                    $("#singleCustomer").append(myCustomer);
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
    
    function getCustomerData() {
        
        try{
    
            var urlVariables = getURLVariables();
            var customerKey = urlVariables.customerID;
            alert("customerKey = " + customerKey);
            var myCustomer = new Event(token = sessionStorage.token,
                                          entityKey = customerKey);
    
            jQuery.ajax({
                type: "POST",
                url: "http://localhost:8080/_ah/api/customer_api/v1/customer/get",
                data: myCustomer.toString(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                before: function(){
                    
                    // $(".msg").html("<p>Esperando respuesta...</p>");
                },
                success: function (response) {
                    
                    // $(".msg").html("<p>Message</p>");
                    totalCustomers = response.data;
    
                    $("#name").empty();
                    $("#lastName").empty();
                    $("#email").empty();
                    $("#rfc").empty();
                    $("#phone").empty();
    
                    // Do a forEach even if the array only has one customer
                    totalCustomers.forEach(function(customer){
    
                        alert(customer.toString());
    
                        $("#name").val(customer.name);
                        $("#lastName").val(customer.lastName);
                        $("#email").val(customer.email);
                        $("#rfc").val(customer.rfc);
                        $("#phone").val(customer.phone);
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
    
                    var myListCustomers = "";
    
                    if(totalCustomers == null){
    
                        myListCustomers += "<div class='hero-element'>" +
                                                "<div class='hero-content-inner'>" +
                                                    "<p> No hay clientes registrados </p>" + 
                                                "</div>" +
                                            "</div>"
                    }
    
                    else{
    
                        alert(JSON.stringify(response.data));
    
                        // Do a forEach even if the array only has one customer
                        totalCustomers.forEach(function(customer){
                            
                            //Place the content in the HTML
        
                            // alert(customer);
        
                            myListCustomers += "<div class='hero-element'>" +
                                                    "<div class='hero-content-inner'>" +
                                                        "<form action='/customer' method='GET'>" +
                                                            "<p>" + customer.email + "</p>" + 
                                                            "<p>" + customer.name + " " + customer.lastName + "</p>" + 
                                                            "<p>" + customer.phone + "</p>" + 
                                                            "<p>" + customer.rfc + "</p>" +
                                                            "<input type='hidden' name=customerID value='" + customer.entityKey + "'/>" +
                                                            "<input type='submit' value='Ver detalle'/>" + 
                                                        "</form>" +
                                                    "</div>" +
                                                "</div>"
                        });
                    }
    
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
    