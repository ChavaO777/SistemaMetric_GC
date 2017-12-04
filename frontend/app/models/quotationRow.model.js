class QuotationRow {
   constructor(token, entityKey, userKey,
               quotationKey,
               resourceKey,
               quantity,
               timeUnits,
               amount) {
      this.token = sessionStorage.token;
      this.entityKey = entityKey;
      this.userKey = userKey;
      this.quotationKey = quotationKey;
      this.resourceKey = resourceKey;
      this.quantity = quantity;
      this.timeUnits = timeUnits;
      this.amount = amount;
   }

   toString(){
      return JSON.stringify(this);
   };
}
