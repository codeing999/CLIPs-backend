"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "Review",
      timestamps: false,
      pranoid: false,
      underscored: true,
    }
  );
  Review.associate = function (models) {
    Review.belongsTo(models.Promise, {
      foreignKey: "promiseId",
      targetKey: "promiseId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    Review.hasMany(models.ReviewImage, {
      foreignKey: "reviewId",
      sourceKey: "reviewId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    Review.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return Review;
};
