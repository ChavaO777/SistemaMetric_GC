//import {Tool} from '../models/tool.model'
class Tool {
  constructor(token,
              entityKey,
              companyKey,
              category,
              type,
              brand,
              model,
              pricePerDay,
              quantity,
              available,
              comment) {
    this.token = sessionStorage.token;
    this.entityKey = entityKey;
    this.companyKey = companyKey;
    this.category = category;
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.pricePerDay = pricePerDay;
    this.quantity = quantity;
    this.available = available;
    this.comment = comment;
  }
  toString() {
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
function createTool() {
  var tool = new Tool();
  tool.id = $('#id').val();
  tool.category = $('#category').val();
  tool.type = $('#type').val();
  tool.brand = $('#brand').val();
  tool.model = $('#model').val();
  tool.pricePerDay = $('#pricePerDay').val();
  tool.quantity = $('#quantity').val();
  tool.available = $('#available').val();
  tool.comment = $('#comment').val();
  alert(tool.toString());
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/_ah/api/tool_api/v1/tool/insert",
        data: tool.toString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            //$(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          alert("The tool was successfully created.");
          window.location = "/myTools";
        },
        error: function (error) {
            alert(error);
        }
    });
  }
  catch(error){
    alert('jQuery failed : '  + error);
  }
}
function listTools() {
    
    try {
        
        var myData = new TokenObject();
        
        jQuery.ajax( {
            type: "POST",
            url: "http://localhost:8080/_ah/api/tool_api/v1/tool/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");
                $("#listTools").empty();
                var totalTools = response.data;
                var myListTools = "";

                if(totalTools == null){
                
                    myListTools +=  "<div class='hero-element'>" +
                                        "<div class='hero-content-inner'>" +
                                            "<p> No hay herramientas registradas </p>" + 
                                        "</div>" +
                                    "</div>"
                }

                else{

                    alert(JSON.stringify(response.data));
                    // Do a forEach even if the array only has one tool
                    totalTools.forEach(function(tool){
                        
                        //Place the content in the HTML
                        // alert(tool);
                        tableString += "<div class='box'> \n" +
                                        "\t<div class='box-name'>\n" +
                                        "\t\t<p>" + tool.id + " " + tool.model +"</p>" +
                                        "\t</div>" +
                                        "\t<div class='box-content'>\n" +
                                        "\t\t<p>Categoria: " + tool.category + "</p>" +
                                        "\t\t<p>Tipo: " + tool.type + "</p>" +
                                        "\t\t<p>Marca: " + tool.brand + "</p>" +
                                        "\t\t<p>Costo por dia: " + tool.costPerDay + "</p>" +
                                        "\t\t<p>Existencias: " + tool.quantity + "</p>" +
                                        "\t\t<p>Disponibles: " + tool.available + "</p>" +
                                        "\t\t<p>Comentarios: " + tool.comment + "</p>" +
                                        "\t</div>" +
                                        "</div>";
                    });
                }
            
                $("#listTools").append(myListTools);
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
