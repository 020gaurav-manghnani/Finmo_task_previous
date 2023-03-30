const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('data');
const decodedData = JSON.parse(atob(encodedData));

document.getElementById('summary-name').textContent = decodedData.name;
document.getElementById('summary-email').textContent = decodedData.email;
document.getElementById('summary-address').textContent = decodedData.address;
document.getElementById('summary-credit-card').textContent = decodedData.creditCard;
document.getElementById('summary-expiry-date').textContent = decodedData.expiryDate;
document.getElementById('summary-cvv').textContent = decodedData.cvv;
document.getElementById('summary-sum').textContent = decodedData.sum;


const selectedProductIds = JSON.parse(localStorage.getItem('selectedProductIds'));
const productList = document.querySelector('#checkout-summary');

selectedProductIds.forEach(productId => {
  // retrieve product information from a database or API using the product ID
  const product = getProductById(productId);

  // create a DOM element to display the product information
  const productDiv = document.createElement('div');
  productDiv.classList.add('checkout-product');

  const title = document.createElement('h3');
  title.textContent = product.title;
  productDiv.appendChild(title);

  const price = document.createElement('p');
  price.textContent = product.price;
  productDiv.appendChild(price);

  productList.appendChild(productDiv);
});
