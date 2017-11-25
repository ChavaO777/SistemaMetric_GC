//import {Tool} from '../models/tool.model'
class Tool {
  constructor(token,
              entityKey,
              companyKey,
              category,
              kind,
              brand,
              model,
              tariff,
              tariffTimeUnit,
              quantity,
              availableQuantity,
              comment) {
    this.token = sessionStorage.token;
    this.entityKey = entityKey;
    this.companyKey = companyKey;
    this.category = category;
    this.kind = kind;
    this.brand = brand;
    this.model = model;
    this.tariff = tariff;
    this.tariffTimeUnit = tariffTimeUnit;
    this.quantity = quantity;
    this.availableQuantity = availableQuantity;
    this.comment = comment;
  }
  toString() {
    return JSON.stringify(this);
  }
}
function TokenObject() {

    this.token = sessionStorage.token;

    this.toJsonString = function () {

        return JSON.stringify(this);
    };
}
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
  tool.kind = $('#kind').val();
  tool.brand = $('#brand').val();
  tool.model = $('#model').val();
  tool.tariff = $('#tariff').val();
  tool.tariffTimeUnit = $('#tariffTimeUnit').val();
  tool.quantity = $('#quantity').val();
  tool.availableQuantity = $('#availableQuantity').val();
  tool.comment = $('#comment').val();
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
          alert("The tool was successfully created." + tool.toString());
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
                        myListTools += "<div class='box'> \n" +
                                        "\t<div class='box-name'>\n" +
                                        "\t\t<p>" + tool.brand  + " - " +tool.model +"</p>" +
                                        "\t</div>" +
                                        "\t<div class='box-content'>\n" +
                                        "\t\t<p>Categoria: " + tool.category + "</p>" +
                                        "\t\t<p>Tipo: " + tool.kind + "</p>" +
                                        "\t\t<p>Marca: " + tool.brand + "</p>" +
                                        "\t\t<p>Modelo: " + tool.model + "</p>" +
                                        "\t\t<p>Costo por dia: " + tool.tariff + "</p>" +
                                        "\t\t<p>Costo por dia: " + tool.tariffTimeUnit + "</p>" +
                                        "\t\t<p>Existencias: " + tool.quantity + "</p>" +
                                        "\t\t<p>Disponibles: " + tool.availableQuantity + "</p>" +
                                        "\t\t<p>Comentarios: " + tool.comment + "</p>" +
                                        "\t<form action='/tool' method='GET'>\n" +
                                        "<input type='hidden' name=toolID value='"+ tool.entityKey + "'/>" +
                                        "<input type='submit' value='Ver detalle'/>" +
                                        "\t</form>" +
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
function getTool() {
    try{
        var urlVariables = getURLVariables();
        var toolKey = urlVariables.toolID;
        alert("toolKey = " + toolKey);
        var myTool = new Tool(token = sessionStorage.token,
                                      entityKey = toolKey);
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
                $("#singleTool").empty();
                totalTools = response.data;
                var myTool = "";
                // Do a forEach even if the array only has one tool
                totalTools.forEach(function(tool){
                    //Place the content in the HTML
                    myTool +=  "<div class='hero-element'>" +
                                        "<div class='hero-content-inner'>" +
                                            "<form action='/editTool' method='GET'>" +
                                            "\t\t<p>Categoria: " + tool.category + "</p>" +
                                            "\t\t<p>Tipo: " + tool.kind + "</p>" +
                                            "\t\t<p>Marca: " + tool.brand + "</p>" +
                                            "\t\t<p>Modelo: " + tool.model + "</p>" +
                                            "\t\t<p>Costo por dia: " + tool.tariff + "</p>" +
                                            "\t\t<p>Costo por dia: " + tool.tariffTimeUnit + "</p>" +
                                            "\t\t<p>Existencias: " + tool.quantity + "</p>" +
                                            "\t\t<p>Disponibles: " + tool.availableQuantity + "</p>" +
                                            "\t\t<p>Comentarios: " + tool.comment + "</p>" +
                                                "<input type='hidden' name=toolID value='" + tool.entityKey + "'/>" +
                                                "<input type='submit' value='Editar'/>" +
                                            "</form>" +
                                        "</div>" +
                                    "</div>"
                });
                myTool +=   "<div class='fixed-buttons'>" +
                                    "<a onclick='deleteTool()' class='big-fixed btn-circle btn-red'><i class='fa fa-minus' aria-hidden='true'></i></a>" +
                                "</div>"
                $("#singleTool").append(myTool);
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
