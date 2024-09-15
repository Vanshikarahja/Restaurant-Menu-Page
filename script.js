// Variables to hold cart items and total
let cart = [];
let cartTotal = 0;

// Filter menu items based on category
const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    filterMenu(category);
  });
});

function filterMenu(category) {
  menuItems.forEach((item) => {
    if (category === "all" || item.getAttribute("data-category") === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Add to cart functionality
const cartContainer = document.querySelector(".cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const itemName = button.getAttribute("data-name");
    const itemPrice = parseFloat(button.getAttribute("data-price"));
    addToCart(itemName, itemPrice);
  });
});

function addToCart(itemName, itemPrice) {
  const item = { name: itemName, price: itemPrice };
  cart.push(item);
  cartTotal += itemPrice;
  updateCartDisplay();
}

function updateCartDisplay() {
  // Clear previous cart items
  cartContainer.innerHTML = "";

  // Display cart items with a "Remove" button for each item
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
    cartContainer.appendChild(cartItem);
  });

  // Update total price
  cartTotalDisplay.textContent = cartTotal.toFixed(2);

  // Add event listeners to "Remove" buttons
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  // Update cart total and remove item from cart
  cartTotal -= cart[index].price;
  cart.splice(index, 1);

  // Update the cart display
  updateCartDisplay();
}
