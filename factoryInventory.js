function inventoryItem(name, category, price) {
  let obj = {};
  (obj.name = name), (obj.category = category), (obj.price = price);
  obj.describeItem = function () {
    return `name :${this.name}, category :${this.category}, price: ${this.price}`;
  };
  obj.descountItem = function (item, dPrice) {
    let dis = (this.price / 100) * dPrice;
    return `discountPrice :${this.price - dis} ${item}`;
  };
  return obj;
}
let item = inventoryItem("laptop", "electronic", 1500);
console.log(item.describeItem());
console.log(item.descountItem("laptop", 10));
