/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('./storage/storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

var num_of_pizzas = 0;
var summa = 0;

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    var numer = -1;
    Cart.forEach(function (pizzon) {
        if(pizzon.pizza.title == pizza.title && pizzon.size == size){
            numer = Cart.indexOf(pizzon);
        }

    });
    if(numer < 0){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1,
            price: pizza[size].price
        });
    }else{
        Cart[numer].quantity +=1;
    }

    //Оновити вміст кошика на сторінці
    exports.cart = Cart;
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити

    for(var i = Cart.length - 1; i >= 0; i--) {
        if(Cart[i].price == cart_item.price && Cart[i].pizza.title == cart_item.pizza.title) {
            Cart.splice(i, 1);
        }
    }
    Storage.set("cart",Cart);

}

function initialiseCart() {
    //Фукнція віпрацьовуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    var saved_orders = Storage.get('cart');
    if(saved_orders) {
        Cart = saved_orders;
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    num_of_pizzas = 0;
    summa = 0;
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Зменшуємо кількість замовлених піц якщо кількість більше 1
            if(cart_item.quantity > 1) {
                cart_item.quantity -= 1;
            }
            else{
                removeFromCart(cart_item);
            }
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".removeB").click(function(){
            removeFromCart(cart_item);
            //Оновлюємо відображення
            updateCart();
        });

        var pizza_price = cart_item.quantity*cart_item.price;
        $node.find("#pizza-price").text(pizza_price+" грн.");
        num_of_pizzas += cart_item.quantity;
        summa += cart_item.quantity*cart_item.price;
        $cart.append($node);

        Storage.set("cart", Cart);
    }

    Cart.forEach(showOnePizzaInCart);
    $("#num-of-orders").text(num_of_pizzas);
    $("#pricek").text(summa);

    if(Cart.length == 0){
        $("#cart").html('<div class="fridge-is-empty text-center">Пусто в холодильнику?<br>Замовте Піцу!</div>');
        $("#but").prop("disabled",true);
    }else {
        $("#but").prop("disabled",false);
    }


}


$("#clear-zam").click(function () {
   Cart = [];
   Storage.set("cart",Cart);
   updateCart();
});

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;