export default class ProductModel {
    constructor(
        id,
        productName,
        productDescription,
        categoryName,
        subCategoryName,
        brandName,
        listPrice,
        imageUrls,
        stock,
        createdAt,
        updatedAt,
        averageRating,
        numberOfReviews
    ) {
        this.id = id;
        this.productName = productName;
        this.productDescription = productDescription;
        this.categoryName = categoryName;
        this.subCategoryName = subCategoryName;
        this.brandName = brandName;
        this.listPrice = listPrice;
        this.imageUrls = imageUrls;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.averageRating = averageRating;
        this.numberOfReviews = numberOfReviews;
    }

    displayDetails() {
        console.log("Product Details:");
        console.log("ID:", this.id);
        console.log("Product Name:", this.productName);
        console.log("Description:", this.productDescription);
        console.log("Category:", this.categoryName);
        console.log("Subcategory:", this.subCategoryName);
        console.log("Brand:", this.brandName);
        console.log("Price:", this.listPrice);
        console.log("Image URLs:", this.imageUrls);
        console.log("Stock:", this.stock);
        console.log("Created At:", this.createdAt);
        console.log("Updated At:", this.updatedAt);
        console.log("Average Rating:", this.averageRating);
        console.log("Number of Reviews:", this.numberOfReviews);
    }
}
