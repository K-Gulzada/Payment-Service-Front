(function ($) {
    // Login/Register
    var login_Form = $("#login_Form").dialog({ autoOpen: false });
    $(".loginBtn").click(function () {
        login_Form.dialog("open");
    });

    var register_Form = $("#register_Form").dialog({ autoOpen: false });
    $(".registerBtn").click(function () {
        register_Form.dialog("open");
    });

    // PAYMENT METHOD
    // add new Payment Method
    var addNewPM_Form = $("#addNewPM_Form").dialog({ autoOpen: false });
    $(".insertNewPMBtn").click(function () {
        addNewPM_Form.dialog("open");
    });
    // update Payment Method by ID
    var updatePM_Form = $("#updatePM_Form").dialog({ autoOpen: false });
    $(".updatePMBtn").click(function () {
        updatePM_Form.dialog("open");
    });
    // delete Payment Method by ID
    var deletePM_Form = $("#deletePM_Form").dialog({ autoOpen: false });
    $(".deletePMBtn").click(function () {
        deletePM_Form.dialog("open");
    });

    // BANK========================================================
    // add new Bank
    var addNewBank_Form = $("#addNewBank_Form").dialog({ autoOpen: false });
    $(".insertNewBankBtn").click(function () {
        addNewBank_Form.dialog("open");
    });
    // update Bank by ID
    var updateBank_Form = $("#updateBank_Form").dialog({ autoOpen: false });
    $(".updateBankBtn").click(function () {
        updateBank_Form.dialog("open");
    });
    // delete Bank by ID
    var deleteBank_Form = $("#deleteBank_Form").dialog({ autoOpen: false });
    $(".deleteBankBtn").click(function () {
        deleteBank_Form.dialog("open");
    });

    // BALANCE=======================================================
    // add new Bank
    var addNewBalance_Form = $("#addNewBalance_Form").dialog({ autoOpen: false });
    $(".insertNewBalanceBtn").click(function () {
        addNewBalance_Form.dialog("open");
    });
    // update Bank by ID
    var updateBalance_Form = $("#updateBalance_Form").dialog({ autoOpen: false });
    $(".updateBalanceBtn").click(function () {
        updateBalance_Form.dialog("open");
    });
    // delete Bank by ID
    var deleteBalance_Form = $("#deleteBalance_Form").dialog({ autoOpen: false });
    $(".deleteBalanceBtn").click(function () {
        deleteBalance_Form.dialog("open");
    });

    // PAYMENT STATUS================================================
    // add new PaymentStatus
    var addNewPS_Form = $("#addNewPS_Form").dialog({ autoOpen: false });
    $(".insertNewPSBtn").click(function () {
        addNewPS_Form.dialog("open");
    });
    // update PaymentStatus by ID
    var updatePS_Form = $("#updatePS_Form").dialog({ autoOpen: false });
    $(".updatePSBtn").click(function () {
        updatePS_Form.dialog("open");
    });
    // delete PaymentStatus by ID
    var deletePS_Form = $("#deletePS_Form").dialog({ autoOpen: false });
    $(".deletePSBtn").click(function () {
        deletePS_Form.dialog("open");
    });

    // TRANSACTION================================================
    // add new PaymentStatus
    var addNewTransaction_Form = $("#addNewTransaction_Form").dialog({ autoOpen: false });
    $(".insertNewTransactionBtn").click(function () {
        addNewTransaction_Form.dialog("open");
    });
    // update PaymentStatus by ID
    var updateTransaction_Form = $("#updateTransaction_Form").dialog({ autoOpen: false });
    $(".updateTransactionBtn").click(function () {
        updateTransaction_Form.dialog("open");
    });
    // delete PaymentStatus by ID
    var deleteTransaction_Form = $("#deleteTransaction_Form").dialog({ autoOpen: false });
    $(".deleteTransactionBtn").click(function () {
        deleteTransaction_Form.dialog("open");
    });
})(jQuery);

// (function($) {
$(document).ready(function () {
    console.log("Data Saved: ");

    $(document).on('click', '.deleteElem', function (e) {
        event.preventDefault();
        var clicked = $(this);

        clicked.attr('disabled', 'disabled');
        let classNameForUrl = clicked.attr('name');
        console.log("127.0.0.1:8000/" + classNameForUrl + "/" + (this.id).split('_')[1]);

        $.ajax({
            method: "DELETE",
            url: "http://127.0.0.1:8000/" + classNameForUrl + "/" + (this.id).split('_')[1],
        })
            .done(function (data) {
                clicked.closest('.card').remove();
            });
    });

    $(document).on('click', '.updateElem', function (event) {
        var clicked = $(this);
        $(this).closest('.first_block').hide();

        console.log(this.id);
        let divSecondBlockId = '#updDiv_' + (this.id).split('_')[1]
        console.log(divSecondBlockId);
        $(divSecondBlockId).css("display", "block");
    });

    $(document).on('click', '.saveElem', function (event) {

        let myId = $(this).closest('.second_block')[0].id.split('_')[1];

        let inputID = '#inputID_' + myId;

        var inputVal = $(inputID).val();

        let classNameForUrl = $(this).attr('name');        

        $(this).attr('disabled', 'disabled');
        let field_1 = "";
        if(classNameForUrl == "payment-method"){
            field_1  = "methodName"
        }else if(classNameForUrl == "bank"){
            field_1  = "config"
        }
        else if(classNameForUrl == "payment-status"){
            field_1  = "description"
        }

        item = {}
        item [field_1] = inputVal;

        $.ajax({
                method: "PUT",             
                url: "http://127.0.0.1:8000/" + classNameForUrl + "/" + myId,
               
                data: item
            })
            .done(function(data) {
                console.log(data)
            });
    });

    $("#getAllPaymentMethodBtn").click(function (event) {
         $.ajax({
                method: "GET",
                url: "http://127.0.0.1:8000/payment-methods/"
            })
            .done(function(data) {
                for (var i = 0; i < data.paymentMethods.length; i++) {
                    var templateString = '<div class="card"><div class="card-body"><h5 class="card-title">' +
                        'ID: ' + data.paymentMethods[i].id + '</h5> <hr>' + '<div class="first_block">' + '<p class="card-text">' + ' Name: ' +  
                        data.paymentMethods[i].methodName + '</p>' +
                        '<button id="delete_' + data.paymentMethods[i].id + '" class="deleteElem btn-danger" name="payment-methods">Delete</button>' +
                        '<button id = "updBtn_' + data.paymentMethods[i].id + '" class="updateElem btn-warning" style="margin-right:10px;">Update</button>' + '</div>' +
                        '<div id="updDiv_' + data.paymentMethods[i].id + '" class="second_block" style="display:none;">' + '<input id="inputID_' + data.paymentMethods[i].id + '" type="text" class="form-control" value="' + ' Name: ' + data.paymentMethods[i].methodName + '"</input>' +
                        '<button class= "btn btn-warning saveElem" name="payment-methods">Save</button>' + '</div>' +
                        '</div> </div>';

                    ;

                    $('#hiddenDataPaymentMethod').append(templateString);
                }

                style = document.getElementById("hiddenDataPaymentMethod").style;

                if (style.display == 'flex') {
                    $('.card').remove();
                    style.display = 'none';
                } else {
                    style.display = 'flex';
                }
            });
     
    });

    $("#savePaymentMethod").submit(function (event) {
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:8000/payment-methods/",
            data: { 'methodName': $("#pmName").val() }
        })
            .done(function (data) {
                console.log(data)
            });
        event.preventDefault();
    });
    //========================================================================
    $("#getAllBankBtn").click(function (event) {
        $.ajax({
            method: "GET",
            url: "http://localhost:8000/bank/"
        })
            .done(function (data) {
                for (var i = 0; i < data.banks.length; i++) {
                    var templateString = '<div class="card"><div class="card-body"><h5 class="card-title">' +
                        'ID: ' + data.banks[i].id + '</h5> <hr>' + '<div class="first_block">' + '<p class="card-text">' + 'Name: ' + data.banks[i].config + '</p>' +
                        '<button id="delete_' + data.banks[i].id + '" class="deleteElem btn-danger" name="bank">Delete</button>' +
                        '<button id = "updBtn_' + data.banks[i].id + '" class="updateElem btn-warning" style="margin-right:10px;">Update</button>' + '</div>' +
                        '<div id="updDiv_' + data.banks[i].id + '" class="second_block" style="display:none;">' + '<input id="inputID_' + data.banks[i].id + '" type="text" class="form-control" value="' + 'Config: ' + data.banks[i].config + '"</input>' +
                        '<button class= "btn btn-warning saveElem" name="bank">Save</button>' + '</div>'
                        + '</div> </div>';

                    $('#hiddenDataBank').append(templateString);
                }
                style = document.getElementById("hiddenDataBank").style;

                if (style.display == 'flex') {
                    $('.card').remove();
                    style.display = 'none';
                } else {
                    style.display = 'flex';
                }

            });
    });

    $("#saveBank").submit(function (event) {
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:8000/bank/",
            data: { 'config': $("#config").val() }
        })
            .done(function (data) {
                console.log(data)
            });
        event.preventDefault();
    });

    //========================================================================

    // Correct update URL
    
    $(document).on('click', '.updateBalance', function (event) {
        let myId = $(this).closest('.second_block')[0].id.split('_')[1];

        let userIdInput = '#userIdInputID_' + myId;
        var userIdinputVal = $(userIdInput).val();

        let currenBalanceInput = '#currenBalanceInputID_' + myId;
        var currenBalanceInputVal = $(currenBalanceInput).val();

        let dateInputID = '#dateInputID_' + myId;
        var dateInputVal = $(dateInputID).val();

        $.ajax({
            method: "PUT",
            url: "http://localhost:8000/updateBalance/" + myId,

            data: {
                "userId": userIdinputVal,
                "currentBalance": currenBalanceInputVal,
                "date": dateInputVal
            }
        })
            .done(function (data) {
                console.log(data)
            });
        event.preventDefault();
    });

    $("#getAllBalanceBtn").click(function (event) {
        $.ajax({
            method: "GET",
            url: "http://localhost:8000/balance/"
        })
            .done(function (data) {
                for (var i = 0; i < data.balances.length; i++) {
                    var templateString = '<div class="card"><div class="card-body">' + '<div class="first_block">' + '<h5 class="card-title">' +
                        'User ID: ' + data.balances[i].userId + '</h5> <hr> <p class="card-text">' +
                        'Current Balance: ' + data.balances[i].currentBalance + '</p><p class="card-text">' +
                        'Date: ' + data.balances[i].date + '</p>' + '<button id="delete_' + data.balances[i].id + '" class="deleteElem btn-danger" name="deleteBalance">Delete</button>' +
                        '<button id = "updBtn_' + data.balances[i].id + '" class="updateElem btn-warning">Update</button>' + '</div>' +
                        '<div id="updDiv_' + data.balances[i].id + '" class="second_block" style="display:none;">' + '<input id="userIdInputID_' + data.balances[i].id + '" type="text" class="form-control" value="' + data.balances[i].userId + '"</input>' +
                        '<input id="currenBalanceInputID_' + data.balances[i].id + '" type="number" class="form-control" value="' + data.balances[i].currentBalance + '"</input>' +
                        '<input id="dateInputID_' + data.balances[i].id + '" type="date" class="form-control" value="' + data.balances[i].date + '"</input>' +
                        '<button id="up" class= "btn btn-warning updateBalance">Save</button>' + '</div>' +
                        '</div> </div>';

                    $('#hiddenDataBalance').append(templateString);
                }
                style = document.getElementById("hiddenDataBalance").style;

                if (style.display == 'flex') {
                    $('.card').remove();
                    style.display = 'none';
                } else {
                    style.display = 'flex';
                }

            });
    });



    $("#saveBalance").submit(function (event) {

        $.ajax({
            method: "POST",
            url: "http://localhost:8000/addNewBalance/",
            data: {
                'userId': $("#userId").val(),
                'currentBalance': $("#currentBalance").val(),
                'date': $("#date").val()
            }
        })
            .done(function (data) {
                console.log(data)
            });

    });
    // Correct name for delete BTN
    $("#getAllPaymentStatusBtn").click(function (event) {
        $.ajax({
            method: "GET",
            url: "http://localhost:8000/payment-status/"
        })
            .done(function (data) {
                console.log(data);
                for (var i = 0; i < data.paymentStatusList.length; i++) {
                    var templateString = '<div class="card"><div class="card-body"><h5 class="card-title">' +
                        'Payment Status ' + '</h5> <hr>' +
                        '<div class="first_block">' + '<p class="card-text">' +
                        'Status Code: ' + data.paymentStatusList[i].statusCode + '</p><p class="card-text">' +
                        'Description: ' + data.paymentStatusList[i].description + '</p>' + '<button id="delete_' + data.paymentStatusList[i].statusCode + '" class="deleteElem btn-danger" name="payment-status">Delete</button>' +
                        '<button id = "updBtn_' + data.paymentStatusList[i].statusCode + '" class="updateElem btn-warning">Update</button>' + '</div>' +
                        '<div id="updDiv_' + data.paymentStatusList[i].statusCode + '" class="second_block" style="display:none;">' + '<input type="text" disabled class="form-control" value="' + data.paymentStatusList[i].statusCode + '"</input>' + '<input id="inputID_' + data.paymentStatusList[i].statusCode + '" type="text" class="form-control" value="' + data.paymentStatusList[i].description + '"</input>' +
                        '<button class= "btn btn-warning saveElem" name="payment-status">Save</button>' + '</div>' +
                        '</div> </div>';

                    $('#hiddenDataPaymentStatus').append(templateString);
                }
                style = document.getElementById("hiddenDataPaymentStatus").style;

                if (style.display == 'flex') {
                    $('.card').remove();
                    style.display = 'none';
                } else {
                    style.display = 'flex';
                }

            });
    });

    $("#savePaymentStatus").submit(function (event) {
        $.ajax({
            method: "POST",
            url: "http://localhost:8000/payment-status/",
            data: {
                'statusCode': $("#statusCode").val(),
                'description': $("#description").val()
            }
        })
            .done(function (data) {
                console.log(data)
            });
        event.preventDefault();
    });

    // WARNING В GET методе айдишки раскрываются в полноценные модельки
    $("#getAllTransactionBtn").click(function (event) {
        $.ajax({
            method: "GET",
            url: "http://localhost:8000/transaction/"
        })
            .done(function (data) {
                console.log(data);
                for (var i = 0; i < data.transactions.length; i++) {
                    var templateString = '<div class="card"><div id="tranDiv_' +data.transactions[i].id+'" class="card-body"><h5 class="card-title">' +
                        'Transaction ' + data.transactions[i].id + '</h5> <hr>' +
                        '<p id="tranP_'+data.transactions[i].id+ '" class="card-text">' + 'OrderInfo: ' + data.transactions[i].orderInfo + '</p>' +
                        '<p class="card-text">' + 'Sum: ' + data.transactions[i].sum + '</p>' +
                        '<p class="card-text">' + 'Status Code: ' + data.transactions[i].statusId.statusCode + '</p>' +
                        '<p class="card-text">' + 'PaymentMethodID: ' + data.transactions[i].paymentMethodId.methodName + '</p>' +
                        '<p class="card-text">' + 'Bank ID: ' + data.transactions[i].BankId.config + '</p>' +
                        '<p class="card-text">' + 'Date: ' + data.transactions[i].date + '</p> </div> </div>';

                    $('#hiddenDataTransaction').append(templateString);
                    var templateConfirmed;
                    if(data.transactions[i].orderInfo.includes('Подтвержден')){
                        templateConfirmed = '<button disabled class ="btn btn-success">Подтвержден</button>'
                    }else{
                        templateConfirmed = '<button class ="btn btn-dark confirm">Подтвердить</button>'
                    }
                    $('.card-body').append(templateConfirmed);
                }
                style = document.getElementById("hiddenDataTransaction").style;

                if (style.display == 'flex') {
                    $('.card').remove();
                    style.display = 'none';
                } else {
                    style.display = 'flex';
                }

            });
    });

    $(document).on('click', '.confirm', function (event) {
        let myId = $(this).closest('.card-body')[0].id.split('_')[1];

        let orderInfoP = '#tranP_' + myId;
       
        var orderInfoPVal = $(orderInfoP).text()+ " Подтвержден";

        $.ajax({
            method: "PUT",
            url: "http://localhost:8000/transaction/" + myId,
            
            data: {
                "orderInfo": orderInfoPVal
            }
        })
            .done(function (data) {
                console.log(data)
            });
        event.preventDefault();
    });

    

    $("#saveTransaction").submit(function (event) {
        $.ajax({
            method: "POST",
            url: "http://localhost:8000/payment-status/",
            data: {
                'orderInfo': $("#orderInfo").val(),
                'sum': $("#sum").val(),
                'statusId': $("#statusId").val(),
                'paymentMethodId': $("#paymentMethodId").val(),
                'BankId': $("#BankId").val(),
                'date': $("#date").val()
            }
        })
            .done(function (data) {
                console.log(data)
            });
        event.preventDefault();
    });

});


