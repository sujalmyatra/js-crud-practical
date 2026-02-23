import { getProducts, saveProducts } from "./storage.js";
import { convertToBase64 } from "./utilities.js";

export async function editProduct(id, name, img, price, desc, preview) {

  const products = getProducts();

  let finalImage = preview;

  if (img) {
    finalImage = await convertToBase64(img);
  }

  const product = products.find(p => p.id == id);

  if (product) {
    product.name = name;
    product.img = finalImage;
    product.price = price;
    product.desc = desc;

    saveProducts(products);

    return "Product updated successfully";
  }
}