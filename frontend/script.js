/* ===========================
   DATA (CATEGORIES + SUBCATS + ITEMS)
=========================== */

let categories = ["Cold Coffee", "Shakes", "Juices", "Snacks", "Cakes"];

let subcategories = {
    "Cold Coffee": ["Iced Coffee", "Cold Brew"],
    "Shakes": ["Oreo Shake", "Kitkat Shake"],
    "Juices": ["Mango Juice", "Orange Juice"],
    "Snacks": ["French Fries", "Samosa"],
    "Cakes": ["Chocolate Cake", "Vanilla Cake"]
};

let items = {
    "Iced Coffee": 70,
    "Cold Brew": 90,
    "Oreo Shake": 120,
    "Kitkat Shake": 130,
    "Mango Juice": 50,
    "Orange Juice": 50,
    "French Fries": 40,
    "Samosa": 15,
    "Chocolate Cake": 80,
    "Vanilla Cake": 75
};

let cart = [];

/* ===========================
   LOAD BUTTONS ON SCREEN
=========================== */

function loadCategories() {
    let box = document.getElementById("categorySection");
    box.innerHTML = "";

    categories.forEach(cat => {
        box.innerHTML += `
            <button onclick="loadSubcategories('${cat}')">
                <i class="fa-solid fa-tag"></i> ${cat}
            </button>
        `;
    });
}

function loadSubcategories(category) {
    let box = document.getElementById("subCategorySection");
    box.innerHTML = "";

    subcategories[category].forEach(sub => {
        box.innerHTML += `
            <button onclick="loadItems('${sub}')">
                <i class="fa-solid fa-arrow-right"></i> ${sub}
            </button>
        `;
    });
}

function loadItems(subcategory) {
    let box = document.getElementById("itemSection");
    box.innerHTML = "";

    box.innerHTML = `
        <button onclick="addToCart('${subcategory}', ${items[subcategory]})">
            <i class="fa-solid fa-plus"></i> ${subcategory} — ₹${items[subcategory]}
        </button>
    `;
}

/* ===========================
   CART FUNCTIONS
=========================== */

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    let body = document.getElementById("cartBody");
    body.innerHTML = "";

    cart.forEach((item, index) => {
        body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td class="no-print">
                    <button class="remove-btn" onclick="removeItem(${index})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    updateTotal();
}

function updateTotal() {
    let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    let tax = Math.round(subtotal * 0.05);
    let total = subtotal + tax;

    document.getElementById("subtotal").innerText = `Subtotal: ₹${subtotal}`;
    document.getElementById("tax").innerText = `Tax (5%): ₹${tax}`;
    document.getElementById("total").innerText = `Total: ₹${total}`;
}

/* ===========================
   BILL FUNCTIONS
=========================== */

function newBill() {
    cart = [];
    renderCart();
    document.getElementById("custName").value = "";
    document.getElementById("custPhone").value = "";
}

function clearAll() {
    newBill();
}

function saveDraft() {
    localStorage.setItem("draftCart", JSON.stringify(cart));
    alert("Draft Saved!");
}

function loadDraft() {
    let data = localStorage.getItem("draftCart");
    if (data) {
        cart = JSON.parse(data);
        renderCart();
    }
}

/* PHONE VALIDATION */
document.getElementById("custPhone").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
});

/* INIT */
loadCategories();
