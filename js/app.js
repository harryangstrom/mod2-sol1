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


/*     buyList.buyItem = function (itemIndex) {
        try {
            ShoppingListCheckOffService.buyItem(itemIndex);
        } catch (error) {
            buyList.errorMessage = error.message;
        }
    }; */

    buyList.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    };

    buyList.message = function () {
        if (buyList.items=="") {
            return ("Everything is bought!");
        }
    };

    buyList.empty = function() {
        return (buyList.items=="");
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
        { name: "speakers", quantity: 18}
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
        boughtItems = boughtItems.sort(compara);
        console.log("initialItems: ", initialItems);
        console.log("boughtItems: ", boughtItems);
        // if (initialItems.length == 0) throw new Error("Everything is bought!");
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
        initialItems = initialItems.sort(compara);
        boughtItems.splice(index, 1);
    };

    function compara (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }



}
})();