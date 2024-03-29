var pizzaBasePrice = {
    small: 400,
    medium: 900,
    large: 1400,
};

var crust = {
    small: {
        "Pizza Bagels" : 300,
        "Thin Crust" : 400,
        "Neapolitan Crust" : 505,
        "Flatbread" : 350,
    },
    medium: {
        "Pizza Bagels" : 500,
        "Thin Crust" : 600,
        "Neapolitan Crust" : 605,
        "Flatbread" : 850,
    },
    large: {
        "Pizza Bagels" : 700,
        "Thin Crust" : 800,
        "Neapolitan Crust" : 705,
        "Flatbread" : 950,
    }
}

var toppings = {
    small: {
        "Margheritta: Tomato,cheese,oregano" : 300,
        "Napoletana: Tomato,anchovies,garlic" : 400,
        "Prosciuto:Tomato,cheese,ham,olives" : 505,
        "Funghi: Tomato,cheese,mushrooms" : 350,
        "Romana: Tomato,chesse,tuna, onion" : 350,
    },
    medium: {
        "Margheritta: Tomato,cheese,oregano" : 400,
        "Napoletana: Tomato,anchovies,garlic" : 500,
        "Prosciuto:Tomato,cheese,ham,olives" : 605,
        "Funghi: Tomato,cheese,mushrooms" : 450,
        "Romana: Tomato,chesse,tuna, onion" : 650,
    },
    large: {
        "Margheritta: Tomato,cheese,oregano" : 500,
        "Napoletana: Tomato,anchovies,garlic" : 600,
        "Prosciuto:Tomato,cheese,ham,olives" : 705,
        "Funghi: Tomato,cheese,mushrooms" : 550,
        "Romana: Tomato,chesse,tuna, onion" : 750,
    }
}

var deliveryCost = 1100;
var onePizza = "";
var clientOrder = "";

$(function () {
    $("#pizza-style").submit(function(e) {
        e.preventDefault()
        var chosenSize = $("#size").val();
        var chosenCrust = $("#crust").val();
        var chosenToppings = []; 
        for(var i = 1; i <= 5; i++){
            var b = $("#check"+i).is(":checked");
            if(b === true){
                chosenToppings.push($("#check"+i).val());
            }
        }
        onePizza = new PizzaStyle(chosenSize, chosenCrust, chosenToppings);
        display("one-pizza-price","RWF " + onePizza.getOnePizzaPrice());
        $(".section-3").removeClass("hidden")

    })

    $("#order-quantity").submit(function(e) {
        e.preventDefault();
        var quantity = $("#quantity").val();
        clientOrder = new Order(onePizza, quantity);
        $(".section-4").removeClass("hidden")
    })

    $("#pizza-delivery").submit(function(e) {
        e.preventDefault()
        var y_delivery = $("#y_delivery").is(":checked");

        if(y_delivery === true){
            var location = prompt("Enter your location", "enter location")
            clientOrder.setDelivery(true, location);
        }
        clientOrder.displayOrder();
        $(".section-5").removeClass("hidden")

    })
})

function PizzaStyle(chosenSize, chosenCrust, chosenToppings) {
    this.chosenSize = chosenSize;
    this.chosenCrust = chosenCrust;
    this.chosenToppings = chosenToppings;
};

PizzaStyle.prototype.getOnePizzaPrice = function(){
    var onePizzaPrice = pizzaBasePrice[this.chosenSize];
    onePizzaPrice += crust[this.chosenSize][this.chosenCrust];
    for(var k = 0; k < this.chosenToppings.length; k++){
        var d = this.chosenToppings[k];
        onePizzaPrice += toppings[this.chosenSize][d];
    }
    return onePizzaPrice;
}

function Order(pizzaStyle, quantity){
    this.pizzaStyle = pizzaStyle;
    this.quantity = quantity;
    this.needsDelivery = false;
    this.deliveryLocation = "";
}

Order.prototype.setDelivery = function(needsDelivery, deliveryLocation){
    this.needsDelivery = needsDelivery;
    this.deliveryLocation = deliveryLocation;
}

Order.prototype.getTotalAmount = function(){
    var totalAmount = 0;
    totalAmount = this.pizzaStyle.getOnePizzaPrice() * this.quantity;
    if(this.needsDelivery === true){
    totalAmount += deliveryCost;       
    }
    return totalAmount;
}

function display(id, txt) {
    $("#"+id).text(txt)
}
PizzaStyle.prototype.displayPizzaStyle = function(){
    display("chosen-size", this.chosenSize);
    display("chosen-crust", this.chosenCrust);
    var top = "";
    for(var k = 0; k < this.chosenToppings.length; k++){
        top += this.chosenToppings[k] + " | ";
    }
    if(top === ""){
        display("chosen-toppings", "No toppings chosen");
    }
    else{
        display("chosen-toppings", top);
    }
}

Order.prototype.displayOrder = function() {
    this.pizzaStyle.displayPizzaStyle();
    if(this.needsDelivery === true ){
        display("delivery-details", "Location: "+this.deliveryLocation + ", Cost: "+ deliveryCost);
    }else{
        display("delivery-details", " No delivery needed");
    }
    alert("total-amount", "RWF "+ this.getTotalAmount());
}