const sumInput = document.querySelector("#sum");
const checkcontinueButton = document.querySelector("#continue");
const convertedSum = document.querySelector("#converted-sum");

const apiUrl = "https://api.frankfurter.app/latest?from=USD&to=AUD";

const getConvertedSum = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rate = data.rates.AUD;
    const convertedValue = parseFloat(sumInput.value) * rate;
    convertedSum.innerText = `Total Value: ${convertedValue.toFixed(2)} AUD`;
  } catch (error) {
    console.error(error);
    convertedSum.innerText = "Error converting sum";
  }
};

checkcontinueButton.addEventListener("click", getConvertedSum);

// creating payin table as per form response

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form data
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const address = document.querySelector("#address").value;
  const creditCard = document.querySelector("#credit-card").value;
  const expiryDate = document.querySelector("#expiry-date").value;
  const cvv = document.querySelector("#cvv").value;
  const sum = document.querySelector("#sum").value;
  
  // Check if all required fields are filled
  const requiredFields = [name, email, address, creditCard, expiryDate, cvv];
  const allFilled = requiredFields.every((field) => field !== "");
  
  // If all required fields are not filled, do not create the table
  if (!allFilled) {
    convertedSum.innerHTML = "Please fill in all required fields.";
    return;
  }
  
  // Generate a checkout ID
  const checkoutId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Store the form data in localStorage
  const checkoutData = { name, email, address, creditCard, expiryDate, cvv, sum };
  localStorage.setItem(checkoutId, JSON.stringify(checkoutData));
  
  // Create checkout link
  const encodedData = btoa(JSON.stringify(checkoutData));
  const link = document.createElement("a");
  link.href = `checkout_summary.html?data=${encodedData}`;
  link.target = "_blank";
  link.innerText = "Checkout Link";
  document.body.appendChild(link);

  // Create table row
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");

  const data = [
    { label: "Name:", value: name },
    { label: "Email:", value: email },
    { label: "Address:", value: address },
    { label: "Credit Card Number:", value: creditCard },
    { label: "Expiry Date:", value: expiryDate },
    { label: "CVV:", value: cvv },
    { label: "Sum:", value: sum },
  ];

  data.forEach((item) => {
    const row = document.createElement("tr");
    const labelCell = document.createElement("td");
    const valueCell = document.createElement("td");
    labelCell.textContent = item.label;
    valueCell.textContent = item.value;
    row.appendChild(labelCell);
    row.appendChild(valueCell);
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  convertedSum.innerHTML = "";
  convertedSum.appendChild(table);

});

// Add event listener to Payment button

