// FOR THE SHOP ITEMS
let shop = document.getElementById("shop")

// FOR THE CART TO STORE DATA INSIDE THE JSON

let basket = JSON.parse(localStorage.getItem("data")) || []

// FOR THE SEARCH BAR

let searchInput = document.getElementById("searchInput");

searchInput.addEventListener('keyup', function(e) {
    let searchString = e.target.value.toLowerCase();

    let filteredItems = shopItemData.filter((item) => {
        return item.name.toLowerCase().includes(searchString);
    });

    generateShop(filteredItems);
});

// TO GENERATE THE DOM FOR THE SHOP ITEMS
let generateShop = (items) => {
    shop.innerHTML = items.map((x) => {
        let {id,name,price,desc,img,popupImages} = x;
        let search = basket.find((x)=>x.id === id ) || []
  
        return `  
    <div id = product-id-${id} class="item" ondblclick='togglePopup("${id}")'>    
    <img src=${img}>
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <button onclick='togglePopup("${id}")' class="details-button">Show Details</button>
        <div class="price-quantity">
            <h2>${price}</h2>
            <div class="buttons">
                <i onclick='decrement("${id}")' class="bi bi-dash"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                <i onclick='increment("${id}")' class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
    </div>`;
    }).join("");
};

function togglePopup(id){

    let item = shopItemData.find(x => x.id === id);
    let search = basket.find((x)=>x.id === id ) || []

    let popupContent = `
        <div class="popup-box">
            <div class="right-box">
                <div class="main-image-box">
                    <img src="${item.img}" class="main-image" id="main-image">
                </div>
                <div class="small-images">
                    ${item.popupImages.map((src, index) => `<div class="image-box"><img src="${src}"  class="popup-box-image" id="popup-box-image-${index}"></div>`).join("")}
                </div>
            </div>
            <div class="details-box">
                <h2>Birr ${item.price}</h2>
                <h2>Specifications</h2>
                <p class="vertical-text">${item.spec}</p>
                <div class="buttons">
                    <i onclick='decrement("${id}")' class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick='increment("${id}")' class="bi bi-plus-lg"></i>
                </div>
                <button>Check Reviews</button>
            </div>
        </div>
        <div class="close-btn" onclick='togglePopup("${id}")'>&times;</div>`;
    document.querySelector(".content").innerHTML = popupContent
    document.getElementById("popup-1").classList.toggle("active");
    
    item.popupImages.forEach((src, index) => {
        document.getElementById(`popup-box-image-${index}`).onclick = function() {
            document.getElementById("main-image").src = src;
        };
    });
}

generateShop(shopItemData)

window.increment = function(id) {
    let selectedItem = shopItemData.find(x => x.id === id);
    let search = basket.find((x)=>x.id === selectedItem.id);
    if(search === undefined){  
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
        // Update the quantity on the page immediately after the item is added to the basket
        document.getElementById(id).textContent = 1;
        document.getElementById(`product-id-${id}`).querySelector('.quantity').textContent = 1;
    } else {
        search.item += 1;
        // Update the quantity on the page
        document.getElementById(id).textContent = search.item;
        document.getElementById(`product-id-${id}`).querySelector('.quantity').textContent = search.item;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    // Call the calculation function to update the cart icon
    calculation();
}

window.decrement = function(id) {
    let selectedItem = shopItemData.find(x => x.id === id);
    let search = basket.find((x)=>x.id === selectedItem.id);
    if(search === undefined || search.item === 0) return;
    search.item -= 1;
    // If the quantity is now zero, remove the item from the basket
    if(search.item === 0) {
        basket = basket.filter(item => item.id !== id);
    }
    // Update the quantity in the popup and the main page
    document.getElementById(id).textContent = search.item;
    document.getElementById(`product-id-${id}`).querySelector('.quantity').textContent = search.item;
    localStorage.setItem("data", JSON.stringify(basket));
    // Call the calculation function to update the cart icon
    calculation();
}

// FOE THE CALCULATION AND THE UPDATE FUNCTION

let update = (id) =>{
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = (basket.map((x)=>x.item).reduce((x,y)=>x+y,0))
};

calculation()

// FOR THE HAMBURGER MENU OF THE NAV BAR

const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".bi-file-excel");
const openMenu = document.querySelector(".openMenu");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close); 

function show(){
    mainMenu.style.display = "flex"
    mainMenu.style.top = "0"
}

function close(){
    mainMenu.style.top = "-100%"
}



// To rclose the popup when clicking outside the popup

let overlay = document.querySelector('.popup .overlay');

overlay.addEventListener('click', function() {
    document.getElementById("popup-1").classList.remove("active");
});



// FOR THE SCROLL UP
const toTop = document.querySelector(".to-top")

window.addEventListener("scroll", checkHeight)
function checkHeight(){
    if(window.scrollY > 100){
        toTop.style.display = "flex"
    } else{
        toTop.style.display = "none"
    }
}


//  FOR THE ARROW TO CHANGE COLOR WHEN IN THE FOOTER
let footer;
let footerOffset;

window.onload = function() {
    footer = document.querySelector('.footer-container');
    footerOffset = footer.offsetTop;

    window.addEventListener("scroll", checkHeight);
}

function checkHeight() {
    if(window.scrollY > 100){
        toTop.style.display = "flex"
    } else{
        toTop.style.display = "none"
    }
    let footerRect = footer.getBoundingClientRect();
    if(window.scrollY + window.innerHeight > window.scrollY + footerRect.top + 90){
        toTop.style.color = "red";
    } else{
        toTop.style.color = "black";
    }
}





