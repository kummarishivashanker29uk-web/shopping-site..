// Arrays to hold cart and wishlist items
let cart = [];
let wishlist = [];

// Update the cart display with current items and total price
function updateCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price;
  });
  document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Add item to cart and update display
document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', event => {
    const productDiv = event.target.closest('.product');
    const name = productDiv.getAttribute('data-name');
    const price = parseFloat(productDiv.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
  });
});

// Save item to wishlist, alert user
document.querySelectorAll('.save-btn').forEach(button => {
  button.addEventListener('click', event => {
    const productDiv = event.target.closest('.product');
    const name = productDiv.getAttribute('data-name');
    if (!wishlist.includes(name)) {
      wishlist.push(name);
      alert(`Saved "${name}" to your wishlist.`);
    } else {
      alert(`"${name}" is already in your wishlist.`);
    }
  });
});

// Show payment form when checkout button clicked
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  document.getElementById('payment-form').style.display = 'block';
  document.getElementById('checkout-btn').style.display = 'none';
});

// Handle payment form submission and simulate payment success
document.getElementById('pay-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('message').textContent = 'Payment successful! Thank you for your purchase.';
  cart = [];
  updateCart();
  e.target.reset();
  setTimeout(() => {
    document.getElementById('payment-form').style.display = 'none';
    document.getElementById('checkout-btn').style.display = 'block';
    document.getElementById('message').textContent = '';
  }, 4000);
});
