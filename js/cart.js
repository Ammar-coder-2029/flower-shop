// ================== the header ===========================
let userFname = localStorage.getItem("userFname");
let isloggin = localStorage.getItem("isloggin");
let links = document.querySelector(".links");
let userInfo = document.querySelector(".user-info");
let userDom = document.querySelector(".user");
let logoutBtn = document.getElementById("logout");


if (isloggin === "true") {
    links.style.display = "none";
    userInfo.style.display = "flex";
    userDom.innerHTML = "Hello, " + userFname;
}

logoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 500);
});


// ================== product in cart ===========================

let allproducts = document.querySelector(".productsCart")
let itemadded = localStorage.getItem("IteminCart") ? JSON.parse(localStorage.getItem("IteminCart")) : [];
if (!Array.isArray(itemadded)) {
    itemadded = [];
}

let allFavProducts = document.getElementById("favContainer")
let iteaminFav = localStorage.getItem("iteminFAV") ? JSON.parse(localStorage.getItem("iteminFAV")) : [];
if (!Array.isArray(iteaminFav)) {
    iteaminFav = [];
}

function drawitemincart() {
    let x = itemadded.map((item) => {
        return `
            <div class="productCart flex flex-row h-fit md:h-[350px]">
                <div class="img-container ml-8 h-[70%] w-[80%]">
                    <img src="${item.imgurl}" alt="img of product" class="h-[100%] w-[100%]" >
                </div>
                <div class="disc-prod">
                    <h1 class="font-bold text-xl">${item.title}</h1>
                    <h4>price: $${item.price * item.qty}</h4>
                    <h4>count: ${item.qty}</h4>
                    <h4 class="catigory">catigory: ${item.catigory}</h4>
                    <div class="pop-count flex gap-1">
                    <button type="button" class="count-pls p-2 hover:bg-green-900 hover:text-white border-green-900 ease-in-out duration-700 border-2 rounded-lg"
                        onclick="changeQTY(${item.id}, 1)">+</button>
                    <span class="count-res pt-2 px-2 text-green-900 ease-in-out duration-700">${item.qty}</span>
                    <button type="button" class="count-min p-2 text-green-900 hover:bg-green-900 hover:text-white border-green-900 ease-in-out duration-700 border-2 rounded-lg"
                        onclick="changeQTY(${item.id}, -1)">-</button>
                    </div>
                    <div class="action flex justify-between items-center mt-2">
                        <button class="h-full bg-red-700 hover:bg-red-800 text-white rounded" onclick="removeitem(${item.id})">remove from cart</button>
                    </div>
                </div>
            </div>
        `;
    });

    allproducts.innerHTML = x.join("");
}
drawitemincart()


//================== item in favorite list ======================
function drawiteminfav() {
    let x = iteaminFav.map((item) => {
        return `
            <div class="productfav flex flex-col h-fit md:h-[350px]">
                <div class="img-container">
                    <img src="${item.imgurl}" alt="img of product">
                </div>
                <div class="disc-prod">
                    <h1 class="font-bold text-xl">${item.title}</h1>
                    <h4>price: $${item.price}</h4>
                    <h4 class="catigory">catigory: ${item.catigory}</h4>
                    <div class="action flex justify-between items-center mt-2">
                        <span class="cursor-pointer"><i class="fa-solid fa-heart text-red-800" onclick="removeFromFAV(${item.id})"></i></span>
                    </div>
                </div>
            </div>
        `;
    });
    allFavProducts.innerHTML = x.join("");
}
drawiteminfav()

function removeFromFAV(id) {
    iteaminFav = iteaminFav.filter((item) => item.id !== id)
    localStorage.setItem("iteminFAV", JSON.stringify(iteaminFav))
    renderincartlist()
    drawiteminfav()
}

//================== pop cart list ======================
let cartlist = document.getElementById("cart-icon")
let cartpop = document.getElementById("pop-list")

cartlist.addEventListener("click", () => {
    cartpop.style.display = cartpop.style.display === "block" ? "none" : "block";
});

function renderincartlist() {
    document.getElementById("pop-list-items").innerHTML = itemadded.map(drawCartItem).join("");
    let totalQty = itemadded.reduce((acc, item) => {
        return acc = item.qty + acc
    }, 0);
    document.getElementById("counter").innerHTML = totalQty
    let totalPrice = itemadded.reduce((acc, item) => {
        return acc + (item.price * item.qty)
    }, 0);
    drawitemincart()
    document.getElementById("totalprice").innerHTML = "TotalPrice: $" + totalPrice
}
function removeitem(id) {
    itemadded = itemadded.filter((item) => item.id !== id)
    localStorage.setItem("IteminCart", JSON.stringify(itemadded))
    renderincartlist()
}

function drawCartItem(item) {
    return `
        <div class="pop-list-countainer p-1 gap-y-[5px] backdrop-blur-3xl">
            <div class="pop-disc flex gap-x-2 align-center p-1">
                <h3 class="text-lg font-bold item-title">${item.title}</h3>
                <h4 class="text-lg item-price">price:
                    <p class="text-lg inline-block">$${item.price * item.qty}</p>
                </h4>
            </div>
            <div class="pop-count flex gap-1">
                <button type="button" class="count-pls py-px px-2 hover:bg-green-900 hover:text-white border-green-900 ease-in-out duration-700 border-2 rounded-lg"
                    onclick="changeQTY(${item.id}, 1)">+</button>
                <span class="count-res py-px px-2 text-green-900 ease-in-out duration-700">${item.qty}</span>
                <button type="button" class="count-min py-px px-2 hover:bg-green-900 hover:text-white border-green-900 ease-in-out duration-700 border-2 rounded-lg"
                    onclick="changeQTY(${item.id}, -1)">-</button>
            </div>
        </div>
        `;
}
function changeQTY(id, val) {
    let item = itemadded.find((item) => item.id === id);
    if (val === -1 && item.qty === 1) {
        removeitem(id);
    } else {
        item.qty = item.qty + val;
        localStorage.setItem("IteminCart", JSON.stringify(itemadded));
        renderincartlist();
    }
}
renderincartlist()