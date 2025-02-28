const checkout = {
  items: [],

  total: 0,

  addItem: function (item) {
    if (typeof item.price !== "number" || isNaN(item.price)) {
      console.log("Invalid price.1");

      return;
    }

    this.items.push(item);

    this.total += item.price;
  },

  getTotal() {
    return `Total: ${parseFloat(this.total).toFixed(2)} `;
  },
};

checkout.addItem({ name: "Coffee Maker", price: "99.5" });

checkout.addItem({ name: "Milk", price: 3.5 });

console.log(checkout.getTotal());
