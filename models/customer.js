'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address.'
        }
      }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Your password must be between 6 and 32 characters in length.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (pendingUser) => {
        if (pendingUser && pendingUser.password) {
          // Hash the password with BCrypt
          let hash = bcrypt.hashSync(pendingUser.password, 12);

          // Reassign the user's password to the hashed version of that password
          pendingUser.password = hash;
        }
      }
    }
  });
  customer.associate = function(models) {
    // associations can be defined here
  };

  // custom function: validPassword(password)
  // check and instance of the model (specific user) against the typed password
  // use bcrypt to compare hashes. This is for signin password validation.
  customer.prototype.validPassword = function (typedPwd) {
    return bcrypt.compareSync(typedPwd, this.password);
  }

  return customer;
};