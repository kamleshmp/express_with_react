'use strict'

module.exports = (sequelize, DataTypes) => {
  let User =  sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
              args: 3,
              msg: "Name must be atleast 3 characters in length"
          }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
              args: 3,
              msg: "Password must be atleast 8 characters in length"
          }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          len: {
              args: [6, 128],
              msg: "Email address must be between 6 and 128 characters in length"
          },
          isEmail: {
              msg: "Email address must be valid"
          }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.roles, {
          foreignKey: {
            allowNull: false,
            defaultValue: 1
          }
        });
      }
    },
    // Remove the password column
    instanceMethods: {
      toJSON: function () {
        let values = this.get();
        delete values.password
        return values;
      }
    }
  })
  return User
};