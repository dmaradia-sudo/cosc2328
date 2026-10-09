// IC13 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

// --- Order State ---
 
let selectedProduct = null;
let currentQuantity = 1;
let discountRate = 0;
 
// --- Display Update Functions ---
 
// Price math lives in one place so the summary and the submit alert always match
function calculateTotal() {
    return selectedProduct.price * currentQuantity * (1 - discountRate);
}
 
function updateOrderSummary() {
    const summaryProduct = document.getElementById("summary-product");
    const summaryTotal = document.getElementById("summary-total");
 
    if (selectedProduct) {
        summaryProduct.textContent = "Product: " + selectedProduct.name;
        summaryTotal.textContent = "Total: $" + calculateTotal().toFixed(2);
    } else {
        summaryProduct.textContent = "No product selected";
        summaryTotal.textContent = "Total: $0";
    }
}
 
// --- Mouse Events: product Selection (event delegation + dataset )---
 
const productGallery = document.querySelector("#product-gallery");
const productNameInput = document.querySelector("#product-name");
 
productGallery.addEventListener("click", function(e) {
    const card = e.target.closest(".product-card");
    if (card) {
        selectedProduct = {
            name: card.dataset.productName,
            price: parseFloat(card.dataset.price)
        };
        productNameInput.value = selectedProduct.name;
        updateOrderSummary();
    }
});
 
// --- Keyboard Events: live promo code feedback ---
 
const promoCodeInput = document.querySelector("#promo-code");
const promoMessage = document.querySelector("#promo-message");
 
promoCodeInput.addEventListener("keyup", function(e) {
    const promoCode = e.target.value.toUpperCase();
    if (promoCode === "") {
        discountRate = 0;
        promoMessage.textContent = "";
    } else if (promoCode === "SAVE10") {
        discountRate = 0.10; // 10% discount
        promoMessage.textContent = "Promo code applied! You get a 10% discount.";
    } else {
        discountRate = 0;
        promoMessage.textContent = "Invalid promo code.";
    }
    updateOrderSummary();
});
 
// --- Form Events: Submit validation ---
const orderForm = document.querySelector("#order-form");
orderForm.addEventListener("submit", function(e) {
    e.preventDefault();
 
    if (!selectedProduct) {
        alert("Please select a product before submitting the order.");
        return;
    }
    const total = calculateTotal();
    const orderDetails = 'Order placed successfully!\n' +
        "Product: " + selectedProduct.name + '\n' +
        "Quantity: " + currentQuantity + '\n' +
        "Total: $" + total.toFixed(2);
 
    alert(orderDetails);
});

