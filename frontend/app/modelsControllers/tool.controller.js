//import {Tool} from '../models/tool.model'
function Tool() {
  this.id = null;
  this.category = null;
  this.type = null;
  this.brand = null;
  this.model = null;
  this.pricePerDay = null;
  this.quantity = null;
  this.available = null;
  this.comment = null;
  this.toString() = function() {
    return JSON.stringify(this);
  };
}
function create() {
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
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/create",
        data: tool.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html("<p>Herramienta creado</p>");
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
function list() {
  var tools;
  var tableString = "";
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/list",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          tools = response.data;
          tools.foreach(fuction(tool) {
            tableString += "<div class='box'> \n" +
            "\t<div class='box-name'>\n" +
            "\t\t<p>" + tool.id + " " + tool.model +"</p>" +
            "\t</div>" +
            "\t<div class='box-content'>\n" +
            "\t\t<p>Categoria: " + tool.category + "</p>" +
            "\t\t<p>Tipo: " + tool.type + "</p>" +
            "\t\t<p>Marca: " + tool.brand + "</p>" +
            "\t\t<p>Costo por dia: " + tool.costPerDay + "</p>" +
            "\t\t<p>Existecias: " + tool.quantity + "</p>" +
            "\t\t<p>Disponibles: " + tool.available + "</p>" +
            "\t\t<p>Comentarios: " + tool.comment + "</p>" +
            "\t</div>";
          });
          $("#listTools").append(tools);
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
function get() {
  var tool;
  var id = $("#id").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/get",
        data: {id : id},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
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
          tableString += "<div class='box'> \n" +
          "\t<div class='box-name'>\n" +
          "\t\t<p>" + tool.id + " " + tool.model +"</p>" +
          "\t</div>" +
          "\t<div class='box-content'>\n" +
          "\t\t<p>Categoria: " + tool.category + "</p>" +
          "\t\t<p>Tipo: " + tool.type + "</p>" +
          "\t\t<p>Marca: " + tool.brand + "</p>" +
          "\t\t<p>Costo por dia: " + tool.costPerDay + "</p>" +
          "\t\t<p>Existecias: " + tool.quantity + "</p>" +
          "\t\t<p>Disponibles: " + tool.available + "</p>" +
          "\t\t<p>Comentarios: " + tool.comment + "</p>" +
          "\t</div>";
          $("#toolInfo").append(tools);
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
function update() {
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
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/update",
        data: tool.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html(tool.toJsonString());
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
function delete() {
  var id = $("#id").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/delete",
        data: {id : id},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html("Herramienta eliminado");
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
