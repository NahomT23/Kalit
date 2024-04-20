// FOR HAMBURGER MENU
// At the end of your cart.js script
window.onload = function() {
    calculation();
}


const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".bi-file-excel");
const openMenu = document.querySelector(".openMenu");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close); // This line was corrected

function show(){
    mainMenu.style.display = "flex"
    mainMenu.style.top = "0"
}

function close(){
    mainMenu.style.top = "-100%"
}


let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")
let basket = JSON.parse(localStorage.getItem("data")) || []


let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0)
};

calculation()

let generateCardItems = ()=>{
    if(basket.length !==0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let {id, item} = x
            let search = shopItemData.find((y)=> y.id === id) || []
            let {img, name, price} = search
            return`
            <div ${search.id} class="cart-item">
            <img src= ${img} width="100" >
            <div class="details">
            <div class = "title-price-x">
            <h4 class="title-price">
            <p>${name}</p>
            <p class="cart-item-price">$${price}</p>
            </h4>
            <i onclick="removeItem(${id})"class ="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>${item * price}</h3>
            </div>
            </div>`;
        })
        .join(""))
    }

    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="eco.html">
        <button class="HomeBtn">Back to Home</button></a>`
    }
}

generateCardItems()

let increment = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id ===  selectedItem.id)
    if(search === undefined){  
        basket.push({
            id: selectedItem.id,
            item: 1,
    })
}
else{
    search.item+=1
}
update(selectedItem.id)
basket = basket.filter((x) => x.item !==10)
generateCardItems()
localStorage.setItem("data", JSON.stringify(basket))
}

// FOR THE DECREMENT FUNCTION OF THE CART

let decrement = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id ===  selectedItem.id)
    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -=1
    }

    update(selectedItem.id)
    basket = basket.filter((x) => x.item !==0)   
    generateCardItems() 
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) =>{
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()
}


let removeItem = (id)=>{
    let selectedItem = id
    basket = basket.filter((x)=>x.id !== selectedItem.id)
    generateCardItems()
    totalAmount()
    localStorage.setItem("data", JSON.stringify(basket))
    calculation()
    totalAmount()
    
}

let clearCart = () =>{
    basket = []
    generateCardItems()
    localStorage.setItem("data", JSON.stringify(basket))
    calculation()
}



let totalAmount = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {item,id} = x;
            let search = shopItemData.find((y)=> y.id === id) || []
            return item * search.price
        }).reduce((x,y)=> x+y, 0)
        label.innerHTML = 
        `
        <h2>Total bill : $ ${amount}</h2>
        <button class= "checkout">Checkout</button>
        <button onclick = "clearCart()" class= "removeall">Clear cart</button>`

    }
    else return
}

totalAmount()
