import Product from "../models/Product.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // find all products in the database
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in Fetching products:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // user will send product data in the request body
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });

    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params; // get the id from the request params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product id" });
    }
    try {
        await Product.findByIdAndDelete(id); // find the product by id and delete it
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error in Deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params; // get the id from the request params
    const product = req.body; // user will send product data in the request body
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product id" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // find the product by id and update it
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in Updating product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}