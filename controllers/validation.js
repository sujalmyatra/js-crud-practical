import { showToast } from "./utilities.js";

import {
  nameAdd,
  priceAdd,
  descAdd,
  imgAdd,
  nameEdit,
  priceEdit,
  descEdit,
  imgEdit,
  addCount,
} from "../elements.js";

//name validation
export function validateName(nameEl) {
  const name = nameEl.value.trim();
  const ok = name.length >= 3 && name.length <= 20;
  toggleInvalid(nameEl, ok);
  return ok;
}

//price validation
export function validatePrice(priceEl) {
  const price = parseInt(priceEl.value);
  const ok = /^[0-9]{1,5}$/.test(price);
  toggleInvalid(priceEl, ok);
  return ok;
}

//description validation
export function validateDesc(descEl) {
  const desc = descEl.value.trim();
  const ok = desc.length > 0;
  toggleInvalid(descEl, ok);
  return ok;
}

//img validation
export function validateImage(imgEl, isEdit = false, previewSrc = "") {
  const file = imgEl.files[0];

  if (isEdit && !file) {
    const ok = !previewSrc;
    toggleInvalid(imgEl, ok);
    return ok;
  }

  if (!file) {
    toggleInvalid(imgEl, false);
    return false;
  }

  if (!file.type.startsWith("image/")) {
    toggleInvalid(imgEl, false);
    showToast(
      "Only [.jpg, .png, .webp, .jpeg, .svg] is allowed",
      "danger",
      3000,
    );
    return false;
  }

  const maxSize = 300 * 1024;
  if (file.size > maxSize) {
    toggleInvalid(imgEl, false);
    showToast("Only upto 300kb is allowed", "danger", 3000);
    return false;
  }

  toggleInvalid(imgEl, true);
  return true;
}

//toggle classes of validation
function toggleInvalid(el, ok) {
  el.classList.toggle("is-valid", ok);
  el.classList.toggle("is-invalid", !ok);
}

//clear add modal fields
export function clearAddData() {
  nameAdd.value = "";
  priceAdd.value = "";
  descAdd.value = "";
  imgAdd.value = "";
  addCount.textContent = 0;
}

//clear edit modal fields
export function clearEditData() {
  nameEdit.value = "";
  priceEdit.value = "";
  descEdit.value = "";
  imgEdit.value = "";
}
