function Tool() {
  this.id = null;
  this.category; = null;
  this.type = null;
  this.brand = null;
  this.model = null;
  this.pricePerDay = null;
  this.quantity = null;
  this.available = null;
  this.comment = null;
  this.toString() = function() {
    return JSON.stringify(this);
  };
}
