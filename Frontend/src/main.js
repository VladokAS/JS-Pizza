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
        var Card = require("./pizza/PizzaCart");
        var cart = Card.getPizzaInCart();
        var string_of_pizzas = "";
        cart.forEach(function (index) {
            var size;
            if (index.size == "big_size") {
                size = "Велика";
            } else {
                size = "Мала";
            }
            string_of_pizzas += index.quantity + " шт. " + index.pizza.title + " " + size + "\n";
        });
        var name = $('#PIB').val();
        var number = $('#telephone').val();
        var adress = $('#adress').val();
        if (name == "" || number == "" || adress == "") {
            alert("Введіть, будь ласка, Контактні дані!");
        }
        else {
            var formData = {
                "name": name,
                "number": number,
                "adress": adress,
                "price": $('#pricek').html(),
                "pizzas": string_of_pizzas
            };
            var API = require('./API');
            API.createOrder(formData, function (err, server_result) {
                console.log("FormResult", err, server_result);

                LiqPayCheckout.init({
                    data: server_result.data,
                    signature: server_result.signature,
                    embedTo: "#liqpay",
                    mode: "popup"	//	embed	||	popup
                }).on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function (data) {
//	ready
                }).on("liqpay.close", function (data) {
//	close
                });
                // alert(server_result.data);
                // alert(server_result.signature);
            });

            // window.location.href = "https://www.liqpay.com/ru/checkout/i76156277120";
        }
    });

    var maps = require("./maos");

    $("#adress").blur(function () {
        maps.cal($('#adress').val());
    });
});