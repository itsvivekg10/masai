// Function to fetch product data and display it
async function fetchData() {
    const sortCriteria = document.getElementById('sort').value;
    const url = `https://jsonplaceholder.typicode.com/users?_sort=${sortCriteria}&_order=asc`;

    try {
        // Clear previous error message
        document.getElementById('error-message').textContent = '';

        // Fetch the product data
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const products = await response.json();
        
        // Display the products
        displayProducts(products);

    } catch (error) {
        // Handle any errors
        document.getElementById('error-message').textContent = `Error: ${error.message}`;
    }
}

// Function to display the product data on the page
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous product list

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('product-item');
        listItem.innerHTML = `
            <span>${product.name}</span>
            <span>${product.email}</span>
            <span>${product.address.city}</span>
        `;
        productList.appendChild(listItem);
    });
}

// Initial fetch on page load
window.onload = fetchData;
