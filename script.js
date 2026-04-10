/* ============================================================
   Munamii Cakery — Script
   ============================================================ */

/* ── Product Data ──────────────────────────────────────────── */

const cupcakes = [
    { id: "cupcake-01", name: "Cherry\u2011Topped Sprinkle", price: 4.25, image: "images/cupcakes/01-Cherry\u2011Topped Sprinkle.jpeg", category: "cupcakes" },
    { id: "cupcake-02", name: "Chocolate & Chips", price: 3.00, image: "images/cupcakes/02-Chocolate & Chips.jpeg", category: "cupcakes" },
    { id: "cupcake-03", name: "Chocolate with Delicacy", price: 3.00, image: "images/cupcakes/03-Chocolate with delicacy.jpeg", category: "cupcakes" },
    { id: "cupcake-04", name: "Chocolate with Nutella", price: 3.00, image: "images/cupcakes/04-Chocolate with nutella.jpeg", category: "cupcakes" },
    { id: "cupcake-05", name: "Fun Buttercream Dream", price: 3.00, image: "images/cupcakes/05-Fun Buttercream Dream.jpeg", category: "cupcakes" },
    { id: "cupcake-06", name: "Red Velvet", price: 4.25, image: "images/cupcakes/06-Red Velvet.jpeg", category: "cupcakes" },
    { id: "cupcake-07", name: "Vanilla with Delicacy", price: 3.00, image: "images/cupcakes/07-Vanilla with delicacy.jpeg", category: "cupcakes" },
    { id: "cupcake-08", name: "Vanilla with Nutella", price: 3.00, image: "images/cupcakes/08-Vanilla with nutella.jpeg", category: "cupcakes" }
];

const weddingCakes = [
    { id: "wedding-01", name: "Four\u2011Tier Floral Cascade", price: 40.00, image: "images/weddingcakes/01-four-tier-floral-cascade-cake.jpeg", category: "weddingCakes" },
    { id: "wedding-02", name: "Classic White Rose Tiers", price: 40.00, image: "images/weddingcakes/02-classic-white-rose-tiers.jpeg", category: "weddingCakes" },
    { id: "wedding-03", name: "Ornate Scroll Rose Cake", price: 40.00, image: "images/weddingcakes/03-ornate-scroll-rose-cake.jpeg", category: "weddingCakes" },
    { id: "wedding-04", name: "Pearl Bow Floral Cake", price: 40.00, image: "images/weddingcakes/04-pearl-bow-floral-cake.jpeg", category: "weddingCakes" },
    { id: "wedding-05", name: "Romantic Rose Garden Cake", price: 40.00, image: "images/weddingcakes/05-romantic-rose-garden-cake.jpeg", category: "weddingCakes" },
    { id: "wedding-06", name: "Blush Scroll Wedding Cake", price: 40.00, image: "images/weddingcakes/06-blush-scroll-wedding-cake.jpeg", category: "weddingCakes" },
    { id: "wedding-07", name: "Bright Rose Swirl Cake", price: 40.00, image: "images/weddingcakes/07-bright-rose-swirl-cake.jpeg", category: "weddingCakes" },
    { id: "wedding-08", name: "Textured Blush Bloom Cake", price: 40.00, image: "images/weddingcakes/08-textured-blush-bloom-cake.jpeg", category: "weddingCakes" }
];

const allProducts = [...cupcakes, ...weddingCakes];

/* ── Cart State ────────────────────────────────────────────── */

const CART_KEY = "munamii_cart_v1";
let cart = loadCart();

/* Load cart from localStorage, returning an empty array on failure */
function loadCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* Look up a product object by its unique id */
function findProduct(productId) {
    return allProducts.find(product => product.id === productId);
}

/* Escape HTML to prevent injection when inserting product data into innerHTML */
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/* ── Cart Operations ───────────────────────────────────────── */

/* Add a product to the cart or increment its quantity if already present */
function addToCart(productId, category) {
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    saveCart();
    renderCart();
}

/* Remove an item from the cart entirely */
function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.productId !== cartItemId);
    saveCart();
    renderCart();
}

/* Increment or decrement an item's quantity (minimum 1) */
function updateQuantity(cartItemId, delta) {
    const item = cart.find(entry => entry.productId === cartItemId);
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + delta);
    saveCart();
    renderCart();
}

/* Compute the cart total */
function getCartTotal() {
    return cart.reduce((total, item) => {
        const product = findProduct(item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

/* Empty the entire cart */
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

/* ── DOM References ────────────────────────────────────────── */

const cupcakeGrid = document.getElementById("cupcakeGrid");
const weddingCakeGrid = document.getElementById("weddingCakeGrid");
const cartModal = document.getElementById("cartModal");
const successModal = document.getElementById("successModal");
const cartItemsContainer = document.getElementById("cartItems");
const cartSummaryContainer = document.getElementById("cartSummary");
const cartActionsContainer = document.getElementById("cartActions");
const cartBadge = document.getElementById("cartBadge");
const cartButton = document.getElementById("cartButton");
const closeCartModalButton = document.getElementById("closeCartModal");
const closeSuccessModalButton = document.getElementById("closeSuccessModal");
const checkoutButton = document.getElementById("checkoutButton");
const continueShoppingButton = document.getElementById("continueShoppingButton");
const clearCartButton = document.getElementById("clearCartButton");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

/* ── Product Rendering ─────────────────────────────────────── */

/* Build a single product card element */
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "productCard";
    card.innerHTML = `
        <img
            class="productImage"
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
            width="576"
            height="768"
        >
        <div class="productInfo">
            <h4 class="productName">${escapeHtml(product.name)}</h4>
            <p class="productPrice">$${product.price.toFixed(2)}</p>
            <button
                class="ctaButton addToCartButton"
                data-product-id="${escapeHtml(product.id)}"
                data-category="${escapeHtml(product.category)}"
            >
                Add to cart
            </button>
        </div>
    `;
    return card;
}

/* Render all product cards into their respective grids */
function renderProducts() {
    cupcakes.forEach(product => {
        cupcakeGrid.appendChild(createProductCard(product));
    });
    weddingCakes.forEach(product => {
        weddingCakeGrid.appendChild(createProductCard(product));
    });
}

/* ── Cart Rendering ────────────────────────────────────────── */

/* Update the header badge with the current item count */
function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = count;
    cartBadge.setAttribute("data-count", count);
}

/* Re-render the cart modal contents */
function renderCart() {
    updateCartBadge();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cartEmptyMessage">Your cart is empty</p>';
        cartSummaryContainer.innerHTML = "";
        cartActionsContainer.style.display = "none";
        return;
    }

    cartActionsContainer.style.display = "flex";

    let itemsHtml = "";
    cart.forEach(item => {
        const product = findProduct(item.productId);
        if (!product) return;
        const name = escapeHtml(product.name);
        const image = escapeHtml(product.image);
        const id = escapeHtml(product.id);
        itemsHtml += `
            <div class="cartItem">
                <img class="cartItemImage" src="${image}" alt="${name}">
                <div class="cartItemDetails">
                    <p class="cartItemName">${name}</p>
                    <p class="cartItemPrice">$${product.price.toFixed(2)}</p>
                </div>
                <div class="cartItemControls">
                    <button
                        class="quantityButton"
                        data-product-id="${id}"
                        data-delta="-1"
                        aria-label="Decrease quantity"
                    >&minus;</button>
                    <span class="cartItemQuantity">${item.quantity}</span>
                    <button
                        class="quantityButton"
                        data-product-id="${id}"
                        data-delta="1"
                        aria-label="Increase quantity"
                    >+</button>
                </div>
                <button class="removeButton" data-product-id="${id}">Remove</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = itemsHtml;

    const total = getCartTotal();
    cartSummaryContainer.innerHTML = `<p class="cartTotal">Total: $${total.toFixed(2)}</p>`;
}

/* ── Modal Management ──────────────────────────────────────── */

let previousFocusElement = null;

/* Open a modal and trap focus inside it */
function openModal(modal) {
    previousFocusElement = document.activeElement;
    modal.hidden = false;
    const focusable = getFocusableElements(modal);
    if (focusable.length) focusable[0].focus();
    document.addEventListener("keydown", handleModalKeydown);
}

/* Close a modal and restore focus to the previously active element */
function closeModal(modal) {
    modal.hidden = true;
    document.removeEventListener("keydown", handleModalKeydown);
    if (previousFocusElement) previousFocusElement.focus();
}

/* Return all keyboard-focusable elements inside a container */
function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
    ).filter(el => !el.disabled && !el.hidden);
}

/* Handle ESC to close and Tab to trap focus within the open modal */
function handleModalKeydown(event) {
    const openModalElement = !cartModal.hidden
        ? cartModal
        : (!successModal.hidden ? successModal : null);
    if (!openModalElement) return;

    if (event.key === "Escape") {
        closeModal(openModalElement);
        return;
    }

    if (event.key === "Tab") {
        const focusable = getFocusableElements(openModalElement);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }
}

/* ── Checkout ──────────────────────────────────────────────── */

/* Simulate checkout: clear cart, show success modal */
function handleCheckout() {
    clearCart();
    closeModal(cartModal);
    openModal(successModal);
}

/* ── Event Listeners ───────────────────────────────────────── */

function setupEventListeners() {
    /* Delegated click handler for add-to-cart, quantity, and remove buttons */
    document.addEventListener("click", function (event) {
        const addButton = event.target.closest(".addToCartButton");
        if (addButton) {
            addToCart(addButton.dataset.productId, addButton.dataset.category);
            return;
        }

        const quantityButton = event.target.closest(".quantityButton");
        if (quantityButton) {
            const delta = parseInt(quantityButton.dataset.delta, 10);
            updateQuantity(quantityButton.dataset.productId, delta);
            return;
        }

        const removeButton = event.target.closest(".removeButton");
        if (removeButton) {
            removeFromCart(removeButton.dataset.productId);
            return;
        }
    });

    /* Open / close cart modal */
    cartButton.addEventListener("click", function () {
        openModal(cartModal);
    });

    closeCartModalButton.addEventListener("click", function () {
        closeModal(cartModal);
    });

    /* Close modals when clicking the overlay background */
    cartModal.addEventListener("click", function (event) {
        if (event.target === cartModal) closeModal(cartModal);
    });

    successModal.addEventListener("click", function (event) {
        if (event.target === successModal) closeModal(successModal);
    });

    /* Cart action buttons */
    checkoutButton.addEventListener("click", handleCheckout);

    continueShoppingButton.addEventListener("click", function () {
        closeModal(cartModal);
    });

    clearCartButton.addEventListener("click", function () {
        clearCart();
    });

    /* Success modal close — return to products view */
    closeSuccessModalButton.addEventListener("click", function () {
        closeModal(successModal);
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });

    /* Mobile hamburger nav toggle */
    navToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    /* Close mobile nav when a link is clicked */
    mainNav.addEventListener("click", function (event) {
        if (event.target.classList.contains("navLink")) {
            mainNav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

/* ── Initialization ────────────────────────────────────────── */

function init() {
    renderProducts();
    renderCart();
    setupEventListeners();
}

document.addEventListener("DOMContentLoaded", init);
