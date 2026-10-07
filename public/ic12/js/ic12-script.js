// IC12 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

// --- Element Selection by ID ---

const statusBox = document.getElementById("status-box");
statusBox.textContent = "DOM is ready! Elements succesfully selected";
console.log("Status Box:", statusBox);


// --- Query selector ---
const firstCard = document.querySelector(".card");
firstCard.querySelector("p").textContent = "This is the first card. It has been updated using querySelector.";

// ClassList.add

firstCard.classList.add("highlight");
statusBox.classList.add("active");

// --- Query selector all ---
const listItems = document.querySelectorAll(".list-item");
listItems.forEach((item, index) => {
    if(index % 2 === 0) {
        item.classList.add("highlight");

    }

});

// --- classlist.toggle + classList.remove ---

const thirdCard = document.querySelector("#card-3");
thirdCard.classList.toggle("hidden");

const secondCard = document.querySelector("#card-2");
secondCard.classList.remove("card");

// -- textContent vs innerHTML safety --- 
const secondCardParagraph = secondCard.querySelector("p");
secondCardParagraph.textContent = "Safe update: event ext like <script>alert('hack)</script> renders as plain characters, not real html";

