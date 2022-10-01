"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Participant.init(
    {},
    {
      sequelize,
      modelName: "Participant",
      tableName: "participant",
      timestamps: false,
      pranoid: false,
      underscored: true,
    }
  );
  Participant.associate = function (models) {
    Participant.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
      constraints: false,
    });
    Participant.belongsTo(models.Promise, {
      foreignKey: "promiseId",
      targetKey: "promiseId",
      onUpdate: "cascade",
      onDelete: "cascade",
      constraints: false,
    });
  };
  return Participant;
};
