import { getProcessedProducts } from "../controllers/utilities.js"


export function viewProduct(){
const tbody = document.getElementById("productTableBody");
const tCaption = document.getElementById("table-caption");


renderTable(tbody, tCaption);
}
function renderTable(tbody, tCaption){
    const products = getProcessedProducts();

    tCaption.innerHTML = `<span>List of Products : ${products.length}</span>`;

    tbody.innerHTML = (products.length == 0)? `<tr><td colspan="7"><p class=" mb-1">Product List is empty!!</p></td></tr>` :
     products.map((product, index) => (
        `<tr>
                                    <th scope="row" class="text-center">
                                        ${index + 1}
                                    </th>
                                    <td class="text-center">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div class="ms-3 ">
                                                <p class=" mb-1 ">${product.name}</p>
                                                
                                            </div>
                                        </div>
                                    </td>

                                    <td class="text-center">${product.id}</td>
                                    <td class="text-center d-flex justify-content-center">
                                        <div class="d-flex align-items-center border border-2 rounded-3 p-2    ">
                                            <img src="${product.img}" class="" alt=""
                                                style="width: 45px; height: 45px" /></div>
                                    </td>
                                    <td class="text-center">${product.price}</td>
                                    <td class="text-center">${product.desc}</td>
                                    <td class="ps-2 text-center ">

                                        <img src="./images/icons/view-icon.svg" alt="" data-id=${product.id}  data-action="view" id="" class="bi bi-eye-fill view_item" ">

                                        <img src="./images/icons/edit-icon.svg" alt="" data-id=${product.id}  data-action="edit"  class="bi bi-pencil-square edit_item" data-bs-toggle="modal" data-bs-target="#edit-modal">
                                        
                                        <img src="./images/icons/delete-icon.svg" alt="" data-id=${product.id} data-action="delete" class="delete_item" data-bs-toggle="modal" data-bs-target="#delete-modal">
                                       
                                       
                                    </td>
                                </tr>`
                                
    )).join("");
}
