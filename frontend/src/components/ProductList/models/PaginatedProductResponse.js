
export default class PaginatedProductResponse {
    constructor() {
        this.productsMap = new Map(); // Map<key, value>
    }

    // Add products to the map with a key
    addProducts(key, products) {
        if (!Array.isArray(products)) {
            throw new Error("Products must be an array of ProductModel instances.");
        }
        this.productsMap.set(key, products);
    }

    // Add pagination details to the map
    addPaginationDetails(currentPage, totalItems, totalPages) {
        this.productsMap.set("currentPage", currentPage);
        this.productsMap.set("totalItems", totalItems);
        this.productsMap.set("totalPages", totalPages);
    }

    // Get products by key
    getProducts(key) {
        return this.productsMap.get(key) || [];
    }

    // Get pagination details
    getPaginationDetails() {
        return {
            currentPage: this.productsMap.get("currentPage"),
            totalItems: this.productsMap.get("totalItems"),
            totalPages: this.productsMap.get("totalPages"),
        };
    }

    // Display all details, including products and pagination
    display() {
        const paginationDetails = this.getPaginationDetails();
        console.log("Pagination Details:");
        console.log("Current Page:", paginationDetails.currentPage);
        console.log("Total Items:", paginationDetails.totalItems);
        console.log("Total Pages:", paginationDetails.totalPages);

        console.log("\nProducts in Map:");
        for (const [key, value] of this.productsMap.entries()) {
            if (key === "currentPage" || key === "totalItems" || key === "totalPages") {
                continue; // Skip pagination details
            }
            console.log(`Key: ${key}`);
            value.forEach((product, index) => {
                console.log(`Product ${index + 1}:`);
                product.displayDetails();
            });
        }
    }
}