class Quotation {

    constructor(token,
                entityKey,
                eventKey,
                iD,
                date,
                isFinal,
                revenueFactor,
                iva,
                discount,
                metricPlus,
                version) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.eventKey = eventKey;
        this.iD = iD;
        this.date = date;
        this.isFinal = isFinal;
        this.revenueFactor = revenueFactor;
        this.iva = iva;
        this.discount = discount;
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
    try{
        var urlVariables = getURLVariables();
        var quotationKey = urlVariables.quotationID;
        var myQuotation = new Quotation();
        myQuotation.entityKey = quotationKey;

        // alert(myQuotation.toString());

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/quotation_api/v1/quotation/get",
            data: myQuotation.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                // $(".msg").html("<p>Message</p>");
                totalQuotations = response.data;
                
                alert("quotation retrieved " + JSON.stringify(totalQuotations));
                /*
                $("#singleQuotation").empty();
                $("$userKey").empty();
                $("$eventKey").empty();
                $("$iD").empty();
                $("$date").empty();
                $("$isFinal").empty();
                $("$subtotal").empty();
                $("$revenueFactor").empty();
                $("$iva").empty();
                $("$discount").empty();
                $("$total").empty();
                $("$metricPlus").empty();
                $("$version").empty();
                */
                var myQuotation = "";
                // Do a forEach even if the array only has one quotation
                totalQuotations.forEach(function(quotation){
                    //add data to the form
                    /*
                    $("$userKey").val(quotation.userKey);
                    $("$eventKey").val(quotation.eventKey);
                    $("$iD").val(quotation.iD);
                    $("$date").val(quotation.date);
                    $("$isFinal").val(quotation.isFinal);
                    $("$subtotal").val(quotation.subtotal);
                    $("$revenueFactor").val(quotation.revenueFactor);
                    $("$iva").val(quotation.iva);
                    $("$discount").val(quotation.discount);
                    $("$total").val(quotation.total);
                    $("$metricPlus").val(quotation.metricPlus);
                    $("$version").val(quotation.version);
                    */
                    //Place the content in the HTML
                    // alert(quotation);
                    myQuotation += "<div class='box'> \n" +
                                    "<script>getCompanyEventName('" + quotation.eventKey + "',0)</script>" +
                                    "\t<div class='box-name'>\n" +
                                    "\t\t<div id=companyEvent0></div> - " + quotation.date +
                                    "\t</div>" +
                                    "\t<div class='box-content'>\n" +
                                    "<p id=companyEvent0></p>" +
                                    "<p id=customer0></p>" +
                                    "<p>ID: " + quotation.iD + "</p>" +
                                    "<p>Fecha: " + quotation.date + "</p>" +
                                    "<p>Versión final: " + (quotation.isFinal ? "Sí" : "No") + "</p>" +
                                    "<p>Total: COMPUTE QUOTATION TOTAL MXN</p>" +
                                    "<p>Versión: " + quotation.version + "</p>" +
                                    "<p><a href='javascript:showForm();' class='btn-rectangle btn-blue'>Editar</a></p>"+
                                    "\t<form action='/quotation' method='GET'>\n" +
                                    "<input type='hidden' name=quotationID value='"+ quotation.entityKey + "'/>" +
                                    "\t</form>" +
                                    "\t</div>" +
                                    "</div>";

                    getQuotationRows(quotation.entityKey);
                });
                $("#singleQuotation").append(myQuotation);
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
                        'revenueFactor',
                        'iva',
                        'discount',
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
                                                        "<p>Total: COMPUTE QUOTATION TOTAL MXN</p>" +
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
                    getCustomerNameForQuotation(event.customerKey, counter);
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

function getCustomerNameForQuotation(customerKey, counter){

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
function getQuotationRows(quotationKey){

    try{
        var myQuotation = new Quotation();
        myQuotation.entityKey = quotationKey;

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/quotation_row_api/v1/quotationRow/listByQuotation",
            data: myQuotation.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){

                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {

                // $(".msg").html("<p>Message</p>");

                totalQuotationRows = response.data;
                myListQuotationRows = "";
                quotationRowCounter = 0;
                // Do a forEach even if the array only has one row
                totalQuotationRows.forEach(function(quotationRow){

                    //Place the content in the HTML
                    // alert(tool);
                    myListQuotationRows += "<div class='box'> \n" +
                                    "<script>getPersonnelData1('" + quotationRow.resourceKey + "','" + quotationRowCounter + "');</script>" +
                                    "<script>getToolData('" + quotationRow.resourceKey + "','" + quotationRowCounter + "');</script>" +
                                    "\t<div class='box-name'>\n" +
                                    // should show resource data (specific to tool/personnel)
                                    "\t\t<p id=toolName" + quotationRowCounter +"></p>" +
                                    "\t\t<p id=personnelName" + quotationRowCounter +"></p>" +
                                    "\t</div>" +
                                    "\t<div class='box-content'>\n" +
                                    "\t\t<p>Cantidad: " + quotationRow.quantity + "</p>" +
                                    "\t\t<p id=entityTariff" + quotationRowCounter + ">Cargo: </p>" +
                                    "\t\t<p id=entityTariffTimeUnit" + quotationRowCounter + ">Por: </p>" +
                                    "\t<form action='/quotationRow' method='GET'>\n" +
                                    "<input type='hidden' name=quotationRowID value='"+ quotationRow.entityKey + "'/>" +
                                    "<input type='submit' value='Ver detalle' class='btn-rectangle btn-blue'/>" +
                                    "\t</form>" +
                                    "\t</div>" +
                                    "</div>";

                    quotationRowCounter += 1;
                });
                
                $("#quotationRows").append(myListQuotationRows);
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
function getToolData(toolKey, counter){

    try{
        // alert("companyEventKey = " + companyEventKey);
          var myTool = new Tool(token = sessionStorage.token, entityKey = toolKey);

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/tool_api/v1/tool/get",
            data: myTool.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){

                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {

                // $(".msg").html("<p>Message</p>");

                totalTools = response.data;
                //$("#companyEvent" + counter).empty();

                // Do a forEach even if the array only has one event

                if(totalTools != null){

                    totalTools.forEach(function(tool){
                        
                        $("#toolName" + counter).append(tool.brand + " " + tool.model);
                        $("#entityTariff" + counter).append(tool.tariff + " MXN");
                        $("#entityTariffTimeUnit" + counter).append(tool.tariffTimeUnit);
                    });
                }
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
function getPersonnelData1(personnelKey, counter){

    try{
        var myPersonnel = new Personnel();
        myPersonnel.entityKey = personnelKey;

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/get",
            data: myPersonnel.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){

                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {

                // $(".msg").html("<p>Message</p>");

                totalPersonnel = response.data;
                //$("#companyEvent" + counter).empty();

                alert(JSON.stringify(totalPersonnel));

                if(totalPersonnel != null){

                    // Do a forEach even if the array only has one event
                    totalPersonnel.forEach(function(personnel){
    
                        $("#personnelName" + counter).append(personnel.name + " " + personnel.lastName);
                        $("#entityTariff" + counter).append(personnel.tariff + " MXN");
                        $("#entityTariffTimeUnit" + counter).append(personnel.tariffTimeUnit);
                    });
                }
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
