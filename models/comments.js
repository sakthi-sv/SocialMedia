"use strict";
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    "comments",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      comment: {
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
  comments.associate = function (models) {
    // associations can be defined here
    comments.belongsTo(models.users);
    comments.belongsTo(models.posts, {
      foreignKeyConstraint: true,
      onDelete: "CASCADE",
    });
  };
  return comments;
};
