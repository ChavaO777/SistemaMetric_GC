class QuotationRow{
    
    constructor(token,
        quotationKey,
        resourceKey,
        quantity) {
        this.token = sessionStorage.token;
        this.resourceKey = resourceKey;
        this.quotationyKey = quotationyKey;
        this.quantity = quantity;
    }

    toString() {
        return JSON.stringify(this);
    }
}

function TokenObject() {
    name
    this.token = sessionStorage.token;

    this.toJsonString = function () {

        return JSON.stringify(this);
    };
}

function getURLVariables() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function createQuotationRow() {
    try {
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/quotation_row_api/v1/quotationRow/insert",
            data: quotationRow.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function () {
            
            },
            success: function (response) {
                
                window.location = "/myQuotation";
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