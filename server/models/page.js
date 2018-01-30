'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('pages', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    
    linkText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },{
  classMethods: {
    associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Page;
};