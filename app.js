// Storage Controler


// Item Controler
const itemCtrl = (function() {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structures
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 500},
            {id: 2, name: 'Egg', calories: 200}
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        logData: function() {
            return data;
        }
    }
})();

// UI Controler
const uiCtrl = (function() {
    
    // Public Methods
    return {

    }
})();


// App Controler
const appCtrl = (function(itemCtrl, uiCtrl) {
    

    // Public Methods
    return {
        app: console.log('App Initializing...')
    }
})(itemCtrl, uiCtrl);


appCtrl.app();