/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML елемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $array = ["#all", "#meat", "#ananas","#mush", "#sea", "#vega"];

$("#all").click(function () {
    $("#loki").text("Усі піци");


    $("#all").css("background-color","#f0ad4e");
    $(this).css("color","white");
    $array.forEach(function (index) {
        if(index !== "#all"){
            $(index).css("background-color","transparent");
            $(index).css("color","black");
            $(index).css("border-color","transparent");
        }
    });

    showPizzaList(Pizza_List);
});

$("#meat").click(function () {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(pizza.content.meat){
            //pizza_shown.push(pizza);
            pizza_shown.push(pizza);
        }
    });

    //Показати відфільтровані піци

    $("#loki").text("М'ясні піци ");


    $("#meat").css("background-color","#f0ad4e");
    $(this).css("color","white");
    $array.forEach(function (index) {
        if(index !== "#meat"){
            $(index).css("background-color","transparent");
            $(index).css("color","black");
            $(index).css("border-color","transparent");
        }
    });
    showPizzaList(pizza_shown);
});

$("#ananas").click(function () {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(pizza.content.pineapple){
            //pizza_shown.push(pizza);
            pizza_shown.push(pizza);
        }
    });

    //Показати відфільтровані піци

    $("#loki").text("Піци з ананасами ");

    $("#ananas").css("background-color","#f0ad4e");
    $(this).css("color","white");
    $array.forEach(function (index) {
        if(index !== "#ananas"){
            $(index).css("background-color","transparent");
            $(index).css("color","black");
            $(index).css("border-color","transparent");
        }
    });
    showPizzaList(pizza_shown);
});
$("#mush").click(function () {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(pizza.content.mushroom){
            //pizza_shown.push(pizza);
            pizza_shown.push(pizza);
        }
    });

    //Показати відфільтровані піци

    $("#loki").text("Піци з грибами ");

    $("#mush").css("background-color","#f0ad4e");
    $(this).css("color","white");
    $array.forEach(function (index) {
        if(index !== "#mush"){
            $(index).css("background-color","transparent");
            $(index).css("color","black");
            $(index).css("border-color","transparent");
        }
    });
    showPizzaList(pizza_shown);
});
$("#sea").click(function () {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(pizza.content.ocean){
            //pizza_shown.push(pizza);
            pizza_shown.push(pizza);
        }
    });

    //Показати відфільтровані піци

    $("#loki").text("Піци з морепродуктами ");

    $("#sea").css("background-color","#f0ad4e");
    $(this).css("color","white");
    $array.forEach(function (index) {
        if(index !== "#sea"){
            $(index).css("background-color","transparent");
            $(index).css("color","black");
            $(index).css("border-color","transparent");
        }
    });
    showPizzaList(pizza_shown);
});

$("#vega").click(function () {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(pizza.content.meat == undefined && pizza.content.ocean == undefined){
            //pizza_shown.push(pizza);
            pizza_shown.push(pizza);
        }
    });

    //Показати відфільтровані піци

    $("#loki").text("Вегетеріанські піци ");


    $("#vega").css("background-color","#f0ad4e");
    $(this).css("color","white");
    $array.forEach(function (index) {
        if(index !== "#vega"){
            $(index).css("background-color","transparent");
            $(index).css("color","black");
            $(index).css("border-color","transparent");
        }
    });

    showPizzaList(pizza_shown);
});


function showPizzaList(list){
        //Очищаємо старі піци в кошику
    $pizza_list.html("");

        //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem(
            {pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }


    //$(".count").text(list.length);
    $(".num-of-pizzas").text(list.length);
    list.forEach(showOnePizza);
}

//Шаблон
function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(pizza.filter){
            //pizza_shown.push(pizza);
            pizza_shown.push(pizza);
        }
        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    $("#all").css("background-color","#f0ad4e");
    $("#all").css("color","white");
    $array.forEach(function (index) {
        if(index !== "#all"){
            $(index).css("background-color","transparent");
            $(index).css("color","black");
            $(index).css("border-color","transparent");
        }
    })

    showPizzaList(Pizza_List)
}


exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;