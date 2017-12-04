class Quotation {
    
    constructor(token,
                userKey, 
                eventKey,
                iD,
                date,
                isFinal,
                subtotal,
                revenueFactor,
                iva,
                discount,
                total,
                metricPlus,
                version) {
        
        this.token = sessionStorage.token;
        this.userKey = userKey;
        this.eventKey = eventKey;
        this.iD = iD;
        this.date = date;
        this.isFinal = isFinal;
        this.subtotal = subtotal;
        this.revenueFactor = revenueFactor;
        this.iva = iva;
        this.discount = discount;
        this.total = total;
        this.metricPlus = metricPlus;
        this.version = version;
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

function createQuotation() {
    
}

function deleteQuotation() {
    
}

function getQuotation() {
    
}

function listQuotations() {
    
    try{
        
        // alert("token : " + sessionStorage.token);
        var myData = new TokenObject();

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/quotation_api/v1/quotation/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");

                $("#quotationsList").empty();
                var totalQuotations = response.data;
                var myQuotationsList = "";

                if(totalQuotations == null){
                    
                    myQuotationsList += "<div class='hero-element'>" +
                                            "<div class='hero-content-inner'>" +
                                                "<p> No hay cotizaciones registradas </p>" + 
                                            "</div>" +
                                        "</div>";
                }

                else{

                    // A counter used to know where (which quotation) to assign the name of the customer given its entityKey
                    var quotationCounter = 0;

                    alert(JSON.stringify(totalQuotations));

                    // Do a forEach even if the array only has one quotation
                    totalQuotations.forEach(function(quotation){
                    
                        //Place the content in the HTML
                        // alert(quotation);

                        'userKey', 
                        'eventKey',
                        'iD', 
                        'date',
                        'isFinal',
                        'subtotal',
                        'revenueFactor',
                        'iva',
                        'discount',
                        'total',
                        'metricPlus',
                        'version'

                        myQuotationsList += "<div class='hero-element'>" +
                                                "<div class='hero-content-inner'>" +
                                                    "<form action='/quotation' method='GET'>" +
                                                        "<script>getCompanyEventName('" + quotation.eventKey + "'," + quotationCounter + ")</script>" +
                                                        "<p id=companyEvent" + quotationCounter + "></p>" + 
                                                        "<p id=customer" + quotationCounter + "></p>" + 
                                                        "<p>ID: " + quotation.iD + "</p>" +
                                                        "<p>Fecha: " + quotation.date + "</p>" + 
                                                        "<p>Versión final: " + quotation.isFinal + "</p>" + 
                                                        "<p>Total: " + quotation.total + " MXN</p>" + 
                                                        "<p>Versión: " + quotation.version + "</p>" + 
                                                        "<input type='hidden' name=quotationID value='" + quotation.entityKey + "'/>" +
                                                        "<input type='submit' value='Ver detalle'/>" + 
                                                    "</form>" +
                                                "</div>" +
                                            "</div>";

                        quotationCounter += 1;
                    });
                }

                $("#quotationsList").append(myQuotationsList);
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

function getCompanyEventName(companyEventKey, counter){
    
    try{
        // alert("companyEventKey = " + companyEventKey);
        var myCompanyEvent = new CompanyEvent(token = sessionStorage.token, entityKey = companyEventKey);

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/event_api/v1/event/get",
            data: myCompanyEvent.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");

                totalEvents = response.data;
                $("#companyEvent" + counter).empty();

                // Do a forEach even if the array only has one event
                totalEvents.forEach(function(event){

                    $("#companyEvent" + counter).append("Evento: " + event.name);
                    getCustomerName(event.customerKey, counter);
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

function getCustomerName(customerKey, counter){
    
    try{
        // alert("customerKey = " + customerKey);
        var myCustomer = new Customer();
        myCustomer.token = sessionStorage.token;
        myCustomer.entityKey = customerKey;

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
                $("#customer" + counter).empty();

                // Do a forEach even if the array only has one customer
                totalCustomers.forEach(function(customer){

                    $("#customer" + counter).append("Cliente: " + customer.name + " " + customer.lastName);
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
