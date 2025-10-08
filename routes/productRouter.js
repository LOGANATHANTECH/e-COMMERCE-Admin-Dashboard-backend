import express from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../services/productService.js';
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch products",
            error: error.message
        });
    }
});

productRouter.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId 
            }
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
        
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch product",
            error: error.message
        });
    }
});

productRouter.post('/', upload.single('imageFile'), async (req, res) => {

    const { productName, description, price, stock, category } = req.body;
    const imageFile = req.file;

    if (!imageFile || !productName || !price || !stock) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }


    const dataToSendToService = {
        productName,
        description,
        price,
        stock,
        category,
        imageBuffer: imageFile.buffer,
    };

    try {

        const newProduct = await createProduct(dataToSendToService);
        res.status(201).json(newProduct);

    } catch (error) {
        console.error("Error creating product:", error);

        res.status(500).json({
            message: "Could not create product",
            error: error.message
        });
    }
});


productRouter.delete('/:id', async (req, res) => {

    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
    try {
        const deletedProduct = await deleteProduct(productId);
        res.status(200).json(deletedProduct);
    }
    catch (error) {
        res.status(500).json({
            message: "Could not delete product",
            error: error.message
        });
    }
});

export default productRouter;