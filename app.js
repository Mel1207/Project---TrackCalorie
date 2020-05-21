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
        getItemByID: function(id) {
            let found = null;
            // loop thru the items
            data.items.forEach(function (item) {
                if(item.id === id) {
                    found = item;
                }
            });
            return found; 
        },
        deleteItem: function(id) {
            // get the id
            ids = data.items.map(function(item) {
                return item.id;
            });

            // get index
            const index = ids.indexOf(id);

            // remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function () {
            data.items = [];
        },
        setCurrentItem: (item) => {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
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
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
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
        deleteListItem: function (id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value = itemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = itemCtrl.getCurrentItem().calories;
            uiCtrl.showEditState();
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.itemList);

            // turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            });
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function (totalCalores) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalores;
        },
        clearEditState: function() {
            uiCtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            // uiCtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
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

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);

        // Delete button event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', uiCtrl.clearEditState);

        // Clear button event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
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

    // Update Item submit
    const itemUpdateSubmit = function (e) {
        // console.log('edited');
        if(e.target.classList.contains('edit-item')) {
            const listID = e.target.parentNode.parentNode.id;
            // console.log(listID);

            // break into an array
            const listIDArray = listID.split('-');

            // get the actual id
            const id = parseInt(listIDArray[1]);

            const itemToEdit = itemCtrl.getItemByID(id);
            // console.log(listIDArray)

            // set the current item
            itemCtrl.setCurrentItem(itemToEdit);

            // add item to form
            uiCtrl.addItemToForm();
        } else {
            // console.log('no edit target');
        }
        e.preventDefault()
    }

    // Delete button event
    const itemDeleteSubmit = function (e) {
        // Get current item
        const currentItem = itemCtrl.getCurrentItem();

        // Delete from data structure
        itemCtrl.deleteItem(currentItem.id);
        
        // delete from ui
        uiCtrl.deleteListItem(currentItem.id);
        e.preventDefault();

        // Get the total calories
        const totalCalories = itemCtrl.getTotalCalories(); 
        // add total calories to ui
        uiCtrl.showTotalCalories(totalCalories);
    }

    // Clear items event
    const clearAllItemsClick = function () {
        // Delete all items from data structure
        itemCtrl.clearAllItems();

        // Get the total calories
        const totalCalories = itemCtrl.getTotalCalories(); 
        // add total calories to ui
        uiCtrl.showTotalCalories(totalCalories);

        // hide the ul
        uiCtrl.hideList();

        // remove from ui
        uiCtrl.removeItems();
    }
    

    // Public Methods
    return {
        init: function () {
            // Clear Edit State
            uiCtrl.clearEditState();

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