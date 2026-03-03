const toggle = document.getElementById("themeToggle");

if(toggle){
toggle.addEventListener("click", () => {
let html = document.documentElement;
let current = html.getAttribute("data-theme");
html.setAttribute("data-theme", current === "light" ? "dark" : "light");
});
}

const searchInput = document.getElementById("liveSearch");

if(searchInput){
searchInput.addEventListener("input", function(){
let value = this.value.toLowerCase();
let cards = document.querySelectorAll(".car-card");

cards.forEach(card => {
card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none";
});
});
}