const outletButtons = document.querySelectorAll('.outlet-btn');
const productsContainer = document.querySelector('.products-container');
let products = [];

outletButtons.forEach(button => {
  button.addEventListener('click', () => {
    const outletId = button.dataset.outletId;
    fetch(`https://dummyjson.com/products?limit=10&skip=10&select=title,id${outletId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.products)) {
          products = data.products;
          productsContainer.innerHTML = '';
          products.forEach(product => {
            const li = document.createElement('li');
            li.classList.add('product-item');
            li.dataset.productId = product.id;
            li.dataset.productName = product.title;

            const div = document.createElement('div');
            div.textContent = `${product.title} - ${product.id}`;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'product';
            checkbox.value = product.title;
            li.appendChild(div);
            li.appendChild(checkbox);
            productsContainer.appendChild(li);
          });

        } else {
          console.log('Error: Data returned from API is not an array');
        }
      })
      .catch(err => console.log(err));
  });
});

// Function to render products in the container
function renderProducts(products) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    li.classList.add('product-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('product-item__checkbox');
    checkbox.dataset.productId = product.id;

    const title = document.createElement('h3');
    title.classList.add('product-item__title');
    title.textContent = product.title;

    li.appendChild(checkbox);
    li.appendChild(title);

    productList.appendChild(li);
  });
}
// add an event listener to the checkout button in the product list page that saves 
// the IDs of the selected products to localStorage

const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
  const selectedProductIds = Array.from(document.querySelectorAll('.product-item__checkbox:checked')).map(checkbox => checkbox.dataset.productId);
  localStorage.setItem('selectedProductIds', JSON.stringify(selectedProductIds));
});


// Add a listener to the "Checkout" button
const continueButton = document.querySelector('.continue-btn');
continueButton.addEventListener('click', () => {
  const cartItems = document.querySelectorAll('.product-item');
  if (cartItems.length === 0) {
    console.log('Error: Cart is empty');
    return;
  }

  const products = [];
  let sumIds = 0;
  cartItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      const productName = item.dataset.productName;
      const productId = item.dataset.productId;
      products.push({ name: productName, id: productId });
      sumIds += parseInt(productId);
    }
  });

  console.log(`Sum of products: ${sumIds}`);
  
  // console.log(valuee);
  fetch('https://dummyjson.com/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ products, sumIds })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Error processing checkout');
    }
    // Process successful checkout
    console.log('Checkout successful!');
    // Clear the cart
    cartItems.forEach(item => item.remove());
  })
  .catch(err => console.log(err));
});

const checkoutButton = document.querySelector('.checkout-btn');
checkoutButton.addEventListener('click', () => {
  // Do nothing if continue button has not been clicked
  if (!continueButton.classList.contains('clicked')) {
    return;
  }

  const cartItems = document.querySelectorAll('.product-item');
  if (cartItems.length === 0) {
    console.log('Error: Cart is empty');
    return;
  }
  

  // Reset continue button clicked state
  continueButton.classList.remove('clicked');

  // Get the sum of product IDs
  let sumIds = 0;
  cartItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      sumIds += parseInt(item.dataset.productId);
    }
  });

  // Process the checkout
  // console.log(`Sum of IDs: ${sumIds}`);
  
  fetch('https://dummyjson.com/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sumIds })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Error processing checkout');
    }
    // Process successful checkout
    console.log('Checkout successful!');
    // Clear the cart
    cartItems.forEach(item => item.remove());
  })
  .catch(err => console.log(err));
});



  
const continueBtn = document.querySelector(".continue-btn");
const cartValue = document.querySelector(".cart-value");

continueBtn.addEventListener("click", () => {
  let sum = 0;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach((checkbox) => {
    sum += Number(checkbox.dataset.price);
  });
  cartValue.textContent = `Cart Value: Rs ${sum.toFixed(2)}`;
});
let total = 0;

function calculateTotal() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  checkboxes.forEach(checkbox => {
    const price = parseFloat(checkbox.dataset.price);
    total += price;
  });
  document.querySelector('.sum-container').textContent = `Sum: $${total.toFixed(2)}`;
  document.querySelector('.cart-value').textContent = `Cart Value: $${total.toFixed(2)}`;
}


// export const myVariable = 11;
