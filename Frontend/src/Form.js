/**
 * Created by vlado on 12.04.2017.
 */
var maps = require("./maos");

function setFormValue(text) {
    $(".field").text(text);
    maps.name();
}

$(".inp").on("change", function(){
    setFormValue($(".inp").val());
})

exports.setFormValue = setFormValue;