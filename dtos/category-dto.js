module.exports = class UserDto {
  id;
  label;
  value;

  constructor(model) {
    this.label = model.label;
    this.id = model._id;
    this.value = model.value;
  }
}