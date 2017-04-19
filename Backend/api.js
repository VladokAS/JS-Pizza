/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function (req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function (req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    var order = {
        version: 3,
        public_key: "i76156277120",
        action: "pay",
        amount: order_info.price,
        currency: "UAH",
        description: "Опис транзакції: "+order_info.name + ", Адреса: " + order_info.adress +
                        ", Тел: "+order_info.number + "\n"+"Піци: " + order_info.pizzas,
        order_id: Math.random(),
//!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1("uZF9dhnXMmeMRKKRAB2X5KsFMALYEvGvPhODdAog" + data + "uZF9dhnXMmeMRKKRAB2X5KsFMALYEvGvPhODdAog");

    res.send({
        success: true,
        data: data,
        signature: signature
    });
};

function base64(str) {
    return new Buffer(str).toString('base64');
};

var crypto = require('crypto');
function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
};