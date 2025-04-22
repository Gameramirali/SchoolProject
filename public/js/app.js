var products = [
    { id: 1, name: "چوب جادویی", price: 120000, desc: "جادو از نوک چوبت آغاز میشه!", img: "https://i.imgur.com/XO4z60v.png" },
    { id: 2, name: "معجون پرواز", price: 98000, desc: "بپر بالای آسمون!", img: "https://i.imgur.com/d7RQPLu.png" },
    { id: 3, name: "کتاب طلسم", price: 135000, desc: "جادوهای ممنوعه درونشه!", img: "https://i.imgur.com/Y2y6E1v.png" },
    { id: 4, name: "لپتاپ جادویی", price: 250000000, desc: "بزن بریم بازی", img: "pass" }
];

const productsContainer = document.getElementById("products");
const template = document.getElementById("productTemplate");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
let cart = [];

function renderProducts(list) {
    productsContainer.innerHTML = "";
    list.forEach(product => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("img").src = product.img;
        clone.querySelector("h3").textContent = product.name;
        clone.querySelector(".price").textContent = product.price.toLocaleString() + " تومان";
        clone.querySelector(".desc").textContent = product.desc;
        clone.querySelector("button").onclick = () => addToCart(product);
        productsContainer.appendChild(clone);
    });
}

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let sum = 0;
    cart.forEach((item, index) => {
        sum += item.price;
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price.toLocaleString()} تومان`;
        cartItems.appendChild(li);
    });
    total.textContent = `مجموع: ${sum.toLocaleString()} تومان`;
    cartCount.textContent = `🛒 ${cart.length}`;
}

function clearCart() {
    cart = [];
    updateCart();
}

document.getElementById("searchInput").addEventListener("input", function () {
    const search = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(search));
    renderProducts(filtered);
});

document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector('input[type="submit"]');
    
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault(); // از رفرش شدن صفحه جلوگیری می‌کنه
  
      // اطلاعات ورودی‌ها رو می‌گیریم
      const name = document.getElementById("inputName").value;
      const price = document.getElementById("inputPrice").value;
      const description = document.getElementById("inputDesc").value;
      const image = document.getElementById("inputImage").value;
  
      // فرستادن به سرور با fetch
      fetch('/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          name,
          price,
          description,
          image
        })
      })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(err => alert("خطا در ارتباط با سرور"));
    });
  });  

renderProducts(products);