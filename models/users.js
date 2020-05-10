'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{ 
      allowNull: false,
      type:DataTypes.STRING
    },
    password:{
      allowNull: false,
      type: DataTypes.STRING
    },
    activeToken: {
      type: DataTypes.STRING(200)
    }
  }, {
    timestamps: false
  });
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.posts)
  };
  return users;
};