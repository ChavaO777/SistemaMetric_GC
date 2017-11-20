function User() {
    this.email = null;
    this.password = null;
    this.name = null;
    this.lastName = null;
    this.toJsonString = function () {
      return JSON.stringify(this);
    };
};
export User;
