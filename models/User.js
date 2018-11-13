const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  password_reset: { type: String, default: null },
  todos: { type: Array, default: [] }
});

userSchema.methods.summary = function() {
  const summary = {
    id: this._id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    auth: true,
    todos: this.todos
  };

  return summary;
};

module.exports = mongoose.model('user', userSchema);
