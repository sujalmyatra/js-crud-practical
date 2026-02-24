import { createProduct } from "./controllers/create.js";
import { editProduct } from "./controllers/edit.js";
import {
  validateName,validatePrice,validateDesc,validateImage,
  clearAddData,
  clearEditData,
} from "./controllers/validation.js";
import { viewProduct } from "./controllers/view.js";
import { getProducts } from "./controllers/storage.js";
import {
  openEditModal,
  openDeleteModal,
  openViewModal,
  handleImagePreview,
  showToast,
  counterDesc,
  removeSpecials
} from "./controllers/utilities.js";
import { deleteProduct } from "./controllers/delete.js";

import {
  nameAdd, priceAdd, descAdd, imgAdd,
  idEdit, nameEdit, priceEdit, descEdit, imgEdit,
  imgInputs, charCount,
  idDelete, previewImg,
  productAdd, productEdit, productDelete,
  filterID, newProductAdd, tBody
} from "./elements.js";

newProductAdd.addEventListener("click", () => {
  nameAdd.classList.remove("is-invalid", "is-valid");
  priceAdd.classList.remove("is-invalid", "is-valid");
  descAdd.classList.remove("is-invalid", "is-valid");
  imgAdd.classList.remove("is-invalid", "is-valid");
  previewImg[0].src = "./images/preview-image.webp";
  
  clearAddData();
});

productAdd.addEventListener("click", async (e) => {
  e.preventDefault();

  const isValid =
    validateName(nameAdd) &&
    validatePrice(priceAdd) &&
    validateDesc(descAdd) &&
    validateImage(imgAdd, false);

  if (!isValid) return;

  const msg = await createProduct(
    nameAdd.value,
    imgAdd.files[0],
    parseInt(priceAdd.value),
    descAdd.value,
  );

  showToast(msg, "success", 3000);

  clearAddData();

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("add-modal"),
  );
  modal.hide();
  viewProduct();
});

nameAdd.addEventListener("blur", () => validateName(nameAdd));
priceAdd.addEventListener("blur", () => validatePrice(priceAdd));
descAdd.addEventListener("blur", () => validateDesc(descAdd));
imgAdd.addEventListener("change", () => validateImage(imgAdd, false));
descAdd.addEventListener("input", () => counterDesc(descAdd, charCount[0]));

productEdit.addEventListener("click", async (e) => {
  
  e.preventDefault();
  charCount[1].value = 0;
  const isValid =
  validateName(nameEdit) &&
  validatePrice(priceEdit) &&
  validateDesc(descEdit) &&
  validateImage(imgEdit, true);

  if (!isValid) return;
  const msg = await editProduct(
    idEdit.value,
    nameEdit.value,
    imgEdit.files[0] || null,
    parseInt(priceEdit.value),
    descEdit.value,
    previewImg[1].src,
  );

  showToast(msg, "success", 3000);
  clearEditData();
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("edit-modal"),
  );
  modal.hide();
  showToast;
  viewProduct();
});

nameEdit.addEventListener("blur", () => validateName(nameEdit));
priceEdit.addEventListener("blur", () => validatePrice(priceEdit));
descEdit.addEventListener("blur", () => validateDesc(descEdit));
imgEdit.addEventListener("change", () => validateImage(imgEdit, true));
descEdit.addEventListener("input", () => counterDesc(descEdit, charCount[1]));

productDelete.addEventListener("click", () => {
  const id = parseInt(idDelete.value);

  const msg = deleteProduct(id);
  showToast(msg, "success", 3000);
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("delete-modal"),
  );
  modal.hide();
  viewProduct();
});

imgInputs.forEach((input) => {
  input.addEventListener("change", handleImagePreview);
});

tBody.addEventListener("click", (e) => {
  let btn = e.target.closest("[data-action]");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  const products = getProducts();
  const product = products.find((p) => p.id == id);

  if (!product) return;

  switch (action) {
    case "edit":
      openEditModal(product);
      break;
    case "delete":
      openDeleteModal(product);
      break;
    case "view":
      openViewModal(product);
      break;
    
  }
});

filterID.addEventListener("input", () => {
  viewProduct();
});

document.getElementById("sortSelect").addEventListener("change", () => {
  viewProduct();
});
const numberInput = document.getElementById("price");


viewProduct();
removeSpecials();

