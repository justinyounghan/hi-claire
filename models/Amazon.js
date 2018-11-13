const mongoose = require('mongoose');

const amazonPersona = new mongoose.Schema({
  profile: { type: Object, default: null },
  asin: { type: String, default: '' }
});

amazonPersona.methods.summary = function() {
  const summary = {
    id: this._id,
    profile: this.profile,
    asin: this.asin
  };

  return summary;
};

module.exports = mongoose.model('amazon_persona', amazonPersona);
