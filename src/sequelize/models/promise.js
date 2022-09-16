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
        type: DataTypes.STRING, //랜덤 생성을 위해 string으로 변경
        primaryKey: true,
        allowNull: false,
        // autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      x: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      y: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      penalty: {
        type: DataTypes.STRING,
        allowNull: true,
      },      
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      as: "participants",
      through: "Friend",
      foreignKey: "promiseId",
      sourceKey: "promiseId",
      modelName: "Friend",
      timestamps: false,
    });
    Promise.hasMany(models.Review, {
      foreignKey: "promiseId",
      sourceKey: "promiseId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return Promise;
};
