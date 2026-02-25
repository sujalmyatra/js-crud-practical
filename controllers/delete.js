import { getProducts, saveProducts } from "./storage.js";

//product delete function
export function deleteProduct(id) {

  let products = getProducts();

  products = products.filter(p => p.id != id);

  saveProducts(products);

  return "Product removed successfully";
}