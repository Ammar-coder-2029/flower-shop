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
    isloggin= localStorage.setItem("isloggin","false");
    setTimeout(() => {
        window.location = "login.html";
    }, 500);
});


let allproducts = document.querySelector(".products")
let products = [
    {id: 1, title: "JETOUR",  imgurl: "imges/palnt-blue.jfif",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 2, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 3, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 4, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 5, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 6, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 7, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 8, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 9, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 10, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 11, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
    {id: 12, title: "JETOUR",  imgurl: "imges/grayJETOUR.jpg",  price: 100,  qty: 1,  catigory: "normal"  },
];
let itemadded = localStorage.getItem("IteminCart") ? JSON.parse(localStorage.getItem("IteminCart")) : [];
// لو الداتا اللي رجعت مش مصفوفة لأي سبب خليها مصفوفة فاضية
if (!Array.isArray(itemadded)) {
    itemadded = [];
}
let iteaminFav = localStorage.getItem("iteminFAV") ? JSON.parse(localStorage.getItem("iteminFAV")) : []
if (!Array.isArray(iteaminFav)) {
    iteaminFav = [];
}

function drawitem() {
    let x = products.map((item) => {
        let isAdded = itemadded.find((i) => i.id === item.id);
        let isFav = iteaminFav.find((i)=> i.id === item.id)
        let btn = ""
        let span= ""
        if (isAdded) {
            btn = `<button class="bg-red-700 hover:bg-red-800 text-white rounded p-1" onclick="removeitem(${item.id})">remove from cart</button>`;
        } else {
            btn = `<button class="bg-green-700 hover:bg-green-800 text-white rounded p-1" onclick="add(${item.id})">add to cart</button>`;
        }
        if (isFav) {
            span = `<span class="cursor-pointer"  onclick="removeFromFAV(${item.id})" ><i class="fa-solid fa-heart text-red-800"></i></span>`
        } else {
            span = `<span class="cursor-pointer"  onclick="fav(${item.id})" ><i class="fa-solid fa-heart text-gray-400"></i></span>`
        }
        return `
            <div class="product h-fit md:h-[350px]">
                <div class="img-container">
                    <img src="${item.imgurl}" alt="img of product">
                </div>
                <div class="disc-prod">
                    <h1 class="font-bold text-xl">${item.title}</h1>
                    <h4>price: $${item.price}</h4>
                    <h4 class="catigory">catigory: ${item.catigory}</h4>
                    <div class="action flex justify-between items-center mt-2">
                        ${span}
                        ${btn}
                    </div>
                </div>
            </div>
        `;
    });
    
    allproducts.innerHTML = x.join("");
}
drawitem()

let cartlist = document.getElementById("cart-icon")
let cartpop = document.getElementById("pop-list")
let countpls = document.getElementsByClassName("count-pls")
let countmin = document.getElementsByClassName("count-min")
let countres = document.getElementsByClassName("count-res")
let itemtitle = document.getElementsByClassName("item-title")
let itemprice = document.getElementsByClassName("item-price")

cartlist.addEventListener("click",()=>{
    if (cartpop.style.display === "block") {
        cartpop.style.display = "none"
    }else{
        cartpop.style.display = "block"
    }
})

function renderincartlist() {
    document.getElementById("pop-list-items").innerHTML = itemadded.map(drawCartItem).join("");
    let totalQty = itemadded.reduce((acc, item) => {
            return acc = item.qty + acc
    }, 0);
    document.getElementById("counter").innerHTML = totalQty
}
function removeitem(id){
    itemadded = itemadded.filter((item)=> item.id !== id)
    localStorage.setItem("IteminCart",JSON.stringify(itemadded))
    renderincartlist()
    drawitem()
}
function removeFromFAV(id){
    iteaminFav = iteaminFav.filter((item)=> item.id !== id)
    localStorage.setItem("iteminFAV",JSON.stringify(iteaminFav))
    renderincartlist()
    drawitem()
}
function add(id){
    if (isloggin === "true") {
        let checkitem = products.find((item) => item.id === id)
        let beenadded = itemadded.find((item)=> item.id === id)
        if (beenadded) {
            beenadded.qty+=1
        }else{
            itemadded = [...itemadded, checkitem]
        }
        localStorage.setItem("IteminCart",JSON.stringify(itemadded))
        renderincartlist()
        drawitem()
    }else{
        alert("you need to sign in")
        setTimeout(()=>{
            window.location = "login.html"
        },500)
    }
}

function drawCartItem(item) {
    return `
        <div class="pop-list-countainer p-1 gap-y-[5px] backdrop-blur-3xl">
            <div class="pop-disc flex gap-x-2 align-center p-1">
                <h3 class="text-lg font-bold item-title">${item.title}</h3>
                <h4 class="text-lg item-price">price:$
                    <p class="text-lg inline-block">${item.price * item.qty}</p>
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
function fav(id){
    if (isloggin == "true") {
        let infav = products.find((item)=>item.id===id)
        let beenadded = iteaminFav.find((item)=> item.id === id)
        if (!beenadded) {
            iteaminFav = [...iteaminFav , infav]
        }
        localStorage.setItem("iteminFAV",JSON.stringify(iteaminFav))
        renderincartlist()
        drawitem()
    }else{
        alert("you need to sign in")
        setTimeout(()=>{
            window.location = "login.html"
        },500)
    }
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