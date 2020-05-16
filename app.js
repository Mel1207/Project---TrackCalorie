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
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookie', calories: 500},
            // {id: 2, name: 'Egg', calories: 200}
        ],
        currentItem: null,
        totalCalories: 0
    }


    // Public methods
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // Create ID
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            data.items.push(newItem);

            return newItem;
        },
        getTotalCalories: function() {
            let total = 0;

            // Loop thru items and add calories
            data.items.forEach(function (item) {
                total += item.calories;
                // total = total + item.calories;
            });

            // set the total calories in data structure
            data.totalCalories = total;

            return data.totalCalories;
        },
        logData: function() {
            return data;
        }
    }
})();

// UI Controler
const uiCtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
        },
        getItemInput: function() {
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // show list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

            // Add HTML
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} calories</em>
            <a href="#!" class="secondary-content">
                <i class="edit-item fas fa-pencil-alt"></i>
            </a>`;

            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function (totalCalores) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalores;
        },
        getSelectors: function () {
            return UISelectors;
        }
        
    }
})();


// App Controler
const appCtrl = (function(itemCtrl, uiCtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // Get UI Selectors
        const UISelectors = uiCtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', addItemSubmit);
    }

    // Add item submit
    const addItemSubmit = function (e) {

        // Get form input from ui controler
        const input = uiCtrl.getItemInput();

        if(input.name !== '' && input.calories !== '') {
            // add item
            const newItem = itemCtrl.addItem(input.name, input.calories)

            // add item to ui list
            uiCtrl.addListItem(newItem)

            // Get the total calories
            const totalCalories = itemCtrl.getTotalCalories();

            // add total calories to ui
            uiCtrl.showTotalCalories(totalCalories);

            // Clear fields
            uiCtrl.clearInput();
        } 
        e.preventDefault();    
    }
    

    // Public Methods
    return {
        init: function () {
            console.log('App Initializing...');
            // Fetch items from data structure
            const items = itemCtrl.getItems();

            // Check if there is any items
            if(items.length === 0) {
                uiCtrl.hideList();
            } else {
                // Populate items from UI controler
                // UICtrl.populateItemList(items);
                uiCtrl.populateItemList(items)
            }

            // Get the total calories
            const totalCalories = itemCtrl.getTotalCalories(); 
            // add total calories to ui
            uiCtrl.showTotalCalories(totalCalories);

            // Init loadEventListeners
            loadEventListeners();
        }
    }
})(itemCtrl, uiCtrl);


appCtrl.init();