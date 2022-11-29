// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded",setupItems);

// ****** functions **********

// add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
   createListItem(id, value);
    // display alert
      displayAlert("item added", "success");
    // show container
    container.classList.add("show-container");
    // set local storage
      addToLocalStorage(id, value);
    // set back to default
      setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;

    displayAlert("value changed", "success");

 
      editLocalStorage(editID, value);

    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items
function clearItems(){
const items = document.querySelectorAll(".grocery-item");
items.forEach(function(item){
  if(items.length>0){
  list.removeChild(item);
}

});
displayAlert("items removed", "danger");
setBackToDefault();
container.classList.remove("show-container");
localStorage.removeItem("list");
}
// delete item
function deleteItem(e){
  const item = e.currentTarget.parentElement.parentElement;

      list.removeChild(item);
      if(list.childElementCount===0){
      container.classList.remove("show-container");
}
  displayAlert("item removed", "danger");
  removeFromLocalStorage(item.dataset.id);
  setBackToDefault();
}



// edit item
function editItem(e){

const item = e.currentTarget.parentElement.parentElement;
editElement = e.currentTarget.parentElement.previousElementSibling;
editID = item.dataset.id;
grocery.value = editElement.textContent;
editFlag = true;
submitBtn.textContent = "edit";
}

// set backt to defaults
function setBackToDefault(){
  grocery.value = "";
  editFlag = false;
  submitBtn.textContent = "submit"
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value){
const grocery = {id, value};
console.log(grocery);
let arr = getArr();
arr.push(grocery);
localStorage.setItem("list",JSON.stringify(arr));
}
// edit localStorage
function editLocalStorage(id, value){
  let arr = getArr();
  arr = arr.map(function(item){
      if(item.id === id){
        item.value = value;
      }
      return item;
  });
  localStorage.setItem("list", JSON.stringify(arr));
}

// remove from local storage
function removeFromLocalStorage(id){
let arr = getArr();
arr = arr.filter(function(item){
  if(item.id !==id){
return item;
  }
});
localStorage.setItem("list", JSON.stringify(arr));
}
// ****** setup items **********
function setupItems(){
  let arr = getArr();
  if(arr.length>0){
    arr.forEach(function(item){
        createListItem(item.id, item.value)
    });
    container.classList.add("show-container");
  }
}

function getArr(){
  return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}


function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit">E</i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash">X</i>
              </button>
            </div>
          `;
   //add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}


















