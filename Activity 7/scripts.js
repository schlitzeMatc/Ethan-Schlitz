
console.log("=== Part A: Array and Object Demonstrations ===");

const arr1 = [1, 2, 3];
const arr2 = new Array(4, 5, 6);

console.log("Initial arrays:", arr1, arr2);

arr1.push(4);
arr1.pop();
arr1.unshift(0);
arr1.shift();
console.log("Modified arr1:", arr1);

arr1.forEach(num => console.log("forEach:", num));
const doubled = arr1.map(num => num * 2);
console.log("Doubled array (map):", doubled);


const person = 
{
    name: "Ethan",
    age: 30
};
console.log("Person object:", person);

person.location = "Cedarburg";  
person.age = 31;          
delete person.location;   
console.log("Modified person object:", person);

console.log("=== Part B: Product Data Structure ===");

const products = 
[
    { id: 1, name: "Laptop", description: "High performance laptop", price: 1200, category: "electronics", image: "https://as1.ftcdn.net/v2/jpg/05/29/65/20/1000_F_529652077_5hOSvo2bUHOUHALs7o3wcMAH73CIneTj.webp" },
    { id: 2, name: "T-Shirt", description: "Comfortable cotton t-shirt", price: 25, category: "clothing", image: "https://as1.ftcdn.net/v2/jpg/03/44/26/96/1000_F_344269607_BnY7N1WsqHAH496fS9PqXicaWCIflUAm.jpg" },
    { id: 3, name: "Headphones", description: "Noise-cancelling over-ear headphones", price: 150, category: "electronics", image: "https://as2.ftcdn.net/v2/jpg/05/79/26/83/1000_F_579268372_PfY69vNw7GtTA7iWITk1MZHWs7B6ShQW.webp" },
    { id: 4, name: "Book", description: "Inspirational novel", price: 15, category: "books", image: "https://as1.ftcdn.net/v2/jpg/02/16/67/50/1000_F_216675048_39petQYPtJ9cv5ycUg1LOmCtcNCoqtdk.jpg" },
    { id: 5, name: "Jacket", description: "Stylish and warm jacket", price: 80, category: "clothing", image: "https://as2.ftcdn.net/v2/jpg/05/09/91/41/1000_F_509914143_nd4kW19kSDVGu7TrAE5VcsNnkl5E68RJ.webp" }
];

const electronics = products.filter(p => p.category === "electronics");
console.log("Electronics:", electronics);

const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
console.log("Average price:", averagePrice);

function createProductCard(product) 
{
    return`
    <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
    </div>
    `;
}

function displayProducts(productArray) 
{
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";
    productArray.forEach(p => {
    grid.innerHTML += createProductCard(p);
    });
    document.getElementById("output").textContent = `Showing ${productArray.length} products.`;
}


displayProducts(products);

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const clearFilters = document.getElementById("clearFilters");

function filterProducts() 
{
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    let filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm)
    );
    if (category !== "all") 
        {
            filtered = filtered.filter(p => p.category === category);
        }
    displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    displayProducts(products);
});
