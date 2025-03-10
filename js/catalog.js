/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionEl=document.createElement('option');
    selectElement.appendChild(optionEl);
    optionEl.textContent=Product.allProducts[i].name;
    optionEl.value=Product.allProducts[i].name;

  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();

  // TODO: Prevent the page from reloading

  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview(event);

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(event) {
  console.log(event);
  // TODO: suss out the item picked from the select list
  let selectItem = event.target[1].value;
  // TODO: get the quantity
  let selectQuantity = event.target[2].value;
  // TODO: using those, add one item to the Cart
  cart.addItem(selectItem,selectQuantity);
  console.log(cart);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
let itemCount = document.getElementById('itemCount');
 itemCount.textContent= cart.items.length;
 console.log(itemCount);

}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview(event) {
  // TODO: Get the item and quantity from the form
  let selectItem = event.target[1].value;
  let selectQuantity = event.target[2].value;
  // TODO: Add a new element to the cartContents div with that information
  let divEl= document.getElementById('cartContents');
  let ulEL= document.createElement('ul');
  divEl.appendChild(ulEL);
  let liEl=document.createElement('li');
  ulEL.appendChild(liEl);
  liEl.textContent=` you select :  ${selectItem} , ${selectQuantity}`;

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
