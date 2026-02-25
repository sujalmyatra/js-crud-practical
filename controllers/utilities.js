import {
  idEdit,
  nameEdit,
  priceEdit,
  descEdit,
  imgEdit,
  previewImgEdit,
  charCount,
  nameDelete,
  idDelete,
  idView,
  nameView,
  priceView,
  descView,
  imgView,
} from "../elements.js";

import { getProducts } from "./storage.js";

//modal handlers
export function openEditModal(product) {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("edit-modal"),
  );
  idEdit.value = product.id;
  nameEdit.value = product.name;
  priceEdit.value = product.price;
  descEdit.value = product.desc;
  previewImgEdit[1].src = product.img;
  counterDesc(descEdit, charCount[1]);
  modal.show();
}
export function openDeleteModal({ id, name }) {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("delete-modal"),
  );
  idDelete.value = id;
  nameDelete.value = name;
  modal.show();
}
export function openViewModal(product) {
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("view-modal"),
  );

  imgView.src = product.img;
  nameView.innerHTML = `<strong>Name: </strong>${product.name}`;
  idView.innerHTML = `<strong>ID: </strong>${product.id}`;
  priceView.innerHTML = `<strong>Price: </strong>${product.price}`;
  descView.innerHTML = `<strong>Description: </strong>${product.desc}`;

  modal.show();
}

//preview-img handler
export function handleImagePreview(e) {
  const input = e.target;

  const container = input.closest(".row");
  const preview = container.querySelector(".preview-img");

  const file = input.files[0];

  if (!file) {
    preview.src = "./images/preview-image.webp";
    return;
  }

  preview.src = URL.createObjectURL(file);
}

//dynammic toaster handler
export function showToast(message, type, duration = 3000) {
  const toastContainer = document.getElementById("toastContainer");

  const color = {
    success: "text-bg-success",
    danger: "text-bg-danger",
  };

  const icons = {
    success: "fa-circle-check",
    danger: "fa-triangle-exclamation",
  };

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center ${color[type]} border-0`;
  toastEl.role = "alert";

  toastEl.innerHTML = `<div class="toast-body">
      <div class="d-flex gap-3 align-items-center">
        <i class="fa-solid ${icons[type]} fa-lg"></i>
        <span class="fw-semibold flex-grow-1">${message}</span>
        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`;

  toastContainer.appendChild(toastEl);

  const toast = new bootstrap.Toast(toastEl, { delay: duration });
  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}

//filter and sort handler
export function getProcessedProducts() {
  let products = [...getProducts()];

  // Filter
  const filterValue = document.getElementById("filter-id").value;
  if (filterValue) {
    products = products.filter((p) => p.id.toString().includes(filterValue));
  }

  // sort
  const sortValue = document.getElementById("sort-select").value;

  switch (sortValue) {
    case "id-asc":
      products.sort((a, b) => a.id - b.id);
      break;

    case "id-desc":
      products.sort((a, b) => b.id - a.id);
      break;

    case "name-asc":
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "name-desc":
      products.sort((a, b) => b.name.localeCompare(a.name));
      break;

    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
  }

  return products;
}

//img conversion
export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

//desc character counter
export function counterDesc(descEl, countEl) {
  if (descEl.value) {
    countEl.textContent = descEl.value.length;
  } else countEl.textContent = 0;
}

//automatic id generator
export function generateId(products) {
  return Math.max(...products.map((p) => p.id), 110) + 1;
}

//special character remover
export function removeSpecials() {
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("keydown", function (e) {
      if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }
    });
  });
}
