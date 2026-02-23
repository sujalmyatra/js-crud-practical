export default class Product {
    // ProductId
    // ProductName
    // Image
    // Price
    // Description

    constructor(name, img, price, desc, id) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.desc = desc;
    }
}