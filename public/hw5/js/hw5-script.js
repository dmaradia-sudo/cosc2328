/* HW5 – COSC 2328 – Professor McCurry
   Implemented by: [Diego Maradiaga] */

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");

const book1 = {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    price: 15.99
};
const book2 = {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    price: 12.99
};
const book3 = {
    title: "Dune",
    author: "Frank Herbert",
    price: 10.99
};

const TAX_RATE = 0.0825;
let isMember = true;
console.log("--- Book Inventory ---");
console.log(book1.title + " by " + book1.author + " - $" + book1.price);
console.log(book2.title + " by " + book2.author + " - $" + book2.price);
console.log(book3.title + " by " + book3.author + " - $" + book3.price);


// Function Declarations part

function calculateSubtotal(price, quantity) {
    return price * quantity;
}
function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
}

console.log("--- Function Declarations Test ---");
console.log(formatCurrency(calculateSubtotal(10, 2)));

const calculateTax = (subtotal) => subtotal * TAX_RATE;

const applyMemberDiscount = (subtotal, isMember) => {
    return isMember ? subtotal * 0.9 : subtotal;
};
console.log("--- Arrow Functions Test ---");
console.log(formatCurrency(calculateTax(20)));
console.log(formatCurrency(applyMemberDiscount(20, true)));

const calculateTotal = function(price, quantity = 1, isMember = false) {
    const subtotal = calculateSubtotal(price, quantity);
    const discounted = applyMemberDiscount(subtotal, isMember);
    const tax = calculateTax(discounted);

    return discounted + tax;
};

console.log("--- Function Expression with Defaults ---");
console.log(formatCurrency(calculateTotal(15.99, 2, true)));
console.log(formatCurrency(calculateTotal(15.99, 2)));
console.log(formatCurrency(calculateTotal(15.99)));


// Rest Operator

function calculateBulkOrder(...prices) {
    let total = 0;

    for (const price of prices) {
        total += price;
    }

    return total;
}

console.log("--- Rest Operator Test ---");
console.log(formatCurrency(calculateBulkOrder(5, 10, 15)));
console.log(formatCurrency(calculateBulkOrder(5, 10, 15, 20, 25)));


// Callback Functions

function processOrder(book, quantity, callback) {
    const total = callback(book.price, quantity);
    return book.title + " - " + formatCurrency(total);
}

const standardPricing = (price, quantity) => price * quantity;
const memberPricing = (price, quantity) => price * quantity * 0.9;

console.log("--- Callback Functions ---");
console.log(processOrder(book1, 2, standardPricing));
console.log(processOrder(book1, 2, memberPricing));

const orderSummary = {
    customerName: "Diego",
    items: [],

    addItem(book, quantity) {
        this.items.push({ book, quantity });
    },

    getTotal() {
        let total = 0;

        for (const item of this.items) {
            total += item.book.price * item.quantity;
        }

        return total;
    },

    displaySummary() {
        return "Customer: " + this.customerName +
            "\nTotal: " + formatCurrency(this.getTotal());
    }
};

console.log("--- Object Methods ---");
orderSummary.addItem(book1, 2);
orderSummary.addItem(book2, 1);
console.log(formatCurrency(orderSummary.getTotal()));
console.log(orderSummary.displaySummary());


// Truthy/Falsy

function validateDiscount(code) {
    if (code) {
        code = code.toUpperCase();
        if (code === "MEMBER10") {
            return 0.10;
        }

        if (code === "SAVE20") {
            return 0.20;
        }
    }
    return 0;
}

console.log("--- Truthy/Falsy Validation ---");
console.log(validateDiscount("MEMBER10"));
console.log(validateDiscount("SAVE20"));
console.log(validateDiscount(""));
console.log(validateDiscount("INVALID"));

function createOrderProcessor(storeName) {
    const storeTaxRate = 0.0825;

    function processStoreOrder(book, quantity) {
        const subtotal = book.price * quantity;
        const total = subtotal + subtotal * storeTaxRate;

        return storeName + " - " + book.title + " - " + formatCurrency(total);
    }

    return processStoreOrder;
}

console.log("--- Nested Functions & Closures ---");
const storeProcessor = createOrderProcessor("Campus Bookstore");
console.log(storeProcessor(book1, 2));
console.log(storeProcessor(book2, 1));