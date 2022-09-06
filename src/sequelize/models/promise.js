"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promise.init(
    {
      promiseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      x: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      y: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      penalty: DataTypes.STRING,
    
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      review: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Promise",
      tableName: "promise",
      timestamps: false,
      pranoid: false,
      underscored: true,
    }
  );
  Promise.associate = function (models) {
    Promise.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
      constraints: false,
    });
    Promise.belongsToMany(models.User, {
      as: "promise",
      through: "Friend",
      foreignKey: "promiseId",
      sourceKey: "promiseId",
      timestamps: false,
    });
  };
  return Promise;
};
