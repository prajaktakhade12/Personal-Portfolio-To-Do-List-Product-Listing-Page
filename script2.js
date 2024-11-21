const products = [
    { name: "Smartphone", category: "electronics", price: 299 },
    { name: "Laptop", category: "electronics", price: 999 },
    { name: "T-Shirt", category: "clothing", price: 19 },
    { name: "Jeans", category: "clothing", price: 49 },
    { name: "Headphones", category: "electronics", price: 199 },
    { name: "Dress", category: "clothing", price: 79 },
    { name: "Tablet", category: "electronics", price: 399 },
    { name: "Jacket", category: "clothing", price: 99 }
];

function displayProducts(filteredProducts) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `<h3>${product.name}</h3><p>Category: ${product.category}</p><p>Price: $${product.price}</p>`;
        productList.appendChild(productDiv);
    });
}

function applyFiltersAndSort() {
    const category = document.getElementById("categoryFilter").value;
    const sortOption = document.getElementById("sortOption").value;

    let filteredProducts = products;

    // Apply category filter
    if (category !== "all") {
        filteredProducts = products.filter(p => p.category === category);
    }

    // Apply sorting
    filteredProducts = filteredProducts.sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
    });

    displayProducts(filteredProducts);
}

// Event listeners
document.getElementById("categoryFilter").addEventListener("change", applyFiltersAndSort);
document.getElementById("sortOption").addEventListener("change", applyFiltersAndSort);

// Initialize display
applyFiltersAndSort();
