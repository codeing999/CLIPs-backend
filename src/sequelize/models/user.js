"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      timestamps: false,
      pranoid: false,
      underscored: true,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Promise, {
      foreignKey: "userId",
      sourceKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
      constraints: false,
    });
    User.belongsToMany(models.Promise, {
      as: "friend",
      through: "Friend",
      foreignKey: "userId",
      sourceKey: "userId",
    });
  };
  return User;
};
