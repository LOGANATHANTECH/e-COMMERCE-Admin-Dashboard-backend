import prisma from "../lib/prisma.js";

// Fetch all products from the database
export async function getAllProducts() {
    try {
        const products = await prisma.Product.findMany(
            // {
            // orderBy:{createdAt:'desc'}
            // }
        );
        return products;
    } catch (error) {
        throw new Error(`Failed to retrieve products. ${error.message}`);

    }
}

export async function createProduct(productData) {
    try {
        if (productData.price === '' || productData.stock === '') {
            throw new Error("Price and stock cannot be empty.");
        }
        const priceAsFloat = parseFloat(productData.price);
        const stockAsInt = parseInt(productData.stock, 10);

        if (isNaN(priceAsFloat) || isNaN(stockAsInt) || priceAsFloat <= 0 || stockAsInt < 0) {
            throw new Error("Price must be a valid positive number and stock must be a non-negative integer.");
        }
        const newProduct = await prisma.product.create({
            data: {
                name: productData.productName,
                description: productData.description,
                price: priceAsFloat,
                stock: stockAsInt,
                category: productData.category,

                imageSrc: productData.imageBuffer,
            }
        });
        return newProduct;
    }
    catch (error) {
        throw error;
    }
}
export async function deleteProduct(productId) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: productId }
        });
        return deletedProduct;
    } catch (error) {
        throw new Error(`Failed to delete product. ${error.message}`);
    }
}
