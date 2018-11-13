const validator = require('validator');

module.exports = {
  validateInput: function(data) {
    let err = {};
    let sanitizedEmail = validator.trim(data.email.toString().toLowerCase());

    if (validator.isEmpty(sanitizedEmail)) {
      err.email = 'Email is required';
    }

    if (!validator.isEmail(sanitizedEmail)) {
      err.email = 'Email is required';
    }

    if (validator.isEmpty(data.password)) {
      err.password = 'Password is required';
    }

    return {
      err,
      valid: Object.keys(err).length === 0 ? { email: sanitizedEmail } : false
    };
  },

  validateForm: data => {
    let err = {};
    let valid = {};

    if (Object.keys(data).length === 0) {
      err.message = 'all fields are required';
    } else {
      if (
        data.first_name ||
        data.last_name ||
        data.primary_phone ||
        data.address_one ||
        data.zip_code
      ) {
        //First Name
        if (validator.isAlpha(data.first_name)) {
          valid['first_name'] = validator.trim(
            data.first_name.toString().toLowerCase()
          );
        } else {
          err.first_name = 'please enter a valid first name';
        }

        //Last Name
        if (validator.isAlpha(data.last_name)) {
          valid['last_name'] = validator.trim(
            data.last_name.toString().toLowerCase()
          );
        } else {
          err.last_name = 'please enter a valid last name';
        }
      } else {
        err.message = 'all fields are required';
      }
    }

    return {
      err,
      valid: Object.keys(err).length === 0 ? valid : false
    };
  },

  resetPassword: data => {
    let err = {};

    if (validator.isEmpty(data.updated)) {
      err.password = 'password is required';
    }

    return {
      err,
      valid: Object.keys(err).length === 0 ? true : false
    };
  }
};
