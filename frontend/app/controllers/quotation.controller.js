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

    var myId = $('#id').val();
    var myDate = $('#date').val();
    var myEventKey = $('#eventList').val();
    var myDiscount = $("#discount").val();
    var myVersion = $("#version").val();
    var myIsFinal = $("input:radio[name=isFinal]:checked").val();;
    var myIva = $("#iva").val();
    var myMetricPlus = $("#metricPlus").val();
    var myRevenueFactor = $("#revenueFactor").val();

    var quotation = new Quotation();
    quotation.iD = myId;
    quotation.date = myDate;
    quotation.eventKey = myEventKey;
    quotation.discount = myDiscount;
    quotation.version = myVersion;
    quotation.iva = myIva;
    quotation.metricPlus = myMetricPlus;
    quotation.isFinal = myIsFinal==="false"?false:true;

    try {
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/quotation_api/v1/quotation/insert",
            data: quotation.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function () {

            },
            success: function (response) {
                // $(".msg").html("<p>Herramienta creado</p>");
                console.log("The quotation was successfully created.");
                window.location = "/myQuotations";
            },
            error: function (error) {

                console.log("Not possible");
            }
        });
    }
    catch (error) {

        alert(error);
    }
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
                
                console.log("quotation retrieved " + JSON.stringify(totalQuotations));
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
                var myQuotationStr = "";
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
                    myQuotationStr += "<div class='quotationBox'> \n" +
                                    "<script>getCompanyEventName('" + quotation.eventKey + "',0)</script>" +
                                    "\t<div class='quotationBox-name'>" +
                                    "\t\t<div id=companyEvent0></div>" +
                                    "\t</div>" +
                                    "\t<div class='quotationBox-content'>\n" +
                                    "<p id=companyEvent0></p>" +
                                    "<p id=customer0></p>" +
                                    "<p><b>ID:</b> " + quotation.iD + "</p>" +
                                    "<p><b>Fecha:</b> " + quotation.date + "</p>" + 
                                    "<p><br><br></p>";

                    var myQuotationBottomStr =  "<p><br><br></p>" +
                                                "<p><b>Versión:</b> " + quotation.version + "</p>" +
                                                "<p><b>Versión final:</b> " + (quotation.isFinal ? "Sí" : "No") + "</p>" +
                                                "<p><b>Total:</b> COMPUTE QUOTATION TOTAL MXN</p>" +
                                                "<p><br></p>" +
                                                "<p><a href='javascript:showForm();' class='btn-rectangle btn-blue'>Editar</a></p>"+
                                                "\t<form action='/quotation' method='GET'>\n" +
                                                "<input type='hidden' name=quotationID value='"+ quotation.entityKey + "'/>" +
                                                "\t</form>" +
                                                "\t</div>" +
                                                "</div>";

                    getQuotationRows(quotation.entityKey, myQuotationStr, myQuotationBottomStr);
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

                    console.log(JSON.stringify(totalQuotations));

                    // Do a forEach even if the array only has one quotation
                    totalQuotations.forEach(function(quotation){

                        //Place the content in the HTML
                        // alert(quotation);
                       
                        myQuotationsList += "<div class='hero-element'>" +
                                                "<div class='box'>" +
                                                    "<form action='/quotation' method='GET'>" +
                                                        "<script>getCompanyEventName('" + quotation.eventKey + "','" + quotationCounter + "')</script>" +
                                                        "<div class='box-name'><p id=companyEvent" + quotationCounter + "></p></div>" +
                                                        "<div class='box-content'>" +
                                                            "<p id=customer" + quotationCounter + "></p>" +
                                                            "<p>ID: " + quotation.iD + "</p>" +
                                                            "<p>Fecha: " + quotation.date + "</p>" +
                                                            "<p>Versión final: " + quotation.isFinal + "</p>" +
                                                            "<p>Total: COMPUTE QUOTATION TOTAL MXN</p>" +
                                                            "<p>Versión: " + quotation.version + "</p>" +
                                                            "<input type='hidden' name=quotationID value='" + quotation.entityKey + "'/>" +
                                                            "<input type='submit' value='Ver detalle'/>" +
                                                        "</div>" +
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

                    $("#companyEvent" + counter).append("<b>Evento:</b> " + event.name);
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

                    $("#customer" + counter).append("<b>Cliente:</b> " + customer.name + " " + customer.lastName);
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
function getQuotationRows(quotationKey, myQuotationStr, myQuotationBottomStr){

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

                console.log("myQuotationStr = " + myQuotationStr);

                totalQuotationRows = response.data;
                var quotationTable = "";
                quotationRowCounter = 0;

                if(totalQuotationRows == null){

                    quotationTable += "<p>No hay elementos en esta cotización</p>";
                }

                else{

                    quotationTable = "<table style='width:100%'>";

                    //Define table columns

                    quotationTable +=   "<tr>" +
                                            "<th>Elemento</th>" +
                                            "<th>Cantidad</th>" + 
                                            "<th>Cargo</th>" +
                                        "</tr>";
                    
                    // Do a forEach even if the array only has one row
                    totalQuotationRows.forEach(function(quotationRow){
                        
                        //Place the content in the HTML
                        // alert(tool);
                        // myListQuotationRows += "<div class='box'> \n" +
                        quotationTable +=  "<script>getPersonnelData1('" + quotationRow.resourceKey + "','" + quotationRowCounter + "','" + quotationRow.quantity + "');</script>" +
                                            "<script>getToolData('" + quotationRow.resourceKey + "','" + quotationRowCounter + "','" + quotationRow.quantity + "');</script>" +
                                            "<tr id=resourceData" + quotationRowCounter + "></tr>";
    
                        quotationRowCounter += 1;
                    });
                }

                quotationTable += "</table>";
                
                myQuotationStr += quotationTable;
                myQuotationStr += myQuotationBottomStr;
                $("#singleQuotation").append(myQuotationStr);
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
function getToolData(toolKey, counter, resourceQuantity){

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
                        
                        var toolName = tool.brand + " " + tool.model;
                        var resourceDataStr = "<th><p style='font-weight:normal'>" + toolName + "</p></th>";
                        resourceDataStr += "<th><p style='font-weight:normal'>" + resourceQuantity + "</p></th>";
                        resourceDataStr += "<th><p style='font-weight:normal'>" + tool.tariff + " / " + tool.tariffTimeUnit + "</p></th>";

                        $("#resourceData" + counter).append(resourceDataStr);
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
function getPersonnelData1(personnelKey, counter, resourceQuantity){

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

                if(totalPersonnel != null){

                    // alert(JSON.stringify(totalPersonnel));
                
                    // Do a forEach even if the array only has one event
                    totalPersonnel.forEach(function(personnel){
                        
                        var fullName = personnel.name + " " + personnel.lastName;
                        var resourceDataStr = "<th><p style='font-weight:normal'>" + fullName + "</p></th>";
                        resourceDataStr += "<th><p style='font-weight:normal'>" + resourceQuantity + "</p></th>";
                        resourceDataStr += "<th><p style='font-weight:normal'>" + personnel.tariff + " / " + personnel.tariffTimeUnit + "</p></th>";

                        $("#resourceData" + counter).append(resourceDataStr);
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
