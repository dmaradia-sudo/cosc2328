// IC10 -COSC 2328 - Professor McCurry
// Implemented by: [Diego Maradiaga]

const  city = "London"
const country = "United Kingdom"

let population = 942216

console.log("Location: " + city + ", " + country)
console.log("Population: " + population)

// Step 6: If/else
if (population > 1000000) {
  console.log(city + " is a metropolis.")
}
else{
    console.log(city + " is a growing city.")

}

// Step 7: boolean
let isLoggedIn = true;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in");
}

// Step 8 truthy / falsy
let username = "";
if (username) {
  console.log("Username accepted." + username);
} else {
  console.log("Username required")
}

// Step 9 - combined logic

const hasAccount = true;
const isEmailVerified = false;
const agreedToTerms = true;

if (hasAccount && isEmailVerified && agreedToTerms) {
  console.log("Access granted.");
} else {
  console.log("Access denied.");
}
