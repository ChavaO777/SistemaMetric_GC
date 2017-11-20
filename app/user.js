function User(myEmail, myPasswd) {
    this.email = myEmail;
    this.password = myPasswd;
    this.toJsonString = function () { return JSON.stringify(this); };

};

function login()
{
	var myData = new User(
    $("#email").val(), 
    $("#password").val());
	
    alert(myData.toJsonString());

    try{

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/user_api/v1/user/login",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                sessionStorage.token = response.token;
                $(".msg").html("<p>"+sessionStorage.token+"</p>");
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
