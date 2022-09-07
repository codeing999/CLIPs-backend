"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReviewImage.init(
    {
      reviewImageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ReviewImage",
      tableName: "ReviewImage",
      timestamps: false,
      pranoid: false,
      underscored: true,
    }
  );
  ReviewImage.associate = function (models) {
    ReviewImage.belongsTo(models.Review, {
      foreignKey: "reviewId",
      targetKey: "reviewId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return ReviewImage;
};
