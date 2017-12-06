class Event {
    
    constructor(token,
                entityKey,
                companyKey, 
                customerKey,
                name,
                description,
                date, 
                days, 
                place, 
                hidden) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.companyKey = companyKey;
        this.customerKey = customerKey;
        this.name = name;
        this.description = description;
        this.date = date;
        this.days = days;
        this.place = place;
        this.hidden = hidden;
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

function getURLVariables() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function createNewCompanyEvent() {

    var myName = $('#name').val();
    var myDescription = $('#description').val();
    var myDate = $('#date').val();
    var myDays = $('#days').val();
    var myPlace = $('#place').val();
    var myCustomerKey = $('#customerList').val();
    var myHidden = true;

    var event = new Event();
    event.name = myName;
    event.description = myDescription;
    event.date = myDate;
    event.days = myDays;
    event.place = myPlace;
    event.hidden = myHidden;
    event.customerKey = myCustomerKey;


    try{
        jQuery.ajax({
            type: "POST",
            url: "./_ah/api/event_api/v1/event/insert",
            data: event.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
            },
            success: function (response) {                   
                // $(".msg").html("<p>Herramienta creado</p>");
                showNotification("success");
                sleep(3000);
                window.location = "/myEvents";
            },
            error: function (error) {
                
                console.log("Not possible" + error);
            }
        });
    }
    catch(error){
        
        alert(error);
    }
}

function listEvents() {
    
    try {
        
        var myData = new TokenObject();
        
        jQuery.ajax( {
            type: "POST",
            url: "./_ah/api/event_api/v1/event/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");
                $("#listEvents").empty();
                var totalEvents = response.data;
                var myListEvents = "";

                if(totalEvents == null){
                    myListEvents +=  "<div class='hero-element'>" +
                                        "<div class='hero-content-inner'>" +
                                            "<p> No hay eventos registrados </p>" + 
                                        "</div>" +
                                    "</div>"
                }
                else{

                    var eventCounter = 0;
                    // console.log(totalEvents);
                    // Do a forEach even if the array only has one tool

                    totalEvents.forEach(function(event){

                        myListEvents += "<div class='hero-element'>" +
                                            "<div class='box'>" + 
                                                "<form action='/event' method='GET'>" +
                                                    "<div class='box-name'><p><bold>"+event.name+"</bold></p></div>" + 
                                                    "<div class='box-content'>" + 
                                                        "<script>getCustomerName('event','" + event.customerKey + "'," + eventCounter + ")</script>" +
                                                        "<p id=event" + eventCounter + ">Cliente: </p>" + 
                                                        "<p>Fecha de inicio: " + event.date + "</p>" +
                                                        "<p>Duración: " + event.days + " días</p>" + 
                                                        "<p>Lugar: " + event.place + "</p>" + 
                                                        "<input type='hidden' name=eventID value='" + event.entityKey + "'/>" + 
                                                        "<input type='submit' class='btn-rectangle btn-blue' value='Ver detalle'/>" + 
                                                    "</div>" + 
                                                "</form>" + 
                                            "</div>" + 
                                        "</div>";
                            
                        eventCounter += 1;
                    });
                }
            
                $("#listEvents").append(myListEvents);
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

function getEvent() {
    try{
        var urlVariables = getURLVariables();
        var eventKey = urlVariables.eventID;
        alert("eventKey = " + eventKey);
        var myEvent = new Event(token = sessionStorage.event,
                                      entityKey = eventKey);
        jQuery.ajax({
            type: "POST",
            url: "./_ah/api/event_api/v1/event/get",
            data: myEvent.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                // $(".msg").html("<p>Message</p>");
                $("#singleEvent").empty();
                totalEvents = response.data;

                $("#customerKey").empty();
                $("#hidden").empty();
                $("#name").empty();
                $("#description").empty();
                $("#date").empty();
                $("#days").empty();
                $("#place").empty();

                var myEvent = "";
                var eventCounter = 0;
                    // console.log(totalEvents);
                    // Do a forEach even if the array only has one tool

                    totalEvents.forEach(function(event){

                        $("#customerKey").val(event.customerKey);
                        $("#hidden").val(event.hidden);
                        $("#name").val(event.name);
                        $("#description").val(event.description);
                        $("#date").val(event.date);
                        $("#days").val(event.days);
                        $("#place").val(event.place);

                        myEvent += "<div class='hero-element'>" +
                                            "<div class='box'>" +
                                                    "<div class='box-name'><p><b>" + event.name + "</b></p></div>" + 
                                                    "<div class='event-content>" + 
                                                        "<script>getCustomerName('event','" + event.customerKey + "'," + eventCounter + ")</script>" +
                                                        "<p id=event" + eventCounter + ">Cliente: </p>" + 
                                                        "<p>Fecha de inicio: " + event.date + "</p>" + 
                                                        "<p>Duración: " + event.days + " días</p>" + 
                                                        "<p>Lugar: " + event.place + "</p>" + 
                                                        "<p><a href='javascript:showForm();' class='btn-rectangle btn-blue'>Editar</a></p>"+
                                                        "<input type='hidden' name=eventID value='" + event.entityKey + "'/>" +
                                                    "</div>" + 
                                                "</form>" +
                                            "</div>" + 
                                    "</div>";

                        eventCounter += 1;
                    });
                myEvent +=   "<div class='fixed-buttons'>" +
                                    "<a onclick='deleteEvent()' class='big-fixed btn-circle btn-red'><i class='fa fa-minus' aria-hidden='true'></i></a>" +
                                "</div>"
                $("#singleEvent").append(myEvent);
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

function editEvent() {
    
    var urlVariables = getURLVariables();
    var eventKey = urlVariables.eventID;

    var myName = $('#name').val();
    var myDescription = $('#description').val();
    var myDate = $('#date').val();
    var myDays = $('#days').val();
    var myPlace = $('#place').val();
    var myCustomerKey = $('#customerKey').val();

    var event = new Event();
    event.entityKey = eventKey;
    event.name = myName;
    event.description = myDescription;
    event.date = myDate;
    event.days = myDays;
    event.place = myPlace;
    event.customerKey = myCustomerKey;
    event.hidden = false;


    try{
        jQuery.ajax({
            type: "POST",
            url: "./_ah/api/event_api/v1/event/update",
            data: event.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The event was successfully updated.");
                window.location = "/myEvents";
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

function deleteEvent() {
    
    var urlVariables = getURLVariables();
    var eventKey = urlVariables.eventID;

    var event = new Event();
    event.entityKey = eventKey;


    try{
        jQuery.ajax({
            type: "POST",
            url: "./_ah/api/event_api/v1/event/delete",
            data: event.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                alert("The event was successfully deleted.");
                window.location = "/myEvents";
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

function getCustomerName(idPrefix, customerKey, eventCounter){

    try{
        // alert("customerKey = " + customerKey);
        var myCustomer = new Customer(token = sessionStorage.token, entityKey = customerKey);

        jQuery.ajax({
            type: "POST",
            url: "./_ah/api/customer_api/v1/customer/get",
            data: myCustomer.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");

                totalCustomers = response.data;
                $("#" + idPrefix + eventCounter).empty();

                // Do a forEach even if the array only has one customer
                totalCustomers.forEach(function(customer){

                    $("#" + idPrefix + eventCounter).append("Cliente: " + customer.name + " " + customer.lastName);
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

function getEventListForSelection(appendTo) {

    try {

        // alert("token : " + sessionStorage.token);
        var myData = new TokenObject();

        jQuery.ajax({
            type: "POST",
            url: "./_ah/api/event_api/v1/event/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function () {

                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {

                // $(".msg").html("<p>Message</p>");

                $(appendTo).empty();
                var totalEvents = response.data;

                var myEventListForSelection = "";

                if (totalEvents == null) {

                    myEventListForSelection = "<p> No hay clientes registrados </p>";
                }

                else {

                    // alert(JSON.stringify(response.data));

                    // Do a forEach even if the array only has one customer
                    totalEvents.forEach(function (event) {

                        //Place the content in the HTML
                        // alert(event.toString());
                        myEventListForSelection += "<option value='" + event.entityKey + "'>" + event.name + "</option>";
                    });
                }

                $(appendTo).append(myEventListForSelection);
            },
            error: function (error) {
                alert(error);
            }
        });
    }
    catch (error) {

        alert(error);
    }
}