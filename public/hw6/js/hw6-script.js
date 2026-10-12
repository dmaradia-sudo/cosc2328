/*
  HW6 - Interactive Product Calculator
  COSC 2328, Professor McCurry
  Implemented by: Diego Maradiaga
*/


//6.2 Data objects — product prices & discount codes —
const productPrices = {
  laptop: 999.99,
  tablet: 499.99,
  phone: 699.99,
  monitor: 299.99
};

const discountCodes = {
  SAVE10: 0.10,
  SAVE20: 0.20,
  STUDENT: 0.15
};


// 6.3 Arrow function — calculateTax — 6 pts (IC11 applied)

const calculateTax = (subtotal) => subtotal * 0.0825;

//6.3 Arrow function — calculateTax — 6 pts (IC11 applied)
const applyDiscount = function (subtotal, code) {
  const cleanCode = code.trim().toUpperCase();
  if (discountCodes[cleanCode]) {
    return subtotal * discountCodes[cleanCode];
  }
  return 0;
};


//6.5 DOM element selection — 8 pts (IC12 applied)

const orderForm = document.getElementById("orderForm");
const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const discountInput = document.getElementById("discountCode");
const results = document.getElementById("results");
const resProduct = document.getElementById("resProduct");
const resQuantity = document.getElementById("resQuantity");
const resSubtotal = document.getElementById("resSubtotal");
const resDiscount = document.getElementById("resDiscount");
const resTax = document.getElementById("resTax");
const resTotal = document.getElementById("resTotal");


//6.6 Event listener & preventDefault — 8 pts (IC13 applied)

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();
    //6.7 Form data retrieval, bracket-notation lookup, & validation — 10 pts (IC8/IC10 applied + new: bracket notation)

  const selectedProduct = productSelect.value;
  const quantity = Number(quantityInput.value);
  const discountCode = discountInput.value.trim();

  if (selectedProduct === "" || quantity < 1) {
    alert("Please choose a product and enter a quantity of at least 1.");
    return;
  }
    //6.8 Calculations & DOM updates — 10 pts (IC9 applied + new: DOM updates)
  const price = productPrices[selectedProduct];
  const subtotal = price * quantity;
  const discountAmount = applyDiscount(subtotal, discountCode);
  const discountedSubtotal = subtotal - discountAmount;
  const tax = calculateTax(discountedSubtotal);
  const total = discountedSubtotal + tax;
  //6.9 Dynamic display — reveal & update the results — 10 pts (IC12 applied — capstone integration)

  resProduct.textContent = selectedProduct;
  resQuantity.textContent = quantity;
  resSubtotal.textContent = "$" + subtotal.toFixed(2);
  resDiscount.textContent = "-$" + discountAmount.toFixed(2);
  resTax.textContent = "$" + tax.toFixed(2);
  resTotal.textContent = "$" + total.toFixed(2);

  results.classList.remove("results-hidden");
});