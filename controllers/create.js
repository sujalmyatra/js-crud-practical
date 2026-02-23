import { getProducts, saveProducts } from "./storage.js";
import Product from "../modules/product.js";
import { convertToBase64, generateId } from "./utilities.js";

export async function createProduct(name, img, price, desc) {

  const products = getProducts();

  const newId = generateId(products);
  const newImg = await convertToBase64(img);

  const newProduct = new Product(name, newImg, price, desc, newId);

  products.push(newProduct);

  saveProducts(products);

  return "Product added successfully";
}