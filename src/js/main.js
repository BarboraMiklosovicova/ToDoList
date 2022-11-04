// this is where we temporarily store the list of items to be able to store and load from storage
let items = [];

// we define a storage key to use for set and get storage later on
const storageKey = "todo-list";

// upon page load, we see if there is any stored items in local storage and apply these to the list
document.addEventListener("DOMContentLoaded", () => {
  const storedItems = loadListsFromStorage();
  if (storedItems) {
    items = storedItems;
    // loop through the loaded items to create the html elements to show on the page
    items.forEach((item) => {
      createItemElement(item.task, item.identifier);
    })
  }
});

//get access to these 3 container which will store the elements
const toDoItems = document.getElementsByClassName ("to-do-items")[0];
const input = document.getElementById("input");
const trashIcon = document.getElementById("trash");

// to be able to enter the value (task) via enter key
input.addEventListener("keydown", function(event){
  if (event.key === "Enter") {
    addItem();
  }
});

function addItem(){
  // we create an identifier to use later on in storage
  const identifier = `ID${Date.now()}`;
  const task = input.value;
  createItemElement(task, identifier);        // calling the function addItem
  storeItem(identifier, task);
  // reset the input field for next input    
  input.value = "";
}

function createItemElement(task, identifier) {
  let item = document.createElement("div");  // div for the whole box
  item.id = identifier;
  item.className = "item";
  item.innerHTML = "<div>" + task + "</div>"; //create annother div for input av the value of task

  let actionsArea = document.createElement("div");  // div to store the icons
  //creating icons
  let checkIcon = document.createElement("i");
  let trashIcon = document.createElement("i");
  let editIcon = document.createElement("i");

  checkIcon.className = "bi bi-check2-circle";
  checkIcon.style.color = "lightgrey";
  checkIcon.addEventListener("click", function () {
    checkIcon.style.color = "limegreen"
    item.style.textDecoration = "line-through";
    checkItem(identifier);
  })
  checkIcon.addEventListener("dblclick", function () {
    checkIcon.style.color = "lightgrey";
    item.style.textDecoration = "none";
    unCheckItem(identifier);
  })
  actionsArea.appendChild(checkIcon);   //added the icon to the divchild

  trashIcon.className = "bi bi-trash";
  trashIcon.style.color = "darkgrey";
  trashIcon.addEventListener("click", function () {
    removeItem(identifier);
    item.remove();
  })
  actionsArea.appendChild(trashIcon);  //add this to the divChild

  item.appendChild(actionsArea); // add this to the divParent -->divParent has the divChild that includes the icons and value

  toDoItems.appendChild(item);  // add divParent to the whole container

}

// push the item to the temp list + trigger storage
function storeItem(identifier, task, checked = false) {
  const item = {
    identifier: identifier,
    task: task,
    checked: checked
  };
  items.push(item);
  storeListsToStorage();
}

// remove the item from the temp list + trigger storage
function removeItem(identifier) {
  const itemIndex = items.findIndex((i) => i.identifier === identifier);
  items.splice(itemIndex, 1);
  storeListsToStorage();
}

function checkItem(identifier) {
  const itemIndex = items.findIndex((i) => i.identifier === identifier);
  const item = items.splice(itemIndex, 1)[0];
  storeItem(item.identifier, item.task, true);
}

function unCheckItem(identifier) {
  const itemIndex = items.findIndex((i) => i.identifier === identifier);
  const items = items.splice(itemIndex, 1);
  storeItem(item.identifier, item.task, false);
}

// helper method to store the data as stringified json in storage
function storeListsToStorage() {
  const data = JSON.stringify(items);
  localStorage.setItem(storageKey, data);
}

// helper method to load the data as json from the stored stringified list
function loadListsFromStorage() {
  const data = localStorage.getItem(storageKey);
  if (data) {
    const storedItems = JSON.parse(data);
    return storedItems;
  }
}

