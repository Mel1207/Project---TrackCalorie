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


    // Public methods
    return {
        getItems: function() {
            return data.items;
        },
        logData: function() {
            return data;
        }
    }
})();

// UI Controler
const uiCtrl = (function() {
    const UISelectors = {
        itemList: '#item-list'
    }
    
    // Public Methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} calories</em>
                    <a href="#!" class="secondary-content">
                        <i class="edit-item fas fa-pencil-alt"></i>
                    </a>
                </li>
                `
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html; 
        }
    }
})();


// App Controler
const appCtrl = (function(itemCtrl, uiCtrl) {
    

    // Public Methods
    return {
        init: function () {
            console.log('App Initializing...');
            // Fetch items from data structure
            const items = itemCtrl.getItems();

            // Populate items from UI controler
            // UICtrl.populateItemList(items);
            uiCtrl.populateItemList(items)
        }
    }
})(itemCtrl, uiCtrl);


appCtrl.init();