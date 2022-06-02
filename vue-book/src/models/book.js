export default class Book {
  constructor(id, name, description, quantity, createTime, bookType) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.createTime = createTime;
    this.bookType = bookType;
  }
}
