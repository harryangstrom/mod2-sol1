(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getItemsToBuy();


    buyList.buyItem = function (itemIndex) {
        try {
            ShoppingListCheckOffService.buyItem(itemIndex);
        } catch (error) {
            buyList.errorMessage = error.message;
        }
    };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

/*     boughtList.items = function () {
        try {
            ShoppingListCheckOffService.getItemsBought();
        } catch (error) {
            boughtList.errorMessage = error.message;
        }
    }; */

    boughtList.items = ShoppingListCheckOffService.getItemsBought();

    boughtList.message = function () {
        // return (boughtList.items=="");
        if (boughtList.items=="") {
            return ("Nothing bought yet!");
        }
    };

    boughtList.empty = function () {
        return (boughtList.items=="");
    };

    boughtList.releaseItem = function (itemIndex) {
        ShoppingListCheckOffService.releaseItem(itemIndex);
    };
}

function ShoppingListCheckOffService() {
    var service = this;


    var initialItems = [
        { name: "mouse", quantity: 4},
        { name: "keyboard", quantity: 3},
        { name: "usb stick", quantity: 2},
        { name: "earphones", quantity: 1},
        { name: "joystick", quantity: 5},
    ];

    var boughtItems = [];


    service.getItemsToBuy = function () {
        return initialItems;
    };

    service.buyItem = function(index) {
        var itemBought = {
            name: initialItems[index].name,
            quantity: initialItems[index].quantity
        };
        boughtItems.push(itemBought) ;
        initialItems.splice(index, 1);
        console.log("initialItems: ", initialItems);
        console.log("boughtItems: ", boughtItems);
        if (initialItems.length == 0) throw new Error("Everything is bought!");
    };

     service.getItemsBought = function () {
        return boughtItems;
     }; 

    service.releaseItem = function(index) {
        var itemReleased = {
            name: boughtItems[index].name,
            quantity: boughtItems[index].quantity
        };
        initialItems.push(itemReleased);
        boughtItems.splice(index, 1);
    };



}
})();