/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbodyEl = table.getElementsByTagName('tbody')[0];
  while (tbodyEl.firstElementChild) {
    tbodyEl.removeChild(tbodyEl.firstElementChild);
  }


}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  let tbodyEl = table.getElementsByTagName('tbody')[0];
  // TODO: Find the table body

  // TODO: Iterate over the items in the cart
  for (let i = 0; i < cart.items.length; i++) {
    // TODO: Create a TR
    let tRowEl = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    let tDataEldeletelink = document.createElement('td');
    tDataEldeletelink.setAttribute('id', cart.items[i].product);
    let deleteLinkEl = document.createElement('p');
    tDataEldeletelink.appendChild(deleteLinkEl);
    deleteLinkEl.textContent = 'x';
    deleteLinkEl.setAttribute('id', cart.items[i].product);
    deleteLinkEl.addEventListener('click', removeItemFromCart);

    let tDataElquantity = document.createElement('td');
    tDataElquantity.textContent = cart.items[i].quantity;

    let tDataElitem = document.createElement('td');
    tDataElitem.textContent = cart.items[i].product;
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tbodyEl.appendChild(tRowEl);
    tRowEl.appendChild(tDataEldeletelink);
    tRowEl.appendChild(tDataElquantity);
    tRowEl.appendChild(tDataElitem);

  }

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  let removeItem = event.target.id;
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].product === removeItem) {
      cart.removeItem(cart.items[i]);
    }
  }

  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table

 renderCart();

}
// This will initialize the page and draw the cart on screen
renderCart();
