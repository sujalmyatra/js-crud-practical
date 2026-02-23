const STORAGE_KEY = "products";

// Get products
export function getProducts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save products
export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}