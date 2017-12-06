class QuotationRow{
    
    constructor(token,
                quotationKey,
                resourceKey,
                quantity) {

        this.token = sessionStorage.token;
        this.quotationKey = quotationKey;
        this.resourceKey = resourceKey;
        this.quantity = Number(quantity);
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
    
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    
    return vars;
}

function createQuotationRow() {

    try {

        var urlVariables = getURLVariables();
        var quotationKey = urlVariables.quotationID;

        var myQuotationRow = new QuotationRow();
        myQuotationRow.quotationKey = quotationKey;
        myQuotationRow.resourceKey = $('#quotationRowResource').val(); 
        myQuotationRow.quantity = Number($('#quotationRowQuantity').val());

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/quotation_row_api/v1/quotationRow/insert",
            data: myQuotationRow.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function () {
            
            },
            success: function (response) {
                
                window.location = "/quotation?quotationID=" + quotationKey;
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