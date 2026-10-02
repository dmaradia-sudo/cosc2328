// IC11 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]


// Step 5
console.log("--- Function Declarations ---");

function greet(name) { 
    return "Hello, " + name + "!"; 
}

console.log(greet("Maria"));

function area(length, width) { 
    return length * width; 
}

console.log("Area of 4 x 5: " + area(4, 5));


// Step 6
console.log("--- Function Expressions & Arrow Functions ---");

const multiply = function(a, b) { 
    return a * b; 
};

const divide = (a, b) => { 
    return a / b; 
};

const square = n => n * n;

console.log("Multiply 3 x 6: " + multiply(3, 6));
console.log("Divide 20 / 5: " + divide(20, 5));
console.log("Square of 7: " + square(7));


// Step 7
console.log("--- Default Parameters and Rest Operator ---");

function greetUser(name, greeting = "hello") { 
    return greeting + ", " + name + "!"; 
}

console.log(greetUser("Sam"));
console.log(greetUser("Sam", "Yo"));

function sumAll(...numbers) {
    let total = 0;
    for (let n of numbers) { 
        total += n; 
    }
    return total;
}

console.log("Sum: " + sumAll(1, 2, 3));
console.log("Sum: " + sumAll(5, 10, 15, 20));


// Step 8
console.log("--- Callback Functions ---");

function processNumber(value, callback) {
    console.log("Processing...");
    return callback(value);
}
const double = n => n * 2;
const triple = n => n * 3;

console.log("Double: " + processNumber(5, double));
console.log("Triple: " + processNumber(5, triple));

// Step 9
console.log("--- Object Methods (this) ---");
const product = {
    brand: "Acme",
    price: 12.5,
    quantity: 4,

    total() { 
        return this.price * this.quantity; 
    },

    describe() {
        return this.quantity + " x " + this.brand + 
            " @ $" + this.price + " each = $" + 
            this.total().toFixed(2);
    }
};
console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());