class Event {
    
    constructor(token,
                entityKey,
                companyKey, 
                date, 
                days, 
                place, 
                hidden) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.companyKey = companyKey;
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

function createNewCompanyEvent() {

    var myDate = $('#date').val();
    alert("myDate = " + myDate);
    var myDays = $('#days').val();
    var myPlace = $('#place').val();
    var myHidden = true;

    var event = new Event();
    event.date = myDate;
    event.days = myDays;
    event.place = myPlace;
    event.hidden = myHidden;

    alert(event.toString());

    try{
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/event_api/v1/event/insert",
            data: event.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {                   
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The event was successfully created.");
                //window.location = "/myEvents";
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
            url: "http://localhost:8080/_ah/api/event_api/v1/event/list",
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
                    console.log(totalEvents);
                    // Do a forEach even if the array only has one tool
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
