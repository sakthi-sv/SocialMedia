"use strict";
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  posts.associate = function (models) {
    // associations can be defined here
    posts.belongsTo(models.users);
    posts.hasMany(models.comments, {
      hooks:true,
      onDelete: "CASCADE",
    });
  };
  return posts;
};
