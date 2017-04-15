/**
 * Created by chaika on 25.01.16.
 */

$(function () {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();


    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });


    $('#success-button').click(function () {
        var name = $('#PIB').val();
        var number = $('#telephone').val();
        var adress = $('#adress').val();
       /* if (name == "" || number == "" || adress == "") {
            alert("Введіть, будь ласка, Контактні дані!");
        }
        else {*/
            var formData = {
                "name": name,
                "number": number,
                "adress": adress,
                "price": $('#price').html()
            };
            var API = require('./API');
            API.createOrder(formData, function (err, server_result) {
                console.log("FormResult", err, server_result);

                // alert(server_result.data);
                // alert(server_result.signature);
            });



            // window.location.href = "https://www.liqpay.com/ru/checkout/i76156277120";
        // }
    });

    var maps = require("./maos");

    $("#adress").blur(function () {
        maps.cal($('#adress').val());
    });
});