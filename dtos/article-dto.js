module.exports = class UserDto {
  id;
  heading;
  value;
  category;

  constructor(model) {
    this.id = model._id;
    this.heading = model.heading;
    this.value = model.value;
    this.category = model.category;
  }
}